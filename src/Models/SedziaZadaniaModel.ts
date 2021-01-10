import { Document, Schema, model } from 'mongoose';
import Id, { DaneDoLogowania } from './utils/CommonUtils';
import SedziaZadaniaSchema from '../Schemas/SedziaZadaniaSchema'

export interface ISedziaZadania {
    imie: String,
    nazwisko: String,
    daneLogowania: DaneDoLogowania,
    sesja: Id,
    zadanie: Id
}

export interface SedziaZadaniaModel extends ISedziaZadania, Document { }

const SedziaZadania = model<SedziaZadaniaModel>('SedziaZadania', SedziaZadaniaSchema, 'sedziowieZadan');
export default SedziaZadania; 