import * as express from 'express';
import Joi from 'joi';

import BaseController from '../BaseController';
import sesjaRepo from '../../Repositories/ExerciseRepo'

export class UpdateSessionController extends BaseController {

    protected async execution(req: express.Request, res: express.Response): Promise<void | any> {
        try {
            const data = req.body;
            const err = SesjaJoi.validate(data);
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

export const SesjaJoi = Joi.object({
    id: Joi.string().length(24).required(),
    druzyny: Joi.array().items(Joi.string().length(24)).optional(),
    sedziowieZadan: Joi.array().items(Joi.string().length(24)).optional(),
    watki: Joi.array().items(Joi.string().length(24)).optional(),
    zadania: Joi.array().items(Joi.string().length(24)).optional()
});

export default new UpdateSessionController();
