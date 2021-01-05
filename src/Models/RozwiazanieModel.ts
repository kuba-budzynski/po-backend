import { Document, Schema, model } from 'mongoose';
import Id, {PlikRozwiazania} from './utils/CommonUtils';
import RozwiazanieSchema from '../Schemas/RozwiazanieSchema'

export interface IRozwiazanie {
    autor: Id,
    zadanie: Id,
    wyslano: Date,
    status: String,
    czasRozwiazania: Number,
    plikRozwiazania: PlikRozwiazania
}

interface RozwiazanieModel extends IRozwiazanie, Document { }

const Rozwiazanie = model<RozwiazanieModel>('Rozwiazanie', RozwiazanieSchema, 'rozwiazania');
export default Rozwiazanie; 