import Repository from "../Repositories/Repository";
import {SolutionFile, SolutionStatus} from "../Models/Solution";

export type TeamGestSolutionListDTO = {
    id: string,
    sent: string,
    status: SolutionStatus,
    solutionTime?: number,
    file: {
        name: string,
        size: number,
    },
}[]


class TeamPanelService {
    async getSolutionList(teamId: string, exerciseId: string) {
        const solutions = await Repository.SolutionRepo.find({ author: teamId, exercise: exerciseId })

        const dto: TeamGestSolutionListDTO = solutions.map((solution) => ({
            id: solution.id,
            sent: solution.sent.toISOString(),
            status: solution.status,
            solutionTime: solution.solutionTime,
            file: {
                name: solution.solutionFile.name,
                size: solution.solutionFile.size,
            }
        }))
        return dto;
    }

    async createSolution(teamId: string, exerciseId: string, data: SolutionFile) {
        return Repository.SolutionRepo.create<any>({
            author: teamId,
            exercise: exerciseId,
            solutionFile: data,
        })
    }
}

export default new TeamPanelService();
