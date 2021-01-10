import {Document, model} from 'mongoose';
import Id, {DaneDoLogowania, Uczestnik} from './utils/CommonUtils';
import DruzynaSchema from '../Schemas/DruzynaSchema'

export interface IDruzyna {
    sesja: Id,
    statusDruzyny: String,
    rozwiazania: Id[],
    wynik: {
        poprawne: Number,
        czas: Number
    },
    powodDyskwalifikacji?: String,
    nazwa: String,
    nazwaPlacowki: String,
    placowka: String,
    uczestnicy: Uczestnik[],
    daneLogowania: DaneDoLogowania
}

export type DruzynaModel = IDruzyna & Document

const Druzyna = model<DruzynaModel>('Druzyna', DruzynaSchema, 'druzyny');
export default Druzyna;
