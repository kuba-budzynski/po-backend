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

export const SOLUTION_STATUS = {
    PENDING: "oczekujace",
    CORRECT: "poprawne",
    ERROR_PRESENTATION: "blad_prezentacji",
    ERROR_COMPILATION: "blad_kompilacji",
    ERROR_TIME: "blad_czasowy",
    ERROR_EXECUTION: "blad_wykonania",
}

const enums = {
    statusDruzyny: {
        arr: Object.values(TEAM_STATUS),
        default: TEAM_STATUS.REGISTERED,
    },
    statusRozwiazania: {
        arr: Object.values(SOLUTION_STATUS),
        default: SOLUTION_STATUS.PENDING,
    },
    rolaWSystemie: {
        arr: Object.values(SYSTEM_ROLES),
        default: SYSTEM_ROLES.USER,
    },
    rodzajePlacowek: {
        arr: Object.values(INSITUTION_TYPES),
        default: INSITUTION_TYPES.UNIVERSITY,
    }
}

export default enums;
