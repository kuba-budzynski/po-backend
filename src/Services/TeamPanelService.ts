import Repository from "../Repositories/Repository";
import Solution, {SolutionStatus} from "../Models/Solution";
import express from "express";
import Session from "../Models/Session";
import {DocumentType} from "@typegoose/typegoose";
import dayjs from "dayjs";
import {BadRequestError} from "../config/handleError";
import {isValidObjectId} from "mongoose";
import RequestFile from "./utils/RequestFile";
import SolutionService from "./SolutionService";

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
        const team = await Repository.TeamRepo
            .findById(teamId)
            .populate("session")
            .exec()
        if (!team)
            throw new BadRequestError("Nie znaleziono drużyny o podanym id.")

        if (!isValidObjectId(exerciseId))
            throw new BadRequestError("Nie znaleziono zadania o podanym id.")

        if (!(team.session as DocumentType<Session>).exercises.some((exercise) => exercise.toString() === exerciseId))
            throw new BadRequestError("W tej sesji nie znajduje się to zadanie.")


        const solutions = await Repository.SolutionRepo.find({author: teamId, exercise: exerciseId}).sort({"sent": -1})

        const hasPending = solutions.some((solution) => solution.isStatus(SolutionStatus.PENDING))
        const hasFinal = solutions.some((solution) => solution.isBlocking())
        const isSessionInProgress = (team.session as DocumentType<Session>).isInProgress()

        const dto: TeamGetSolutionListDTO = {
            canSend: isSessionInProgress && !hasFinal,
            shouldRefetch: isSessionInProgress && hasPending,
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
        if (!isValidObjectId(teamId))
            throw new BadRequestError("Nie znaleziono drużyny o podanym id.")
        const team = await Repository.TeamRepo
            .findById(teamId)
            .populate("solutions")
            .populate("session")
            .exec()
        if (!team)
            throw new BadRequestError("Nie znaleziono drużyny o podanym id.")

        if (!isValidObjectId(exerciseId))
            throw new BadRequestError("Nie znaleziono zadania o podanym id.")
        const exercise = await Repository.ExerciseRepo.findById(exerciseId)
        if (!exercise)
            throw new BadRequestError("Nie znaleziono zadania o podanym id.")

        if (!(team.session as DocumentType<Session>).isInProgress())
            throw new BadRequestError("Sesja została zakończona. Nie można przesyłać już rozwiązań.")

        if (!(team.session as DocumentType<Session>).exercises.some((exercise) => exercise.toString() === exerciseId))
            throw new BadRequestError("W tej sesji nie znajduje się to zadanie.")

        if (team.solutions.some((solution: DocumentType<Solution>) => solution.isBlocking() && solution.belongsToExercise(exerciseId)))
            throw new BadRequestError("To zadanie ma już rozwiązanie oczekujące lub zaakceptowane.")

        const requestFile = new RequestFile("solutionFile")
        const file = await requestFile.attachFile(request)
        if (!file)
            throw new BadRequestError("Błąd odczytu pliku")

        if (!file.originalname.endsWith(".py"))
            throw new BadRequestError("Plik nie jest wspierany")

        const solution = await SolutionService.createSolution({
            author: teamId,
            exercise: exerciseId,
            solutionTime: dayjs(dayjs()).diff((team.session as DocumentType<Session>).start, 'm'),
            sent: new Date(),
            solutionFile: {
                code: request.file.buffer,
                size: request.file.size,
                name: request.file.originalname,
            },
        })

        await SolutionService.verifySolution(solution.id)
    }

    async getSession(teamId: string){
        if (!isValidObjectId(teamId))
            throw new BadRequestError("Nie znaleziono drużyny o podanym id.")
        const team = await Repository.TeamRepo
            .findById(teamId)
        if (!team)
            throw new BadRequestError("Nie znaleziono drużyny o podanym id.")
        else return team.session.toString();
    }
}

export default new TeamPanelService()
