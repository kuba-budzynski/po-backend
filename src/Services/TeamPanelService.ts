import Repository from "../Repositories/Repository";
import Solution, {SolutionStatus} from "../Models/Solution";
import express from "express";
import Exercise from "../Models/Exercise";
import Session from "../Models/Session";
import {DocumentType} from "@typegoose/typegoose";
import dayjs from "dayjs";
import {BadRequestError, UnauthorizedError} from "../config/handleError";
import {isValidObjectId} from "mongoose";
import RequestFile from "./utils/RequestFile";
import {SolutionVerify} from "./utils/verifySolution/SolutionVerify";
import {PythonStrategy} from "./utils/verifySolution/PythonStrategy";

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
    async getSolutionList(teamId: string, sessionId: string, exerciseId: string) {
        if (!isValidObjectId(sessionId))
            throw new BadRequestError("Nie znaleziono sesji o podanym id.")
        const session = await Repository.SessionRepo.findById(sessionId)
            .populate("exercises")
            .exec()
        if (!session)
            throw new BadRequestError("Nie znaleziono sesji o podanym id.")

        if (!isValidObjectId(teamId))
            throw new BadRequestError("Nie znaleziono drużyny o podanym id.")
        const team = await Repository.TeamRepo
            .findById(teamId)
            .populate("session")
            .exec()
        if (!team)
            throw new BadRequestError("Nie znaleziono drużyny o podanym id.")

        if ((team.session as DocumentType<Session>).id !== sessionId)
            throw new UnauthorizedError("Drużyna nie ma dostępu do tej sesji.")

        if (!isValidObjectId(exerciseId))
            throw new BadRequestError("Nie znaleziono zadania o podanym id.")

        if (session.exercises.every((exercise: DocumentType<Exercise>) => exercise.id !== exerciseId))
            throw new BadRequestError("W tej sesji nie znajduje się to zadanie.")


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

    async createSolution(teamId: string, sessionId: string, exerciseId: string, request: express.Request) {
        if (!isValidObjectId(sessionId))
            throw new BadRequestError("Nie znaleziono sesji o podanym id.")
        const session = await Repository.SessionRepo.findById(sessionId)
            .populate("exercises")
            .exec()
        if (!session)
            throw new BadRequestError("Nie znaleziono sesji o podanym id.")

        if (!isValidObjectId(teamId))
            throw new BadRequestError("Nie znaleziono drużyny o podanym id.")
        const team = await Repository.TeamRepo
            .findById(teamId)
            .populate("solutions")
            .populate("session")
            .exec()
        if (!team)
            throw new BadRequestError("Nie znaleziono drużyny o podanym id.")

        if ((team.session as DocumentType<Session>).id !== sessionId)
            throw new UnauthorizedError("Drużyna nie ma dostępu do tej sesji.")

        if (!isValidObjectId(exerciseId))
            throw new BadRequestError("Nie znaleziono zadania o podanym id.")
        const exercise = await Repository.ExerciseRepo.findById(exerciseId)
        if (!exercise)
            throw new BadRequestError("Nie znaleziono zadania o podanym id.")

        if (session.exercises.every((exercise: DocumentType<Exercise>) => exercise.id !== exerciseId))
            throw new BadRequestError("W tej sesji nie znajduje się to zadanie.")

        if (team.solutions.some((solution: DocumentType<Solution>) => (solution.status === SolutionStatus.CORRECT || solution.status === SolutionStatus.PENDING) && solution.exercise.toString() === exerciseId))
            throw new BadRequestError("To zadanie ma już rozwiązanie oczekujące lub zaakceptowane.")

        const requestFile = new RequestFile("solutionFile")
        const file = await requestFile.attachFile(request)
        if (!file)
            throw new BadRequestError("Błąd odczytu pliku")

        if (!file.originalname.endsWith(".py"))
            throw new BadRequestError("Plik nie jest wspierany")

        const solution = await Repository.SolutionRepo.create<any>({
            author: teamId,
            exercise: exerciseId,
            solutionTime: dayjs(session.start).diff(dayjs(), 'm'),
            sent: new Date(),
            solutionFile: {
                code: request.file.buffer,
                size: request.file.size,
                name: request.file.originalname,
            },
        })

        await Repository.TeamRepo.findByIdAndUpdate(teamId, {$push: {solutions: solution}})

        const verify = new SolutionVerify(new PythonStrategy())
        await verify.createFile(request.file.buffer, solution.id.toString())
        const verifyReponse = await verify.test(exercise.tests)
        await Repository.SolutionRepo.findByIdAndUpdate(solution._id, { status: verifyReponse.status })
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
