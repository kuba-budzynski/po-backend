import {Document, model} from 'mongoose';
import Id, {PlikRozwiazania} from './utils/CommonUtils';
import RozwiazanieSchema from '../Schemas/RozwiazanieSchema'

export interface IRozwiazanie {
    autor: Id,
    zadanie: Id,
    wyslano: Date,
    status: string,
    czasRozwiazania: number,
    plikRozwiazania: PlikRozwiazania
}

export type RozwiazanieModel = IRozwiazanie & Document

const Rozwiazanie = model<RozwiazanieModel>('Rozwiazanie', RozwiazanieSchema, 'rozwiazania');
export default Rozwiazanie; 
