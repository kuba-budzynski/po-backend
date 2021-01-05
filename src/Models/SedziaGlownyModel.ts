import { Document, Schema, model } from 'mongoose';
import Id, {DaneDoLogowania} from './utils/CommonUtils';
import SedziaGlownySchema from '../Schemas/SedziaGlownySchema'

export interface ISedziaGlowny {
    imie: String,
    nazwisko: String,
    daneLogowania: DaneDoLogowania
    sesja: Id
}

interface SedziaGlownyModel extends ISedziaGlowny, Document { }

const SedziaGlowny = model<SedziaGlownyModel>('SedziaGlowny', SedziaGlownySchema, 'sedziowieGlowni');
export default SedziaGlowny; 