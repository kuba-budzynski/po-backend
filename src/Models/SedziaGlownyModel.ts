import {prop, Ref} from "@typegoose/typegoose";
import {DaneLogowania} from "./utils/CommonUtils";
import Sesja from "./SesjaModel";

export default class SedziaGlowny {
    @prop({required: true, ref: Sesja})
    public sesja!: Ref<Sesja>

    @prop({required: true})
    public daneLogowania!: DaneLogowania;

    @prop({required: true})
    imie!: string

    @prop({required: true})
    nazwisko!: string

}
