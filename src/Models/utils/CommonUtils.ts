// Common types used in models

import {Schema} from 'mongoose';
import {prop} from "@typegoose/typegoose";
import {UzytkownikRola} from "../DruzynaModel";

type Id = Schema.Types.ObjectId;
export default Id;

export interface DaneDoLogowania {
    email: string,
    haslo: string,
    rola: string,
}

export interface Uczestnik {
    czyKapitan: boolean,
    imie: string,
    nazwisko: string
}

export class DaneLogowania {
    @prop({required: true})
    public email!: string

    @prop({required: true})
    public haslo!: string

    @prop({required: true, enum: UzytkownikRola})
    public rola!: UzytkownikRola
}
