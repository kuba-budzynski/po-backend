import {prop, Ref} from "@typegoose/typegoose";
import User from "./helpers/User";
import Session from "./Session";


export default class PrimaryJudge extends User {
    @prop({required: true, ref: `Session`})
    public session!: Ref<Session>

    @prop({required: true})
    name!: string

    @prop({required: true})
    surname!: string

}
