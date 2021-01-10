import express from 'express'
import BaseController from "../BaseController";
import {AuthRequest} from "../../middlewares/authenticate";
import PublicSessionService from "../../Services/PublicSessionService";
import Joi from "joi";
import {INSITUTION_TYPES} from "../../Schemas/utils/Enums";

export class SignupPublicSessionController extends BaseController {
    public clientError(res: express.Response, message?: string) {
        return super.clientError(res, `Zapis nie powiódł się. ${message}`)
    }

    protected async execution(req: AuthRequest, res: express.Response): Promise<void | any> {
        try {
            const sessionId = req.params?.sessionId;
            if (sessionId == null)
                return this.clientError(res, "Niepoprawne id sesji.")

            const session = await PublicSessionService.getPublicSession(sessionId)

            const now = new Date()
            if (now > session.rejestracja.koniec)
                return this.clientError(res, "Termin rejestracji upłynął.")

            if (now < session.rejestracja.start)
                return this.clientError(res, "Termin rejestracji nie rozpoczął się.")


            // start: {$gt: now},
            // "rejestracja.start": {$lt: now},
            // "rejestracja.koniec": {$gt: now}
            this.ok(res, session)
        } catch (err) {
            this.fail(res, err)
        }
    }
}

export default new SignupPublicSessionController()

const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
    institutionName: Joi.string().min(5).required(),
    name: Joi.string().min(5).required(),
    members: Joi.array().min(2).max(3).items(Joi.object({
        isCaptain: Joi.boolean().required(),
        name: Joi.string().min(2).required(),
        surname: Joi.string().min(2).required(),
    })).required(),
    institution: Joi.string().valid(...Object.values(INSITUTION_TYPES)).required(),
})
