import Repository from "../Repositories/Repository";
import Solution, {SolutionStatus} from "../Models/Solution";
import express, {Express} from "express";
import multer from "multer";
import Exercise from "../Models/Exercise";
import Session from "../Models/Session";
import {DocumentType} from "@typegoose/typegoose";
import {PythonVerify} from "./utils/SolutionVerify";
import dayjs from "dayjs";
import { BadRequestError } from "../config/handleError";
import {isValidObjectId} from "mongoose";

export type TeamGetSolutionListDTO = {
    canSend: boolean,
    shouldRefetch: boolean,
    solutions: {
        id: string,
        sent: string,
        status: SolutionStatus,
        solutionTime: number,
        file: {
            name: string,
            size: number,
        },
    }[]
}


class TeamPanelService {
    async getSolutionList(teamId: string, exerciseId: string) {
        if (!isValidObjectId(teamId))
            throw new BadRequestError("Nie znaleziono drużyny o podanym id.")
        if (!isValidObjectId(exerciseId))
            throw new BadRequestError("Nie znaleziono zadania o podanym id.")
        const solutions = await Repository.SolutionRepo.find({author: teamId, exercise: exerciseId}).sort({"sent": -1})

        const dto: TeamGetSolutionListDTO = {
            canSend: solutions.every((solution) => solution.status !== SolutionStatus.PENDING && solution.status !== SolutionStatus.CORRECT),
            shouldRefetch: solutions.some((solution) => solution.status === SolutionStatus.PENDING),
            solutions: solutions.map((solution) => ({
                id: solution.id,
                sent: solution.sent.toISOString(),
                status: solution.status,
                solutionTime: solution?.solutionTime,
                file: {
                    name: solution.solutionFile.name,
                    size: solution.solutionFile.size,
                }
            }))
        };
        return dto;
    }

    async createSolution(teamId: string, exerciseId: string, request: express.Request) {
        if (!isValidObjectId(exerciseId))
            throw new BadRequestError("Nie znaleziono zadania o podanym id.")
        const exercise = await Repository.ExerciseRepo.findById(exerciseId)
        if (!exercise)
            throw new BadRequestError("Nie znaleziono zadania o podanym id.")

        if (!isValidObjectId(teamId))
            throw new BadRequestError("Nie znaleziono drużyny o podanym id.")
        const team = await Repository.TeamRepo
            .findById(teamId)
            .populate("solutions")
            .populate({
                path: "session",
                populate: {
                    path: "exercises",
                    model: 'Exercise',
                }
            })
            .exec()

        if (!team)
            throw new BadRequestError("Nie znaleziono drużyny o podanym id.")

        if (team.solutions.some((solution: DocumentType<Solution>) => (solution.status === SolutionStatus.CORRECT || solution.status === SolutionStatus.PENDING) && solution.exercise.toString() === exerciseId))
            throw new BadRequestError("To zadanie ma już rozwiązanie oczekujące lub zaakceptowane.")

        if ((team.session as Session).exercises.every((exercise: DocumentType<Exercise>) => exercise.id !== exerciseId))
            throw new BadRequestError("Ta drużyna nie może wysyłać rozwiązań do tego zadania.")

        const multerSingle = multer({limits: {fileSize: 2097152}}).single("solutionFile")
        const file = await new Promise<Express.Multer.File>((resolve, reject) => {
            multerSingle(request, undefined, (error) => {
                if (error) reject(error);
                resolve(request.file);
            })
        });
        if (!file)
            throw new BadRequestError("Nie przesłano pliku")

        if (!file.originalname.endsWith(".py"))
            throw new BadRequestError("Plik nie jest wspierany")

        const solution = await Repository.SolutionRepo.create<any>({
            author: teamId,
            exercise: exerciseId,
            solutionTime: dayjs((team.session as Session).start).diff(dayjs(), 'm'),
            sent: new Date(),
            solutionFile: {
                code: request.file.buffer,
                size: request.file.size,
                name: request.file.originalname,
            },
        });

        await Repository.TeamRepo.findByIdAndUpdate(teamId, {$push: {solutions: solution}})
        const verified = await PythonVerify(request.file.buffer, exercise.tests, Math.floor(Math.random() * 100000).toString())
        await Repository.SolutionRepo.findByIdAndUpdate(solution._id, { status: verified.status })
    }
}

export default new TeamPanelService()
