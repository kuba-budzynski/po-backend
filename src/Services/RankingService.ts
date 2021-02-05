import { DocumentType } from "@typegoose/typegoose";
import { isValidObjectId } from "mongoose";
import { BadRequestError } from "../config/handleError";
import Team, { TeamStatus } from "../Models/Team";
import Repository from "../Repositories/Repository";

let lastValidRanking = {}

export type RankingPositionDTO = {
    id: string,
    completed: number,
    time: number,
    name: string,
    school: string
}

class RankingService {
    
    async getCurrentRanking(sessionId: string) {
        if (!isValidObjectId(sessionId))
            throw new BadRequestError("Nie znaleziono sesji o podanym id.")
        const session = await Repository.SessionRepo.findById(sessionId).populate('teams').exec();
        if (!session)
            throw new BadRequestError("Nie znaleziono sesji o podanym id.")
        else{
            if (session.isRankingFrozen && lastValidRanking[sessionId]) {
                return lastValidRanking[sessionId]
            }
            const validTeams = (session.teams as DocumentType<Team>[]).filter(t => t.status != TeamStatus.DISQUALIFIED )
            const teams: RankingPositionDTO[] = validTeams.map(t => ({
                id: t._id,
                completed: t.score.correct,
                time: t.score.time,
                name: t.name,
                school: t.schoolName
            }))
            const teamsSorted = teams.sort((a, b) => {
                if (a.completed > b.completed) return -1
                else if (a.completed == b.completed) {
                    if (a.time < b.time) return -1
                    else return 1
                }
                else return 1
            })
            
            lastValidRanking[sessionId] = teamsSorted;
            return teamsSorted   
        }
    }
}

export default new RankingService();
