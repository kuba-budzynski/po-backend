import {Document, model} from 'mongoose';
import Id, {Rejestracja} from './utils/CommonUtils';
import SesjaSchema from '../Schemas/SesjaSchema'

export interface ISesja {
    zadania: Id[],
    sedziaGlowny?: Id,
    start: Date,
    koniec: Date,
    nazwa: String,
    opis?: String,
    dozwoloneRozszerzenia: String[],
    druzyny: Id[],
    sedziowieZadan: Id[],
    rejestracja: Rejestracja,
    ranking: Id,
    watki: Id[]
}

export interface SesjaModel extends ISesja, Document { }

const Sesja = model<SesjaModel>('Sesja', SesjaSchema, 'sesje');
export default Sesja;
