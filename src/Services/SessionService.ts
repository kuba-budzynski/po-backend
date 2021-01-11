import Repository from "../Repositories/Repository";

type GroupedSessionList = {
    [year: string]: {
        name: string,
        start: string,
        end: string,
    }[]
}

export type GetSessionListDTO = {
    year: string,
    sessions: {
        name: string,
        start: string,
        end: string,
    }[]
}[];

class SessionService {
    async create(data) {
        return Repository.SessionRepo.create(data)
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
}

export default new SessionService();
