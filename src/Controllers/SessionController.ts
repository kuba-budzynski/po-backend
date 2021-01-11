import {Controller, Get, Route,} from "tsoa";
import SessionService from "../Services/SessionService";

@Route("session")
export class SessionController extends Controller {
    @Get()
    public async getSessionList() {
        return SessionService.getGrouped()
    }
}
/*import * as express from 'express';
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
                const ret = await SessionService.create(data);
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
    primaryJudge: Joi.string().length(24).optional(),
    start: Joi.date().required().greater('now'),
    end: Joi.date().required().greater(Joi.ref('start')),
    name: Joi.string().required(),
    allowedExtensions: Joi.array().items(Joi.string()).required(),
    registration: Joi.object({
        start: Joi.date().required().greater('now'),
        end: Joi.date().greater(Joi.ref('start')).required(),
        results: Joi.date().greater(Joi.ref('end')).required()
    }).required(),
    description: Joi.string().max(512).optional(),
    ranking: Joi.string().length(24).required(),
    /////////////////////////////////////////////////////////////
    threads: Joi.array().items(Joi.string().length(24)).optional(),
    exercises: Joi.array().items(Joi.string().length(24)).optional(),
    druzyny: Joi.array().items(Joi.string().length(24)).optional(),
    sedziowieZadan: Joi.array().items(Joi.string().length(24)).optional(),
});

export default new CreateSessionController();
*/
