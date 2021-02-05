import {BadRequestError} from "../config/handleError";
import Repository from "../Repositories/Repository";
import {isValidObjectId} from "mongoose";
import { DocumentType } from "@typegoose/typegoose";
import Exercise from "../Models/Exercise";

export type GetExerciseDTO = {
    name: string,
    number: number,
    content: string,
}

export type GetExercisesDTO = {
    id: string,
    name: string,
    number: number
}

class ExerciseService {
    async getExercise(exerciseId: string) {
        if (!isValidObjectId(exerciseId))
            throw new BadRequestError("Nie znaleziono zadania o podanym id.")
        const exercise = await Repository.ExerciseRepo.findById(exerciseId)
        if (!exercise)
            throw new BadRequestError("Nie znaleziono zadania o podanym id.")

        const dto: GetExerciseDTO = {
            name: exercise.name,
            number: exercise.number,
            content: exercise.content,
        }
        return dto
    }

    async getExercises(sessionId: string){
        if (!isValidObjectId(sessionId))
            throw new BadRequestError("Nie znaleziono sesji o podanym id.")
        const session = await Repository.SessionRepo.findById(sessionId)
            .populate("exercises").exec();
        if (!session)
            throw new BadRequestError("Nie znaleziono sesji o podanym id.")
        else {
            const exercises = session.exercises as DocumentType<Exercise>[]
            const res: GetExercisesDTO[] = exercises.map(e => ({
                id: e._id,
                name: e.name,
                number: e.number
            }))
            return res;
        }
    }
}

export default new ExerciseService();
