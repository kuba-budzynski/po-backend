import {prop, Ref} from "@typegoose/typegoose";
import ExerciseJudge from "./ExerciseJudge";

export class Test {
    @prop({required: true})
    public input!: string

    @prop({required: true})
    public output!: string

    @prop({required: true})
    public timeLimit!: number

}


export default class Exercise {
    [x: string]: any;
    @prop({ref: `ExerciseJudge`})
    public judge?: Ref<ExerciseJudge>

    @prop({required: true})
    public content!: string

    @prop({required: true})
    public name!: string

    @prop({required: true})
    public number!: number

    @prop({required: true, default: [], type: [Test]})
    public tests!: Test[]
}
