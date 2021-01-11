import express from 'express'
import Joi from "joi"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import BaseController from "../BaseController";
import {AuthRequest} from "../../middlewares/authenticate";
import AuthService from "../../Services/AuthService";
import settings from "../../settings";
import {UzytkownikRola} from "../../Models/DruzynaModel";
import {mongoose} from "@typegoose/typegoose";
import {DaneLogowania} from "../../Models/utils/CommonUtils";

interface UserData {
    id: mongoose.Types.ObjectId,
    daneLogowania: DaneLogowania,
}

export class LoginUserController extends BaseController {

    public clientError(res: express.Response, message?: string) {
        return super.clientError(res, `Logowanie nie powiodło się. ${message}`)
    }

    protected async execution(req: AuthRequest, res: express.Response): Promise<void | any> {
        try {
            if (req?.user != null)
                return this.clientError(res, "Użytkownik jest już zalogowany.")

            const role = req.query?.role
            if (role == null)
                return this.clientError(res, "Parametr `rola` jest wymagany.")

            const data = req.body
            const validate = schema.validate(data)
            if (validate?.error)
                return this.clientError(res, validate.error.message)

            let user: UserData
            let sessionId

            if (role === UzytkownikRola.ADMIN) {
                user = await AuthService.getAdminLogin(data.email)
                if (!user)
                    return this.clientError(res, "Błędny email lub hasło.")

                const isPasswordValid = user.daneLogowania.haslo === data.password
                if (!isPasswordValid)
                    return this.clientError(res, "Błędny email lub hasło.")
            } else {
                sessionId = req.query?.sessionId
                if (sessionId == null)
                    return this.clientError(res, "Parametr `sesja` jest wymagany w tym przypadku logowania.")

                let login

                if (role === UzytkownikRola.DRUZYNA)
                    login = AuthService.getTeamLogin
                else if (role === UzytkownikRola.SEDZIA_GLOWNY)
                    login = AuthService.getPrimaryJudgeLogin
                else if (role === UzytkownikRola.SEDZIA_ZADAINIA)
                    login = AuthService.getExerciseJudgeLogin
                else
                    return this.clientError(res, "Parametr `rola` jest niepoprawny.")

                user = await login(data.email, sessionId)


                const isPasswordValid = await bcrypt.compare(user.daneLogowania.haslo, data.password)
                if (!isPasswordValid)
                    return this.clientError(res, "Błędny email lub hasło.")
            }

            const token = jwt.sign({
                id: user.id,
                role: user.daneLogowania.rola,
                ...(sessionId && { sessionId }),
            }, settings.authSecret)

            this.ok(res, { token })

        } catch (err) {
            this.fail(res, err)
        }
    }
}

export default new LoginUserController()

const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})
