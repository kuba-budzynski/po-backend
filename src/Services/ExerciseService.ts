import {BadRequestError} from "../config/handleError";
import Repository from "../Repositories/Repository";
import {isValidObjectId} from "mongoose";

export type GetExerciseDTO = {
    name: string,
    number: number,
    content: string,
}

class ExerciseService {
    async getExercise(sessionId: string, exerciseId: string) {
        if (!isValidObjectId(sessionId))
            throw new BadRequestError("Nie znaleziono sesji o podanym id.")
        const session = await Repository.SessionRepo.findById(sessionId)
        if (!session)
            throw new BadRequestError("Nie znaleziono sesji o podanym id.")

        if (!isValidObjectId(exerciseId))
            throw new BadRequestError("Nie znaleziono zadania o podanym id.")
        const exercise = await Repository.ExerciseRepo.findById(exerciseId)
        if (!exercise)
            throw new BadRequestError("Nie znaleziono zadania o podanym id.")

        if (session.exercises.every(exercise => exercise.toString() !== exerciseId))
            throw new BadRequestError("W tej sesji nie znajduje się to zadanie.")

        const dto: GetExerciseDTO = {
            name: exercise.name,
            number: exercise.number,
            content: exercise.content,
        }
        return dto
    }
}

export default new ExerciseService();
