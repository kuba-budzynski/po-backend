import Repository from "../Repositories/Repository";

export type GetExerciseDTO = {
    name: string,
    number: number,
    content: string,
}

export class ExerciseService {
    async getExercise(exerciseId: string) {
        const exercise = await Repository.ExerciseRepo.findById(exerciseId)
        if (!exercise)
            throw new Error("Zadanie o takim id nie istnieje.")

        const dto: GetExerciseDTO = {
            name: exercise.name,
            number: exercise.number,
            content: exercise.content,
        }
        return dto
    }
}

export default new ExerciseService();
