import express from 'express'
import BaseController from "../BaseController";
import {AuthRequest} from "../../middlewares/authenticate";
import PublicSessionService from "../../Services/PublicSessionService";

export class GetPublicSessionListController extends BaseController {
    protected async execution(req: AuthRequest, res: express.Response): Promise<void | any> {
        try {
            const sessionId = req.params?.sessionId;
            if (sessionId == null)
                return this.clientError(res, "Niepoprawne id sesji.")

            const list = null//PublicSessionService.getPublicSession()
            this.ok(res, list)
        } catch (err) {
            this.fail(res, err)
        }
    }
}

export default new GetPublicSessionListController()
