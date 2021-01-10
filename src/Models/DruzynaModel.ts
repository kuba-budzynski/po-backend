import {Document, model} from 'mongoose';
import Id, {DaneDoLogowania, Uczestnik} from './utils/CommonUtils';
import DruzynaSchema from '../Schemas/DruzynaSchema'

export interface IDruzyna {
    sesja: Id,
    statusDruzyny: string,
    rozwiazania: Id[],
    wynik: {
        poprawne: number,
        czas: number
    },
    powodDyskwalifikacji?: string,
    nazwa: string,
    nazwaPlacowki: string,
    placowka: string,
    uczestnicy: Uczestnik[],
    daneLogowania: DaneDoLogowania
}

export type DruzynaModel = IDruzyna & Document

const Druzyna = model<DruzynaModel>('Druzyna', DruzynaSchema, 'druzyny');
export default Druzyna;
