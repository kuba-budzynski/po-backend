import Team from "./Team";
import {prop, Ref} from "@typegoose/typegoose";
import Exercise from "./Exercise";


export enum SolutionStatus {
    PENDING = "PENDING",
    CORRECT = "CORRECT",
    ERROR_PRESENTATION = "ERROR_PRESENTATION",
    ERROR_COMPILATION = "ERROR_COMPILATION",
    ERROR_TIME = "ERROR_TIME",
    ERROR_EXECUTION = "ERROR_EXECUTION",
}

export class SolutionFile {
    @prop({required: true})
    public name!: string

    @prop({required: true})
    public size!: number

    @prop({required: true})
    public code!: Buffer
}



export default class Solution {
    @prop({ required: true, ref: `Team` })
    public author!: Ref<Team>

    @prop({ required: true, ref: `Exercise` })
    public exercise!: Ref<Exercise>

    @prop({required: true})
    public sent!: Date

    @prop({required: true, enum: SolutionStatus, default: SolutionStatus.PENDING})
    public status!: SolutionStatus;

    @prop()
    public solutionTime?: number

    @prop({required: true})
    public solutionFile!: SolutionFile

    public isBlocking() {
        return this.isStatus(SolutionStatus.CORRECT) || this.isStatus(SolutionStatus.PENDING)
    }

    public isError() {
        return !this.isBlocking()
    }

    public belongsToExercise(exerciseId: string) {
        return this.exercise.toString() === exerciseId
    }

    public isStatus(status: SolutionStatus) {
        return this.status === status
    }
}
