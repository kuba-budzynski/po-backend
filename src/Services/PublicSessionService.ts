import SessionRepo from "../Repositories/SessionRepo";
import {ObjectID} from "mongodb";
import bcrypt from "bcrypt";
import {Uczestnik} from "../Models/utils/CommonUtils";
import TeamRepo from "../Repositories/TeamRepo";
import {SYSTEM_ROLES} from "../Schemas/utils/Enums";

type TeamSignupType = {
    email: string,
    password: string,
    members: Uczestnik[],
    name: string,
    institutionName: string,
    institution: string,
}

class PublicSessionService {
    /*
    async getActiveSessionList() {
        const now = new Date()
        return SessionRepo.find({
            start: {$gt: now},
            "rejestracja.start": {$lt: now},
            "rejestracja.koniec": {$gt: now}
        })
    }*/
    async getPublicSession(sessionId: string) {
        const id = new ObjectID(sessionId)
        const session = await SessionRepo.findOne({ _id: id })
        if (!session)
            throw new Error("Nie znaleziono sesji o podanym id.")

        return session

        const now = new Date()
        if (now > session.rejestracja.koniec)
            throw new Error("Termin rejestracji upłynął.")

        // start: {$gt: now},
        // "rejestracja.start": {$lt: now},
        // "rejestracja.koniec": {$gt: now}

    }

    async signupPublicSession(sessionId: string, data: TeamSignupType) {
        const id = new ObjectID(sessionId)
        const session = await SessionRepo.findOne({ _id: id })
        if (!session)
            throw new Error("Nie znaleziono sesji o podanym id.")

        const { email, password, members, name, institutionName, institution } = data
        const found = await TeamRepo.find({ "sesja._id": id, "daneLogowania.email": email })
        if (found?.length)
            throw new Error("Już istnieje konto o takim adresie e-mail.")

        const salt = await bcrypt.genSalt(10)
        const newPassword = await bcrypt.hash(password, salt)

        // const team = TeamRepo.create({
        //     sesja: session._id,
        //     nazwa: name,
        //     uczestnicy: members,
        //     nazwaPlacowki: institutionName,
        //     placowka: institution,
        //     daneLogowania: {
        //         email,
        //         haslo: newPassword,
        //         rola: SYSTEM_ROLES.TEAM,
        //     },
        // })
        // const created = await

    }
}

export default new PublicSessionService()
