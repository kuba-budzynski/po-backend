import {Document, model} from 'mongoose';
import Id, {DaneDoLogowania} from './utils/CommonUtils';
import SedziaZadaniaSchema from '../Schemas/SedziaZadaniaSchema'

export interface ISedziaZadania {
    imie: String,
    nazwisko: String,
    daneLogowania: DaneDoLogowania,
    sesja: Id,
    zadanie: Id
}

export type SedziaZadaniaModel = ISedziaZadania & Document

const SedziaZadania = model<SedziaZadaniaModel>('SedziaZadania', SedziaZadaniaSchema, 'sedziowieZadan');
export default SedziaZadania; 
