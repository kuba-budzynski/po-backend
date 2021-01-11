import {ObjectID} from "mongodb";
import bcrypt from "bcrypt";
import Repository from "../Repositories/Repository";
import {ReturnModelType} from "@typegoose/typegoose";
import Druzyna, {StatusDruzyny, Uczestnik, UzytkownikRola} from "../Models/DruzynaModel";
import Administrator from "../Models/AdministratorModel";
import SedziaZadania from "../Models/SedziaZadaniaModel";
import SedziaGlowny from "../Models/SedziaGlownyModel";

type Repo = ReturnModelType<typeof Administrator> | ReturnModelType<typeof Druzyna> | ReturnModelType<typeof SedziaZadania> | ReturnModelType<typeof SedziaGlowny>

type TeamSignupType = {
    email: string,
    password: string,
    members: Uczestnik[],
    name: string,
    institutionName: string,
    institution: string,
}

class AuthService {
    private static async getLogin(repo: Repo, email: string, sessionId?: string) {
        const user = await repo.findOne({
            ...(sessionId && {"sesja._id": new ObjectID(sessionId)}),
            "daneLogowania.email": email
        })
        if (!user)
            throw new Error("Błędny email lub hasło.")

        return {
            daneLogowania: user.daneLogowania,
            id: user.id,
        }
    }

    async getAdminLogin(email: string) {
        return AuthService.getLogin(Repository.AdministratorRepo, email)
    }

    async getTeamLogin(email: string, sessionId: string) {
        return AuthService.getLogin(Repository.DruzynaRepo, email, sessionId)
    }

    async getPrimaryJudgeLogin(email: string, sessionId: string) {
        return AuthService.getLogin(Repository.SedziaGlownyRepo, email, sessionId)
    }

    async getExerciseJudgeLogin(email: string, sessionId: string) {
        return AuthService.getLogin(Repository.SedziaZadaniaRepo, email, sessionId)
    }

    async teamSignup(sessionId: string, data: TeamSignupType) {
        const id = new ObjectID(sessionId)
        const session = await Repository.SesjaRepo.get(sessionId)
        if (!session)
            throw new Error("Nie znaleziono sesji o podanym id.")

        const { email, password, members, name, institutionName, institution } = data
        const found = await Repository.DruzynaRepo.findOne({ "sesja._id": id, "daneLogowania.email": email })
        if (!!found)
            throw new Error("Już istnieje konto o takim adresie e-mail.")

        const salt = await bcrypt.genSalt(10)
        const newPassword = await bcrypt.hash(password, salt)

        return await Repository.DruzynaRepo.create({
            rozwiazania: [],
            statusDruzyny: StatusDruzyny.ZAREJESTROWANY,
            wynik: {czas: 0, poprawne: 0},
            sesja: session._id,
            nazwa: name,
            uczestnicy: members,
            nazwaPlacowki: institutionName,
            placowka: institution,
            daneLogowania: {
                email,
                haslo: newPassword,
                rola: UzytkownikRola.DRUZYNA,
            }
        })
    }
}

export default new AuthService();
