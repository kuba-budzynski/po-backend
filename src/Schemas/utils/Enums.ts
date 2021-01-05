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
        arr: ["gosc", "admin", "uzytkownik", "druzyna", "sedzia_glowny", "sedzia_zadania"],
        default: "gosc"
    },
    rodzajePlacowek: {
        arr: ["szkola_srednia", "szkola_wyzsza"],
        default: "szkola_wyzsza"
    }
}

export default enums;