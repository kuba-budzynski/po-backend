import {prop, Ref} from "@typegoose/typegoose";
import Exercise from "./Exercise";
import Session from "./Session";
import Team from "./Team";
import ExerciseJudge from "./ExerciseJudge";

abstract class Post {
    @prop({required: true})
    public content!: string

    @prop({required: true})
    public sent!: Date
}

class Question extends Post {
    @prop({required: true, ref: `Team`})
    public author!: Ref<Team>
}

class Answer extends Post {
    @prop({required: true, ref: `ExerciseJudge`})
    public author!: Ref<ExerciseJudge>
}


export default class Thread {
    @prop({required: true, ref: `Exercise`})
    public exercise!: Ref<Exercise>

    @prop({required: true, ref: `Session`})
    public session!: Ref<Session>

    @prop({required: true})
    public title!: string

    @prop({required: true})
    public created!: Date

    @prop({required: true, default: [], type: [Question]})
    questions: Question[]

    @prop({required: true, default: [], type: [Answer]})
    answers: Answer[]
}

