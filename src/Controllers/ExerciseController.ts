import {Controller, Get, Path, Route,} from "tsoa";
import ExerciseService, {GetExerciseDTO} from "../Services/ExerciseService";

@Route("{sessionId}/exercise")
export class ExerciseController extends Controller {
    @Get("{exerciseId}")
    public async getExercise(
        @Path() sessionId: string,
        @Path() exerciseId: string
    ): Promise<GetExerciseDTO> {
        return ExerciseService.getExercise(sessionId, exerciseId);
    }
}
