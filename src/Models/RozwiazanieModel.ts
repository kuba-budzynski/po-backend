import Druzyna from "./DruzynaModel";
import {prop} from "@typegoose/typegoose";
import Zadanie from "./ZadanieModel";


export enum StatusRozwiazania {
    OCZEKUJACY = "oczekujace",
    POPRAWNY = "poprawne",
    BLAD_PREZENTACJI = "blad_prezentacji",
    BLAD_KOMPILACJI = "blad_kompilacji",
    BLAD_CZASOWY = "blad_czasowy",
    BLAD_WYKONANIA = "blad_wykonania",
}

class PlikRozwiazania {
    @prop({required: true})
    public nazwa!: string

    @prop({required: true})
    public rozmiar!: number

    @prop({required: true})
    public kod!: string
}


export default class Rozwiazanie {
    @prop({ required: true, ref: Druzyna })
    public autor!: Druzyna

    @prop({ required: true, ref: Zadanie })
    public zadanie!: Zadanie

    @prop({required: true})
    public wyslano!: Date

    @prop({required: true, enum: StatusRozwiazania, default: StatusRozwiazania.OCZEKUJACY})
    public status!: StatusRozwiazania;

    @prop({required: true, default: 0})
    public czasRozwiazania!: number

    @prop({required: true})
    plikRozwiazania!: PlikRozwiazania
}
