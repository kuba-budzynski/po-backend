import SessionRepo from "../Repositories/SessionRepo";
import {ObjectID} from "mongodb";
import bcrypt from "bcrypt";
import {Uczestnik} from "../Models/utils/CommonUtils";
import TeamRepo from "../Repositories/TeamRepo";
import {SYSTEM_ROLES, TEAM_STATUS} from "../Schemas/utils/Enums";

type TeamSignupType = {
    email: string,
    password: string,
    members: Uczestnik[],
    name: string,
    institutionName: string,
    institution: string,
}

class PublicSessionService {
    async getPublicSession(sessionId: string) {
        const id = new ObjectID(sessionId)
        const session = await SessionRepo.findOne({ _id: id })
        if (!session)
            throw new Error("Nie znaleziono sesji o podanym id.")

        return session
    }

    async signupPublicSession(sessionId: string, data: TeamSignupType) {
        const id = new ObjectID(sessionId)
        const session = await SessionRepo.get(sessionId)
        if (!session)
            throw new Error("Nie znaleziono sesji o podanym id.")

        const { email, password, members, name, institutionName, institution } = data
        const found = await TeamRepo.findOne({ "sesja._id": id, "daneLogowania.email": email })
        if (!!found)
            throw new Error("Już istnieje konto o takim adresie e-mail.")

        const salt = await bcrypt.genSalt(10)
        const newPassword = await bcrypt.hash(password, salt)

        return await TeamRepo.create({
            rozwiazania: [],
            statusDruzyny: TEAM_STATUS.REGISTERED,
            wynik: {czas: 0, poprawne: 0},
            sesja: session._id,
            nazwa: name,
            uczestnicy: members,
            nazwaPlacowki: institutionName,
            placowka: institution,
            daneLogowania: {
                email,
                haslo: newPassword,
                rola: SYSTEM_ROLES.TEAM,
            }
        })
    }
}

export default new PublicSessionService()
