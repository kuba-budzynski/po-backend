import {prop, Ref} from "@typegoose/typegoose";
import Session from "./Session";
import User from "./helpers/User";
import Solution from "./Solution";

export enum SchoolType {
    HIGH_SCHOOL = "szkola_srednia",
    UNIVERSITY = "szkola_wyzsza",
}

export enum TeamStatus {
    REGISTERED = "zarejestrowana",
    REJECTED = "odrzucona",
    QUALIFIED = "zakwalifikowana",
    DISQUALIFIED = "zdyskwalifikowana",
}


class Score {
    @prop({required: true, default: 0})
    correct!: number;

    @prop({required: true, default: 0})
    time!: number;
}

export class Member {
    @prop({required: true})
    public name!: string

    @prop({required: true})
    public surname!: string

    @prop({required: true, default: false})
    public isCaptain!: boolean
}


export default class Team extends User {
    @prop({required: true})
    public name!: string

    @prop({required: true})
    public schoolName!: string

    @prop({required: true, enum: SchoolType})
    public schoolType!: SchoolType;

    @prop({
        required: true, type: [Member], validate: {
            validator: (members) => members.length >= 2 && members.length <= 3,
            message: 'Niepoprawna ilość uczestników. Może być 2-3 uczestników.'
        }
    })
    public members!: Member[];

    @prop({required: true, ref: `Session`})
    public session!: Ref<Session>

    @prop({required: true, enum: TeamStatus, default: TeamStatus.REGISTERED})
    public status!: TeamStatus;

    @prop({required: true, ref: `Solution`, default: []})
    public solutions!: Ref<Solution>[]

    @prop({required: true, default: new Score()})
    public scores!: Score

    @prop()
    public disqualifiedReason?: string
}
