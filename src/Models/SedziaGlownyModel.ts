import {Document, model} from 'mongoose';
import Id, {DaneDoLogowania} from './utils/CommonUtils';
import SedziaGlownySchema from '../Schemas/SedziaGlownySchema'

export interface ISedziaGlowny {
    imie: string,
    nazwisko: string,
    daneLogowania: DaneDoLogowania
    sesja: Id
}

export type SedziaGlownyModel = ISedziaGlowny & Document

const SedziaGlowny = model<SedziaGlownyModel>('SedziaGlowny', SedziaGlownySchema, 'sedziowieGlowni');
export default SedziaGlowny; 
