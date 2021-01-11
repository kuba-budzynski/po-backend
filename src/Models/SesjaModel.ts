import {prop} from "@typegoose/typegoose";
import Druzyna from "./DruzynaModel";
import Zadanie from "./ZadanieModel";
import SedziaGlowny from "./SedziaGlownyModel";
import SedziaZadania from "./SedziaZadaniaModel";
import Watek from "./WatekModel";
import Ranking from "./RankingModel";

export class Rejestracja {
    @prop()
    public start: Date

    @prop()
    public koniec: Date

    @prop()
    public wyniki: Date
}

export default class Sesja {
    @prop({required: true})
    public name!: string

    @prop({required: true, default: ""})
    public description!: string

    @prop({required: true, default: []})
    public dozwoloneRozszerzenia!: string[]

    @prop({required: true})
    public start!: Date

    @prop({required: true})
    public koniec!: Date

    @prop({required: true, ref: Druzyna, default: []})
    public druzyny!: Druzyna[]

    @prop({required: true, ref: Zadanie, default: []})
    public zadania!: Zadanie[]

    @prop({required: true, ref: Watek, default: []})
    public watki!: Watek[]

    @prop({ref: SedziaGlowny})
    public sedziaGlowny: SedziaGlowny

    @prop({ref: SedziaZadania, required: true, default: []})
    public sedziowieZadan: SedziaZadania[]

    @prop({required: true, default: Rejestracja})
    public rejestracja!: Rejestracja;

    @prop({ref: Ranking, required: true, default: Ranking})
    public ranking!: Ranking
}
