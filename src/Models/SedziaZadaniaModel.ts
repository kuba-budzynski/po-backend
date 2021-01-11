import {prop, Ref} from "@typegoose/typegoose";
import {DaneLogowania} from "./utils/CommonUtils";
import Sesja from "./SesjaModel";
import Zadanie from "./ZadanieModel";

export default class SedziaZadania {
    @prop({required: true})
    imie!: string

    @prop({required: true})
    nazwisko!: string

    @prop({required: true})
    public daneLogowania!: DaneLogowania

    @prop({required: true, ref: Sesja})
    public sesja!: Ref<Sesja>

    @prop({required: true, ref: Zadanie})
    public zadanie!: Ref<Zadanie>
}
