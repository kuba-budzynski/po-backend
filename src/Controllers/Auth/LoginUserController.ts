import express from 'express'
import Joi from "joi"
import BaseController from "../BaseController";
import {AuthRequest} from "../../middlewares/authenticate";
import {DaneDoLogowania} from "../../Models/utils/CommonUtils";
import AuthService from "../../Services/AuthService";
import {SYSTEM_ROLES} from "../../Schemas/utils/Enums";
import settings from "../../settings";

const jwt = require("jsonwebtoken")

export class LoginUserController extends BaseController {

    protected async execution(req: AuthRequest, res: express.Response): Promise<void | any> {
        try {
            if (req?.user != null)
                return this.clientError(res, "Logowanie nie powiodło się. Użytkownik jest już zalogowany.")

            const role = req.params?.role
            console.log(req.params, req.body)
            if (role == null)
                return this.clientError(res, "Logowanie nie powiodło się. Parametr `rola` jest wymagany.")

            const data = req.body
            const err = schema.validate(data)
            if (err)
                return this.clientError(res, err.error.message)

            let user: DaneDoLogowania

            //find one login

            //compare password

            if (role === SYSTEM_ROLES.ADMIN) {
                user = await AuthService.getAdminLogin(data.email)
                if (!user)
                    return this.clientError(res, "Logowanie nie powiodło się. Błędny email lub hasło.")

                const isPasswordValid = user.haslo === data.password
                if (!isPasswordValid)
                    return this.clientError(res, "Logowanie nie powiodło się. Błędny email lub hasło.")
            }

            // const sessionId = req.params?.sessionId
            // if (sessionId == null)
            //     return this.clientError(res, "Logowanie nie powiodło się. Parametr `sesja` jest wymagany w tym przypadku logowania.")
            //
            // if (role === DRUZYNA) {
            //
            // } else if (role === SEDZIA_GLOWNY) {
            //
            // } else if (role === SEDZIA_ZADANIA) {
            //
            // }
            else {
                return this.clientError(res, "Logowanie nie powiodło się.")
            }

            const token = jwt.sign({
                email: user.email,
                role: user.rola,
                // sessionId,
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
    role: Joi.string().valid().required(),
})
