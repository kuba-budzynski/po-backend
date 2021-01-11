import * as express from 'express';

import BaseController from '../BaseController';
import ExerciseService from "../../Services/ExerciseService";

export class GetExerciseController extends BaseController {
    protected async execution(req: express.Request, res: express.Response): Promise<void | any> {
        try {
            const exerciseId = req.params?.exerciseId;
            if (exerciseId == null)
                return this.clientError(res, "Id zadania jest niepoprawne.")
            const dto = await ExerciseService.getExercise(exerciseId);
            this.ok(res, dto);
        }
        catch (err) {
            this.fail(res, err);
        }
    }
}

export default new GetExerciseController();
