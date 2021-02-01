import {BadRequestError} from "../config/handleError";
import Repository from "../Repositories/Repository";
import {isValidObjectId} from "mongoose";
import {DocumentType} from "@typegoose/typegoose";
import Solution, {SolutionStatus} from "../Models/Solution";
import Exercise from "../Models/Exercise";
import {SolutionVerify} from "./utils/verifySolution/SolutionVerify";
import {PythonStrategy} from "./utils/verifySolution/PythonStrategy";
import Team from "../Models/Team";

export type GetSolutionsListDTO = {
    exercise: string,
    solutions: {
        exerciseId: string,
        status: string,
        solutionId: string,
        sent: Date,
    }[]
}[];

class SolutionService {
    async getSolutions(teamId: string) {
        if (!isValidObjectId(teamId))
            throw new BadRequestError("Nie znaleziono drużyny o podanym id.")
        const team = await Repository.TeamRepo
            .findById(teamId)
            .populate("solutions")
            .exec()
        if (!team)
            throw new BadRequestError("Nie znaleziono drużyny o podanym id.")
        else {
            const solutions = team.solutions as DocumentType<Solution>[]           
            const trimedSolution = solutions.map(s => ({
                id: s._id,
                sent: s.sent,
                status: s.status,
                exerciseId: s.exercise.toString()
            }));
            const grouped =  trimedSolution.reduce((acc, solution,) => {
                return {
                    ...acc,
                    [solution.exerciseId]: [
                        ...(acc?.[solution.exerciseId] ?? []),
                        {
                            solutionId: solution.id,
                            exerciseId: solution.exerciseId,
                            status: solution.status,
                            sent: solution.sent
                        }
                    ]
                }
            }, []);
            return grouped;
        }
    }
    
    async verifySolution(solutionId: string) {
        const solution = await Repository.SolutionRepo.findById(solutionId).populate("exercise").populate([{
            path: 'author',
            populate: {
                path: 'solutions',
                model: 'Solution',
            }
        }]).exec()
        const exercise = solution.exercise as DocumentType<Exercise>
        const team = solution.author as DocumentType<Team>
        const verify = new SolutionVerify(new PythonStrategy())

        await verify.createFile(solution.solutionFile.code, solution.id)
        const verifyResponse = await verify.test(exercise.tests)
        await Repository.SolutionRepo.findByIdAndUpdate(solution.id, { status: verifyResponse.status })

        // aktualizacja wyniku
        if (verifyResponse.status === SolutionStatus.CORRECT) {
            const hasIncorrectSolutions = team.solutions.some((solution: DocumentType<Solution>) => solution.isError() && solution.belongsToExercise(exercise.id))
            const solutionTime = solution.solutionTime + (hasIncorrectSolutions ? 20 : 0)
            await Repository.TeamRepo.findByIdAndUpdate(team.id, { $inc: { 'score.correct': 1, 'score.time': solutionTime } })
        }
    }

    async createSolution(solutionData: any) {
        const solution = await Repository.SolutionRepo.create<any>(solutionData)
        await Repository.TeamRepo.findByIdAndUpdate(solution.author.toString(), {$push: {solutions: solution}})
        return solution
    }
}

export default new SolutionService();
