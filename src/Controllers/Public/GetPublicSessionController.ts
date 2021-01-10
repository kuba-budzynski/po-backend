import express from 'express'
import BaseController from "../BaseController";
import {AuthRequest} from "../../middlewares/authenticate";
import PublicSessionService from "../../Services/PublicSessionService";

export class GetPublicSessionController extends BaseController {
    protected async execution(req: AuthRequest, res: express.Response): Promise<void | any> {
        try {
            const sessionId = req.params?.sessionId;
            if (sessionId == null)
                return this.clientError(res, "Niepoprawne id sesji.")

            const session = await PublicSessionService.getPublicSession(sessionId)
            this.ok(res, session)
        } catch (err) {
            this.fail(res, err)
        }
    }
}

export default new GetPublicSessionController()
