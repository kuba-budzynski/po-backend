import { isValidObjectId } from "mongoose";
import { BadRequestError } from "../config/handleError";
import Repository from "../Repositories/Repository";
import Joi from 'joi';

type GroupedSessionList = {
    [year: string]: {
        id: string,
        name: string,
        start: string,
        end: string,
    }[]
}

export type GetSessionListDTO = {
    year: string,
    sessions: {
        id: string,
        name: string,
        start: string,
        end: string,
    }[]
}[];

export type SessonDetailsDTO = {
    description: string,
    start: Date,
    end: Date,
    isFrozen: boolean 
}

const sessionValidator = Joi.object({
    name: Joi.string().max(50).required(),
    description: Joi.string().max(250).optional().allow("", ''),
    allowedExtensions: Joi.array().items(Joi.string()).max(100),
    start: Joi.date().required(),
    end: Joi.date().min(Joi.ref("start")).required()
})

class SessionService {
    async createSession(request) {
        const validation = sessionValidator.validate(request);
        if(validation.error) throw new BadRequestError(validation.error.message)
        else return Repository.SessionRepo.create<any>(request)
    }

    async getGrouped() {
        const sessions = await Repository.SessionRepo.find().sort({"start": -1});
        const grouped: GroupedSessionList = sessions.reduce((acc, session) => {
            const year = session.start.getFullYear().toString();
            return {
                ...acc,
                [year]: [
                    ...(acc?.[year] ?? []),
                    {
                        id:  session._id,
                        name: session.name,
                        start: session.start.toISOString(),
                        end: session.end.toISOString(),
                    },
                ],
            }
        }, {});
        const dto: GetSessionListDTO = Object.entries(grouped)
            .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
            .map(([year, sessions]) => ({year, sessions}))

        return dto
    }

    async getSession(sessionId: string){
        if (!isValidObjectId(sessionId))
            throw new BadRequestError("Nie znaleziono sesji o podanym id.")
        const session = await Repository.SessionRepo.findById(sessionId);
        if (!session)
            throw new BadRequestError("Nie znaleziono sesji o podanym id.")
        const res: SessonDetailsDTO = {
            description: session.description,
            start: session.start,
            end: session.end,
            isFrozen: session.isRankingFrozen 
        }
        return res;
    }
}

export default new SessionService();
