export const SYSTEM_ROLES = {
    ADMIN: "admin",
    USER: "uzytkownik",
    TEAM: "druzyna",
    JUDGE_PRIMARY: "sedzia_glowny",
    JUDGE_EXERCISE: "sedzia_zadania",
}

const enums = {
    statusDruzyny: {
        arr: ["oczekujaca", "zarejestrowana", "odrzucona", "zakwalifikowana", "zdyskwalifikowana"],
        default: "oczekujaca"
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
        arr: ["szkola_srednia", "szkola_wyzsza"],
        default: "szkola_wyzsza"
    }
}

export default enums;
