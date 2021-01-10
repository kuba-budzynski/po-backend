import * as express from 'express';

import BaseController from '../BaseController';
import ExerciseService from "../../Services/ExerciseService";
import {AuthRequest} from "../../middlewares/authenticate";

export class GetExerciseController extends BaseController {
    protected async execution(req: AuthRequest, res: express.Response): Promise<void | any> {
        try {
            const sessionId = req.params?.sessionId;
            if (sessionId == null)
                return this.clientError(res, "Id sesji jest niepoprawne.")

            const exerciseId = req.params?.exerciseId;
            if (exerciseId == null)
                return this.clientError(res, "Id zadania jest niepoprawne.")
            const dto = await ExerciseService.getExercise(sessionId, exerciseId);
            this.ok(res, dto);
        }
        catch (err) {
            this.fail(res, err);
        }
    }
}

export default new GetExerciseController();
