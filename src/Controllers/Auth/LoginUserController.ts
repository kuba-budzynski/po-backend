import express from 'express'
import Joi from "joi"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import BaseController from "../BaseController";
import {AuthRequest} from "../../middlewares/authenticate";
import Id, {DaneDoLogowania} from "../../Models/utils/CommonUtils";
import AuthService from "../../Services/AuthService";
import {SYSTEM_ROLES} from "../../Schemas/utils/Enums";
import settings from "../../settings";

interface UserData {
    id: Id,
    daneLogowania: DaneDoLogowania,
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

            if (role === SYSTEM_ROLES.ADMIN) {
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

                if (role === SYSTEM_ROLES.TEAM)
                    login = AuthService.getTeamLogin
                else if (role === SYSTEM_ROLES.JUDGE_PRIMARY)
                    login = AuthService.getPrimaryJudgeLogin
                else if (role === SYSTEM_ROLES.JUDGE_EXERCISE)
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
