import {modelOptions, prop, Ref} from "@typegoose/typegoose";
import Sesja from "./SesjaModel";
import {User} from "./utils/CommonUtils";
import Rozwiazanie from "./RozwiazanieModel";

export enum UzytkownikRola {
    ADMIN = "admin",
    UZYTKOWNIK = "uzytkownik",
    DRUZYNA = "druzyna",
    SEDZIA_GLOWNY = "sedzia_glowny",
    SEDZIA_ZADAINIA = "sedzia_zadania",
}

export enum TypPlacowki {
    SZKOLA_SREDNIA = "szkola_srednia",
    SZKOLA_WYZSZA = "szkola_wyzsza",
}

export enum StatusDruzyny {
    ZAREJESTROWANY = "zarejestrowana",
    ODRZUCONY = "odrzucona",
    ZAKWALIFIKOWANY = "zakwalifikowana",
    ZDYSKWALIFIKOWANY = "zdyskwalifikowana",
}


class Wynik {
    @prop({required: true, default: 0})
    poprawne!: number;

    @prop({required: true, default: 0})
    czas!: number;
}

export class Uczestnik {
    @prop({required: true})
    public imie!: string

    @prop({required: true})
    public nazwisko!: string

    @prop({required: true, default: false})
    public czyKapitan!: boolean
}

@modelOptions({ schemaOptions: { collection: 'druzyny' } })
export default class Druzyna extends User {
    @prop({required: true})
    public nazwa!: string

    @prop({required: true})
    public nazwaPlacowki!: string

    @prop({required: true, enum: TypPlacowki})
    public placowka!: TypPlacowki;

    @prop({
        required: true, type: [Uczestnik], validate: {
            validator: (members) => members.length >= 2 && members.length <= 3,
            message: 'Niepoprawna ilość uczestników. Może być 2-3 uczestników.'
        }
    })
    public uczestnicy!: Uczestnik[];

    @prop({ required: true, ref: `Sesja` })
    public sesja!: Ref<Sesja>

    @prop({required: true, enum: StatusDruzyny, default: StatusDruzyny.ZAREJESTROWANY})
    public status!: StatusDruzyny;

    @prop({ required: true, ref: `Rozwiazanie`, default: [] })
    public rozwiazania!: Ref<Rozwiazanie>[]

    @prop({required: true, default: Wynik})
    public wynik!: Wynik

    @prop()
    public powodDyskwalifikacji?: string
}
