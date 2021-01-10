// Common types used in models

import { Schema } from 'mongoose';

type Id = Schema.Types.ObjectId;

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

export interface PlikRozwiazania {
    nazwa: string,
    rozmiar: number,
    kod: string
}

export interface Rejestracja {
    start: Date,
    koniec: Date,
    wyniki: Date
}

export interface Post {
    autor: Id,
    rola: string,
    tresc: string,
    wyslano: Date
}

export interface Test {
    daneWejsciowe: string,
    daneWyjsciowe: string,
    limitCzasowy?: number
}

export default Id;
