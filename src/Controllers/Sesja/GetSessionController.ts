import * as express from 'express';
import Joi from 'joi';

import BaseController from '../BaseController';
import sesjaRepo from '../../Repositories/ExerciseRepo'
export class GetSessionController extends BaseController {

    protected async execution(req: express.Request, res: express.Response): Promise<void | any> {
        try {
            const params = req.params;
            const validationError = IdJoi.validate(params.id);
            if (validationError.error == undefined) {

                //Service

                const ret = await sesjaRepo.findOne({ _id: params.id });
                return this.ok<any>(res, ret);
            }
            else {
                this.clientError(res, validationError.error.message)
            };
        }
        catch (err) {
            this.fail(res, err);
        }
    }
};

export const IdJoi = Joi.string().length(24).required();

export default new GetSessionController();
