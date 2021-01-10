import {ObjectID} from "mongodb";
import AdminRepo, {AdminRepo as AdminRepoType} from "../Repositories/AdminRepo";
import TeamRepo, {TeamRepo as TeamRepoType} from "../Repositories/TeamRepo";
import PrimaryJudgeRepo, {PrimaryJudgeRepo as PrimaryJudgeRepoType} from "../Repositories/PrimaryJudgeRepo";
import ExerciseJudgeRepo, {ExerciseJudgeRepo as ExerciseJudgeRepoType} from "../Repositories/ExcersiseJudgeRepo";

type Repo = TeamRepoType | PrimaryJudgeRepoType | ExerciseJudgeRepoType | AdminRepoType

class AuthService {
    private async getLogin(repo: Repo, email: String, sessionId?: string) {
        const user = await repo.findOne({
            ...(sessionId && {"sesja._id": new ObjectID(sessionId)}),
            "daneLogowania.email": email
        })
        return user?.daneLogowania
    }

    async getAdminLogin(email: String) {
        return this.getLogin(AdminRepo, email)
    }

    async getTeamLogin(email: String, sessionId: string) {
        return this.getLogin(TeamRepo, email, sessionId)
    }

    async getPrimaryJudgeLogin(email: String, sessionId: string) {
        return this.getLogin(PrimaryJudgeRepo, email, sessionId)
    }

    async getExerciseJudgeLogin(email: String, sessionId: string) {
        return this.getLogin(ExerciseJudgeRepo, email, sessionId)
    }
}

export default new AuthService();
