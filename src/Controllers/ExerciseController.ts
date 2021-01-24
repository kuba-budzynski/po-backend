import {Controller, Get, Path, Route,} from "tsoa";
import ExerciseService, {GetExerciseDTO} from "../Services/ExerciseService";

@Route("exercise")
export class ExerciseController extends Controller {
    /**
     * Pobierz dane dotyczące pojedynczego zadania.
     * @param exerciseId Unikalny identyfikator zadania
     */
    @Get("{exerciseId}")
    public async getExercise(
        @Path() exerciseId: string
    ): Promise<GetExerciseDTO> {
        return ExerciseService.getExercise(exerciseId);
    }
}
