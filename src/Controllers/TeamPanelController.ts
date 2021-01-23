import {Controller, Get, Path, Post, Query, Request, Route} from "tsoa";
import TeamPanelService from "../Services/TeamPanelService";
import express from "express";

@Route("team-panel/{sessionId}/exercise")
export class TeamPanelController extends Controller {
    @Get("{exerciseId}/solution")
    public async getSolution(
        @Query() teamId: string, // instead of receiving one from jwt
        @Path() exerciseId: string,
        @Path() sessionId: string,
    ) {
        return TeamPanelService.getSolutionList(teamId, sessionId, exerciseId);
    }

    @Post("{exerciseId}/solution")
    public async createSolution(
        @Query() teamId: string, // instead of receiving one from jwt
        @Path() exerciseId: string,
        @Path() sessionId: string,
        @Request() request: express.Request,
    ): Promise<any> {
        return TeamPanelService.createSolution(teamId, sessionId, exerciseId, request);
    }
}
