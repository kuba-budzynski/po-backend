import * as express from 'express'
import DailyLogger from '../logger';

const logger = new DailyLogger("controllers");

export default abstract class BaseController {

    protected abstract execution(req: express.Request, res: express.Response): Promise<void | any>;

    public async execute(req: express.Request, res: express.Response): Promise<void> {
        try {
            await this.execution(req, res);
        } catch (err) {
            logger.error("Execution error: " + err)
            this.fail(res, 'An unexpected error occurred')
        }
    }

    public static jsonResponse(res: express.Response, code: number, message: string) {
        return res.status(code).json({ message })
    }

    public ok<T>(res: express.Response, dto?: T) {
        if (dto != undefined) {
            logger.info("OK with 200 -> " + JSON.stringify(dto))
            res.type('application/json');
            return res.status(200).json(dto);
        } else {
            return res.sendStatus(200);
        }
    }

    public created(res: express.Response) {
        logger.warn(`Created with 201`)
        return res.sendStatus(201);
    }

    public clientError(res: express.Response, message?: string) {
        logger.error("Unauthorized with 400 -> " + message)
        return BaseController.jsonResponse(res, 400, message ? message : 'Unauthorized');
    }

    public unauthorized(res: express.Response, message?: string) {
        logger.error("Unauthorized with 401 -> " + message)
        return BaseController.jsonResponse(res, 401, message ? message : 'Unauthorized');
    }

    public paymentRequired(res: express.Response, message?: string) {
        logger.error("Missing payment -> " + message)
        return BaseController.jsonResponse(res, 402, message ? message : 'Payment required');
    }

    public forbidden(res: express.Response, message?: string) {
        logger.error("Action forbidden with 403 -> " + message)
        return BaseController.jsonResponse(res, 403, message ? message : 'Forbidden');
    }

    public notFound(res: express.Response, message?: string) {
        logger.error("Not found with 404 -> " + message)
        return BaseController.jsonResponse(res, 404, message ? message : 'Not found');
    }

    public conflict(res: express.Response, message?: string) {
        logger.error("Confilct with 409 -> " + message)
        return BaseController.jsonResponse(res, 409, message ? message : 'Conflict');
    }

    public tooMany(res: express.Response, message?: string) {
        logger.error("Too many requests with 429 -> " + message)
        return BaseController.jsonResponse(res, 429, message ? message : 'Too many requests');
    }

    public todo(res: express.Response) {
        logger.debug("TODO with 400")
        return BaseController.jsonResponse(res, 400, 'TODO');
    }

    public fail(res: express.Response, error: Error | string) {
        logger.error("Server error with 500 -> " + error)
        return res.status(500).json({
            message: error.toString()
        })
    }
}