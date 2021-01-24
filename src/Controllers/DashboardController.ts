import { Controller, Get, Path, Post, Request, Route, } from "tsoa";
import SessionService from "../Services/SessionService";
import express from 'express';
import ExerciseService from "../Services/ExerciseService";
import RankingService from "../Services/RankingService";

@Route("{sessionId}/dashboard")
export class DashboardController extends Controller {
    @Get()
    public async getDashboard(
        @Path() sessionId: string
    ) {
        const sesja = await SessionService.getSession(sessionId);
        const exercises = await ExerciseService.getExercises(sessionId);
        const ranking = await RankingService.getCurrentRanking(sessionId);
        return {
            exercises: exercises,
            ranking: ranking,
            sesja: sesja    
        }
    }

}