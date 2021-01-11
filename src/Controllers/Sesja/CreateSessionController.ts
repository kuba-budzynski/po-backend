import * as express from 'express';
import Joi from 'joi';

import BaseController from '../BaseController';
import SessionService from "../../Services/SessionService";
export class CreateSessionController extends BaseController{
    
    protected async execution(req: express.Request, res: express.Response): Promise<void | any>{
        try {
            const data = req.body;
            const par = req.params;
            console.log(par);
            const err = CreateSessionJoi.validate(data);
            if (err.error == undefined) {
                const ret = await SessionService.createSession(data);
                return this.ok<any>(res, ret);
            }
            else {
                this.clientError(res, err.error.message)
            }
        }
        catch (err) {
            this.fail(res, err);
        }
    }
}

export const CreateSessionJoi = Joi.object({
    sedziaGlowny: Joi.string().length(24).optional(),
    start: Joi.date().required().greater('now'),
    koniec: Joi.date().required().greater(Joi.ref('start')),
    nazwa: Joi.string().required(),
    dozwoloneRozszerzenia: Joi.array().items(Joi.string()).required(),
    rejestracja: Joi.object({
        start: Joi.date().required().greater('now'),
        koniec: Joi.date().greater(Joi.ref('start')).required(),
        wyniki: Joi.date().greater(Joi.ref('koniec')).required()
    }).required(),
    opis: Joi.string().max(512).optional(),
    ranking: Joi.string().length(24).required(),
    /////////////////////////////////////////////////////////////
    watki: Joi.array().items(Joi.string().length(24)).optional(),
    zadania: Joi.array().items(Joi.string().length(24)).optional(),
    druzyny: Joi.array().items(Joi.string().length(24)).optional(),
    sedziowieZadan: Joi.array().items(Joi.string().length(24)).optional(),
});

export default new CreateSessionController();
