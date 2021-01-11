import {Router} from 'express'
import getExercise from "../Controllers/Exercise/GetExerciseController";

const exerciseRouter: Router = Router();

exerciseRouter.get('/:exerciseId',
    (req, res) => getExercise.execute(req, res)
);

export default exerciseRouter;
