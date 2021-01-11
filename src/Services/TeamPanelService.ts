import ExerciseRepo from "../Repositories/ExerciseRepo";
import SolutionRepo from "../Repositories/SolutionRepo";
import TeamRepo from "../Repositories/TeamRepo";
import {SOLUTION_STATUS} from "../Schemas/utils/Enums";

type GetSolutionListDTO = {
    sentAt: string,
    status: string,
    file: {
        name: string,
        size: number,
    },
    solutionTime?: number,
}[]

export class TeamPanelService {
    async getSolutionList(teamId: string, exerciseId: string) {
        const exercise = await ExerciseRepo.get(exerciseId)
        if (!exercise)
            throw new Error("Zadanie o takim id nie istnieje.")

        const team = await TeamRepo.get(teamId)
        if (!team)
            throw new Error("Drużyna o takim id nie istnieje.")

        const solutions = await SolutionRepo.find({ "zadanie._id": exercise.id, "autor._id": team.id })
        const dto: GetSolutionListDTO = solutions.map((solution) => ({
            sentAt: solution.wyslano.toISOString(),
            status: solution.status,
            file: {
                name: solution.plikRozwiazania.nazwa,
                size: solution.plikRozwiazania.rozmiar,
            },
            solutionTime: solution.status === SOLUTION_STATUS.CORRECT ? solution.czasRozwiazania : undefined,
        }))
        return dto
    }
}

export default new TeamPanelService();
