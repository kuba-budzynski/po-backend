import {Controller, Get, Path, Route,} from "tsoa";
import SessionService, {SessonDetailsDTO} from "../Services/SessionService";
import ExerciseService, { GetExercisesDTO } from "../Services/ExerciseService";
import RankingService, { RankingPositionDTO } from "../Services/RankingService";

export type DashboardDTO = {
    sesja: SessonDetailsDTO,
    exercises: GetExercisesDTO[],
    ranking: RankingPositionDTO[]
}

@Route("dashboard/{sessionId}")
export class DashboardController extends Controller {
    @Get()
    public async getDashboard(
        @Path() sessionId: string
    ) {
        const sesja = await SessionService.getSession(sessionId);
        const exercises = await ExerciseService.getExercises(sessionId);
        const ranking = await RankingService.getCurrentRanking(sessionId);
        const res: DashboardDTO = {
            exercises: exercises,
            ranking: ranking,
            sesja: sesja
        }
        return res;
    }

}
