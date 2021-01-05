import * as express from 'express';
import BaseController from '../BaseController';
import validateIdSesja from '../validate/IdSessionJoi';
import sesjaRepo from '../../Repositories/SesjaRepo'

export class DeleteSessionController extends BaseController {

    protected async execution(req: express.Request, res: express.Response): Promise<void | any> {
        try {
            const par = req.params;
            const err = validateIdSesja(par.id);
            if (err.error == undefined) {
                const ret = await sesjaRepo.findOne({_id: par.id});
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

export default new DeleteSessionController();
