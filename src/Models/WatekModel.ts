import {Document, model} from 'mongoose';
import Id, {Post} from './utils/CommonUtils';
import WatekSchema from '../Schemas/WatekSchema'

export interface IWatek {
    zadanie: Id,
    sesja: Id,
    temat: string,
    zalozono: Date,
    pytania: Post[],
    odpowiedzi: Post[]
}

export type WatekModel = IWatek & Document

const Watek = model<WatekModel>('Watek', WatekSchema, 'watki');
export default Watek; 
