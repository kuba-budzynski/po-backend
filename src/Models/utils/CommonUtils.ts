// Common types used in models

import {prop} from "@typegoose/typegoose";
import {UzytkownikRola} from "../DruzynaModel";

export class DaneLogowania {
    @prop({required: true})
    public email!: string

    @prop({required: true})
    public haslo!: string

    @prop({required: true, enum: UzytkownikRola})
    public rola!: UzytkownikRola
}

export class User {
    @prop({required: true, default: DaneLogowania})
    public daneLogowania!: DaneLogowania
}
