import * as express from 'express';
import BaseController from '../BaseController';
import validateUpdatedSession from '../validate/IdSessionJoi';
import sesjaRepo from '../../Repositories/SesjaRepo'

export class UpdateSessionController extends BaseController {

    protected async execution(req: express.Request, res: express.Response): Promise<void | any> {
        try {
            const data = req.body;
            const err = validateUpdatedSession(data);
            if (err.error == undefined) {
                const ret = await sesjaRepo.delete(data.id);
                return this.ok<any>(res, ret);
            }
            else {
                this.clientError(res, err.error.message)
            };
        }
        catch (err) {
            this.fail(res, err);
        }
    }
};

export default new UpdateSessionController();
