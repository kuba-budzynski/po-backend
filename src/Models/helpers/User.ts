// Common types used in models

import {prop} from "@typegoose/typegoose";

export enum UserRole {
    ADMIN = "ADMIN",
    USER = "USER",
    TEAM = "TEAM",
    JUDGE_PRIMARY = "JUDGE_PRIMARY",
    JUDGE_EXERCISE = "JUDGE_EXERCISE",
}

export class LoginData {
    @prop({required: true})
    public email!: string

    @prop({required: true})
    public password!: string

    @prop({required: true, enum: UserRole})
    public role!: UserRole
}

export default class User {
    @prop({required: true})
    public loginData!: LoginData
}
