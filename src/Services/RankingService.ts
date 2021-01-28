import { DocumentType } from "@typegoose/typegoose";
import { isValidObjectId } from "mongoose";
import { BadRequestError } from "../config/handleError";
import Team from "../Models/Team";
import Repository from "../Repositories/Repository";


class RankingService {
    
    async getCurrentRanking(sessionId: string) {
        if (!isValidObjectId(sessionId))
            throw new BadRequestError("Nie znaleziono sesji o podanym id.")
        const session = await Repository.SessionRepo.findById(sessionId).populate('teams').exec();
        if (!session)
            throw new BadRequestError("Nie znaleziono sesji o podanym id.")
        else{
            const teams = (session.teams as DocumentType<Team>[]).map(t => ({
                id: t._id,
                completed: t.score.correct,
                time: t.score.time,
                name: t.name,
                school: t.schoolName
            }))
            return teams.sort((a,b) => {
                if(a.completed > b.completed) return -1
                else if(a.completed == b.completed){
                    if(a.time < b.time) return -1
                    else return 1
                }
                else return 1
            })
        }
    }
}

export default new RankingService();
