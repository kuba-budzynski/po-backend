export const SYSTEM_ROLES = {
    ADMIN: "admin",
    USER: "uzytkownik",
    TEAM: "druzyna",
    JUDGE_PRIMARY: "sedzia_glowny",
    JUDGE_EXERCISE: "sedzia_zadania",
}

export const INSITUTION_TYPES = {
    HIGH_SCOOL: "szkola_srednia",
    UNIVERSITY: "szkola_wyzsza",
}

export const TEAM_STATUS = {
    REGISTERED: "zarejestrowana",
    REJECTED: "odrzucona",
    QUALIFIED: "zakwalifikowana",
    DISQUALIFIED: "zdyskwalifikowana",
}
const enums = {
    statusDruzyny: {
        arr: Object.values(TEAM_STATUS),
        default: TEAM_STATUS.REGISTERED
    },
    statusRozwiazania: {
        arr: ["oczekujace", "poprawne", "blad_prezentacji", "blad_kompilacji", "blad_czasowy", "blad_wykonania"],
        default: "oczekujaca"
    },
    rolaWSystemie: {
        arr: Object.values(SYSTEM_ROLES),
        default: SYSTEM_ROLES.USER
    },
    rodzajePlacowek: {
        arr: Object.values(INSITUTION_TYPES),
        default: INSITUTION_TYPES.UNIVERSITY
    }
}

export default enums;
