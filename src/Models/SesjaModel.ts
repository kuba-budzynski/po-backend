import {modelOptions, prop, Ref} from "@typegoose/typegoose";
import Druzyna from "./DruzynaModel";
import Zadanie from "./ZadanieModel";
import SedziaGlowny from "./SedziaGlownyModel";
import SedziaZadania from "./SedziaZadaniaModel";
import Watek from "./WatekModel";

export class Rejestracja {
    @prop()
    public start: Date

    @prop()
    public koniec: Date

    @prop()
    public wyniki: Date
}

@modelOptions({ schemaOptions: { collection: 'sesje' } })
export default class Sesja {
    @prop({required: true})
    public nazwa!: string

    @prop({default: ""})
    public opis!: string

    @prop({default: [], type: [String] })
    public dozwoloneRozszerzenia!: string[]

    @prop({required: true})
    public start!: Date

    @prop({required: true})
    public koniec!: Date

    @prop({required: true, ref: `Druzyna`, default: []})
    public druzyny!: Ref<Druzyna>[]

    @prop({required: true, ref: `Zadanie`, default: []})
    public zadania!: Ref<Zadanie>[]

    @prop({required: true, ref: `Watek`, default: []})
    public watki!: Ref<Watek>[]

    @prop({ref: `SedziaGlowny`})
    public sedziaGlowny: Ref<SedziaGlowny>

    @prop({ref: `SedziaZadania`, default: []})
    public sedziowieZadan: Ref<SedziaZadania>[]

    @prop({default: Rejestracja})
    public rejestracja!: Rejestracja

    @prop({default: false})
    public czyRankingZamrozony: boolean
}
