import {Controller, Get, Header, Path, Post, Request, Route} from "tsoa";
import TeamPanelService from "../Services/TeamPanelService";
import express from "express";
import SessionService from "../Services/SessionService";
import SolutionService from "../Services/SolutionService";
import ExerciseService from "../Services/ExerciseService";
import RankingService from "../Services/RankingService";

@Route("team-panel")
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

    @Get("exercise/{exerciseId}/solution")
    public async getSolution(
        @Header() teamId: string,
        @Path() exerciseId: string,
    ) {
        return TeamPanelService.getSolutionList(teamId, exerciseId);
    }

    @Post("exercise/{exerciseId}/solution")
    public async createSolution(
        @Header() teamId: string,
        @Path() exerciseId: string,
        @Request() request: express.Request,
    ): Promise<any> {
        return TeamPanelService.createSolution(teamId, exerciseId, request);
    }
}
