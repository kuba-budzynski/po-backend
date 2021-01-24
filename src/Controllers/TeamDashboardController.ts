import { Controller, Get, Path, Post, Request, Route, } from "tsoa";
import SessionService from "../Services/SessionService";
import express from 'express';
import ExerciseService from "../Services/ExerciseService";
import RankingService from "../Services/RankingService";
import TeamPanelService from "../Services/TeamPanelService";
import SolutionService from "../Services/SolutionService";

@Route("/team-dashboard")
export class TeamDashboardController extends Controller {
    @Get("/{teamId}")
    public async getDashboard(
        @Path() teamId: string
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
}