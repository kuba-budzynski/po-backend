import {Controller, Get, Path, Route,} from "tsoa";
import ExerciseService, {GetExerciseDTO} from "../Services/ExerciseService";

@Route("exercise")
export class ExerciseController extends Controller {
    /**
     * Gets the title, number and contents of a single exercise.
     * @param exerciseId Unique exercise identifier
     */
    @Get("{exerciseId}")
    public async getExercise(
        @Path() exerciseId: string
    ): Promise<GetExerciseDTO> {
        return ExerciseService.getExercise(exerciseId);
    }
}
