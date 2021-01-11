import {prop, Ref} from "@typegoose/typegoose";
import User from "./helpers/User";
import Session from "./Session";
import Exercise from "./Exercise";


export default class ExerciseJudge extends User {
    @prop({required: true})
    public name!: string

    @prop({required: true})
    public surname!: string

    @prop({required: true, ref: `Session`})
    public session!: Ref<Session>

    @prop({required: true, ref: `Exercise`})
    public exercise!: Ref<Exercise>
}
