import * as express from 'express';

import BaseController from '../BaseController';
import TeamPanelService from "../../Services/TeamPanelService";
import {AuthRequest} from "../../middlewares/authenticate";
import {SYSTEM_ROLES} from "../../Schemas/utils/Enums";

export class TeamGetSolutionList extends BaseController {
    protected async execution(req: AuthRequest, res: express.Response): Promise<void | any> {
        try {
            if (req.user.role !== SYSTEM_ROLES.TEAM)
                return this.unauthorized(res, "Brak dostępu.")

            if (req.user.email == null)
                return this.unauthorized(res, "Brak dostępu.")

            const exerciseId = req.params?.exerciseId;
            if (exerciseId == null)
                return this.clientError(res, "Id zadania jest niepoprawne.")

            const dto = await TeamPanelService.getSolutionList(req.user.email, exerciseId);
            this.ok(res, dto);
        }
        catch (err) {
            this.fail(res, err);
        }
    }
}

export default new TeamGetSolutionList();
