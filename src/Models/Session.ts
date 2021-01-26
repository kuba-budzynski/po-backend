import {prop, Ref} from "@typegoose/typegoose";
import Team from "./Team";
import Exercise from "./Exercise";
import PrimaryJudge from "./PrimaryJudge";
import ExerciseJudge from "./ExerciseJudge";
import Thread from "./Thread";

export class Registration {
    @prop({required: false})
    public start: Date

    @prop({ required: false })
    public end: Date

    @prop({ required: false })
    public results: Date
}


export default class Session {
    @prop({required: true})
    public name!: string

    @prop({default: ""})
    public description!: string

    @prop({default: [], type: [String] })
    public allowedExtensions!: string[]

    @prop({required: true})
    public start!: Date

    @prop({required: true})
    public end!: Date

    @prop({required: true, ref: `Team`, default: []})
    public teams!: Ref<Team>[]

    @prop({required: true, ref: `Exercise`, default: []})
    public exercises!: Ref<Exercise>[]

    @prop({required: true, ref: `Thread`, default: []})
    public threads!: Ref<Thread>[]

    @prop({ref: `PrimaryJudge`, required: false})
    public primaryJudges: Ref<PrimaryJudge>

    @prop({ref: `ExerciseJudge`, default: []})
    public exerciseJudges: Ref<ExerciseJudge>[]

    @prop({default: new Registration()})
    public registration: Registration

    @prop({default: false})
    public isRankingFrozen: boolean

    public isInProgress() {
        const now = new Date()
        return now > this.start && now < this.end
    }
}
