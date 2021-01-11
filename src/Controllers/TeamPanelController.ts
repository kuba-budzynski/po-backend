import {Controller, Get, Path, Post, Query, Request, Route} from "tsoa";
import TeamPanelService from "../Services/TeamPanelService";
import express from "express";

@Route("team-panel")
export class TeamPanelController extends Controller {
    @Get("{exerciseId}/solution")
    public async getSolution(
        @Query() teamId: string, // instead of receiving one from jwt
        @Path() exerciseId: string,
    ) {
        return TeamPanelService.getSolutionList(teamId, exerciseId);
    }

    @Post("{exerciseId}/solution")
    public async createSolution(
        @Query() teamId: string, // instead of receiving one from jwt
        @Path() exerciseId: string,
        @Request() request: express.Request,
    ): Promise<any> {
        return TeamPanelService.createSolution(teamId, exerciseId, request);
    }
}
