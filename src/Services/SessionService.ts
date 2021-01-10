import SessionRepo from "../Repositories/SessionRepo";

type GroupedDTO = {
    [year: string]: {
        name: string,
        start: string,
        end: string,
    }[]
}

export class SessionService {
    async getSessionList() {
        const sessions = await SessionRepo.find().sort({ "start": -1 });
        const grouped: GroupedDTO = sessions.reduce((dto, session) => {
            const year = session.start.getFullYear().toString();
            return {
                ...dto,
                [year] : [
                    ...(dto?.[year] ?? []),
                    {
                        name: session.nazwa,
                        start: session.start.toISOString(),
                        end: session.koniec.toISOString(),
                    },
                ],
            }
        }, {});
        return Object.entries(grouped).sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
    }
}

export default new SessionService();
