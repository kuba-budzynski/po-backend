import { Document, Schema, model } from 'mongoose';
import Id, {Test} from './utils/CommonUtils';
import ZadaniaSchema from '../Schemas/ZadaniaSchema'

export interface IZadanie {
    sedzia: Id,
    tresc: String,
    numer: Number,
    nazwa: String,
    testy: Test[]
}

interface ZadanieModel extends IZadanie, Document { }

const Zadanie = model<ZadanieModel>('Zadanie', ZadaniaSchema, 'zadania');
export default Zadanie; 