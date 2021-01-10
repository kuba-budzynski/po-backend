import * as express from 'express';
import Joi from 'joi';

import BaseController from '../BaseController';
import sesjaRepo from '../../Repositories/ExerciseRepo'

export class DeleteSessionController extends BaseController {

    protected async execution(req: express.Request, res: express.Response): Promise<void | any> {
        try {
            const par = req.params;
            const err = IdJoi.validate(par.id);
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

export const IdJoi = Joi.string().length(24).required();

export default new DeleteSessionController();
