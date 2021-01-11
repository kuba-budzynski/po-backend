import {modelOptions, prop, Ref} from "@typegoose/typegoose";
import {User} from "./utils/CommonUtils";
import Sesja from "./SesjaModel";

@modelOptions({ schemaOptions: { collection: 'sedziowie_glowni' } })
export default class SedziaGlowny extends User {
    @prop({required: true, ref: `Sesja`})
    public sesja!: Ref<Sesja>

    @prop({required: true})
    imie!: string

    @prop({required: true})
    nazwisko!: string

}
