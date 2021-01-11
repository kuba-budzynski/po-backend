import ExerciseRepo from "../Repositories/ExerciseRepo";

type GetExerciseDTO = {
    name: string,
    number: number,
    content: string,
}

export class ExerciseService {
    async getExercise(exerciseId: string) {
        const exercise = await ExerciseRepo.get(exerciseId)
        if (!exercise)
            throw new Error("Zadanie o takim id nie istnieje.")

        const dto: GetExerciseDTO = {
            name: exercise.nazwa,
            number: exercise.numer,
            content: exercise.tresc,
        }
        return dto
    }
}

export default new ExerciseService();
