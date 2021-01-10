import * as express from 'express';

import BaseController from '../BaseController';
import SessionService from "../../Services/SessionService";

export class GetSessionListController extends BaseController {
    protected async execution(req: express.Request, res: express.Response): Promise<void | any> {
        try {
            const dto = await SessionService.getSessionList();
            this.ok(res, dto);
        }
        catch (err) {
            this.fail(res, err);
        }
    }
}

export default new GetSessionListController();
