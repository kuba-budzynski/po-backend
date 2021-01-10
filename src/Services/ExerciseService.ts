import ExerciseRepo from "../Repositories/ExerciseRepo";
import SessionRepo from "../Repositories/SessionRepo";

type GetExerciseDTO = {
    name: string,
    number: number,
    content: string,
}

export class ExerciseService {
    async getExercise(sessionId: string, exerciseId: string) {
        const session = await SessionRepo.get(sessionId)
        if (!session)
            throw new Error("Sesja o takim id nie istnieje.")

        const exercise = await ExerciseRepo.get(exerciseId)
        if (!exercise)
            throw new Error("Zadanie o takim id nie istnieje.")

        const exerciseInSession = session.zadania.some((eId) => eId.toString() === exerciseId)
        if (!exerciseInSession)
            throw new Error("Zadanie o takim id nie istnieje w tej sesji.")

        const dto: GetExerciseDTO = {
            name: exercise.nazwa,
            number: exercise.numer,
            content: exercise.tresc,
        }
        return dto
    }
}

export default new ExerciseService();
