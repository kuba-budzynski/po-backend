import Repository from "../Repositories/Repository";
import {SolutionStatus} from "../Models/Solution";
import express, {Express} from "express";
import multer from "multer";

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
        const solutions = await Repository.SolutionRepo.find({ author: teamId, exercise: exerciseId }).populate("file")

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

    async createSolution(teamId: string, exerciseId: string, request: express.Request) {
        const exercise = await Repository.ExerciseRepo.findById(exerciseId)
        if (!exercise)
            throw new Error("Nie znaleziono zadania o podanym id.");

        const team = await Repository.TeamRepo.findById(teamId)
        if (!team)
            throw new Error("Nie znaleziono drużyny o podanym id.");

        // TODO: sprawdzic czy w sesji druzyny znajduje sie to zadanie
        // TODO: sprawdzic czy w tym zadaniu jest juz poprawne rozwiazanie

        const multerSingle = multer({ limits: { fileSize: 2000000 } }).single("solutionFile");
        const file = await new Promise<Express.Multer.File>((resolve, reject) => {
            multerSingle(request, undefined, (error) => {
                if (error) reject(error);
                resolve(request.file);
            })
        });
        if (file.mimetype !== "text/javascript")
            throw new Error("Plik nie jest wspierany");

        // const solution = await Repository.SolutionRepo.create<any>({
        //     author: teamId,
        //     exercise: exerciseId,
        //     solutionFile: {
        //         code: request.file.buffer,
        //         size: request.file.size,
        //         name: request.file.originalname,
        //     },
        // });

        // TODO: add solution to team
    }
}

export default new TeamPanelService();
