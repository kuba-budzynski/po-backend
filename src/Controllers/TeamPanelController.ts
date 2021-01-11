import {Body, Controller, Get, Path, Post, Query, Route} from "tsoa";
import TeamPanelService from "../Services/TeamPanelService";
import Joi from "joi";
import {SolutionFile} from "../Models/Solution";

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
        @Body() data: SolutionFile,
    ): Promise<any> {
        if (!CreateSolutionJoi.validate(data))
            throw Error("Incorrect data")

        return TeamPanelService.createSolution(teamId, exerciseId, data);
    }
}

// add real file upload implementation
const CreateSolutionJoi = Joi.object({
    name: Joi.string().required(),
    size: Joi.number().max(5000000).required(),
    code: Joi.string().required(),
});
