import {prop, Ref} from "@typegoose/typegoose";
import Team from "./Team";
import Exercise from "./Exercise";

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

    @prop({default: new Registration()})
    public registration: Registration

    @prop({default: false})
    public isRankingFrozen: boolean

    public isInProgress() {
        const now = new Date()
        return now > this.start && now < this.end
    }
}
