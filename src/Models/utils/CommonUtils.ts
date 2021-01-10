// Common types used in models

import { Schema } from 'mongoose';

type Id = Schema.Types.ObjectId;

export interface DaneDoLogowania {
    email: String,
    haslo: String,
    rola: String,
}

export interface Uczestnik {
    czyKapitan: Boolean,
    imie: String,
    nazwisko: String
}

export interface PlikRozwiazania {
    nazwa: String,
    rozmiar: Number,
    kod: String
}

export interface Rejestracja {
    start: Date,
    koniec: Date,
    wyniki: Date
}

export interface Post {
    autor: Id,
    rola: String,
    tresc: String,
    wyslano: Date
}

export interface Test {
    daneWejsciowe: String,
    daneWyjsciowe: String,
    limitCzasowy?: Number
}

export default Id;
