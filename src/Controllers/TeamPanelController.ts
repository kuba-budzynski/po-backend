import {Controller, Get, Header, Path, Post, Request, Route, Tags} from "tsoa";
import TeamPanelService from "../Services/TeamPanelService";
import express from "express";
import SessionService from "../Services/SessionService";
import SolutionService from "../Services/SolutionService";
import ExerciseService from "../Services/ExerciseService";
import RankingService from "../Services/RankingService";

@Route("team-panel")
@Tags("Team Panel")
export class TeamPanelController extends Controller {
    @Get("dashboard")
    public async getDashboard(
        @Header() teamId: string,
    ) {
        const sessionId = await TeamPanelService.getSession(teamId)
        const sesja = await SessionService.getSession(sessionId);
        const solutions = await SolutionService.getSolutions(teamId);
        const exercises = await ExerciseService.getExercises(sessionId);
        const ranking = await RankingService.getCurrentRanking(sessionId);
        return {
            sessionId: sessionId,
            exercises: exercises,
            solutions: solutions,
            ranking: ranking,
            sesja: sesja
        }
    }

    /**
     * Gets the list of all solutions sent by a team in an exercise.
     * @param teamId Unique team identifier
     * @param exerciseId Unique exercise identifier
     */
    @Get("exercise/{exerciseId}/solution")
    public async getSolution(
        @Header() teamId: string,
        @Path() exerciseId: string,
    ) {
        return TeamPanelService.getSolutionList(teamId, exerciseId);
    }

    /**
     * Lets the team submit their solution to the exercise.
     * @param teamId Unique team identifier
     * @param exerciseId Unique exercise identifier
     * @param request
     */
    @Post("exercise/{exerciseId}/solution")
    public async createSolution(
        @Header() teamId: string,
        @Path() exerciseId: string,
        @Request() request: express.Request,
    ): Promise<any> {
        return TeamPanelService.createSolution(teamId, exerciseId, request);
    }
}
