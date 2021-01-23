import { BadRequestError } from "../config/handleError";
import Repository from "../Repositories/Repository";
import {isValidObjectId} from "mongoose";

export type GetExerciseDTO = {
    name: string,
    number: number,
    content: string,
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
}

export default new ExerciseService();
