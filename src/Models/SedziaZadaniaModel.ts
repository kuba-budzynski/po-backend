import {modelOptions, prop, Ref} from "@typegoose/typegoose";
import {User} from "./utils/CommonUtils";
import Sesja from "./SesjaModel";
import Zadanie from "./ZadanieModel";

@modelOptions({ schemaOptions: { collection: 'sedziowie_zadan' } })
export default class SedziaZadania extends User {
    @prop({required: true})
    public imie!: string

    @prop({required: true})
    public nazwisko!: string

    @prop({required: true, ref: `Sesja`})
    public sesja!: Ref<Sesja>

    @prop({required: true, ref: `Zadanie`})
    public zadanie!: Ref<Zadanie>
}
