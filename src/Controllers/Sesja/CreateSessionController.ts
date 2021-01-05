import * as express from 'express';
import BaseController from '../BaseController';
import validateCreatedSesja from '../validate/CreateSessionJoi';
import sesjaRepo from '../../Repositories/SesjaRepo'

export class CreateSessionController extends BaseController{
    
    protected async execution(req: express.Request, res: express.Response): Promise<void | any>{
        try {
            const data = req.body;
            const par = req.params;
            console.log(par);
            const err = validateCreatedSesja(data);
            if (err.error == undefined) {
                const ret = await sesjaRepo.create(data);
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

export default new CreateSessionController();
