import { Document, Schema, model } from 'mongoose';
import Id, {Post} from './utils/CommonUtils';
import WatekSchema from '../Schemas/WatekSchema'

export interface IWatek {
    zadanie: Id,
    sesja: Id,
    temat: String,
    zalozono: Date,
    pytania: Post[],
    odpowiedzi: Post[]
}

export interface WatekModel extends IWatek, Document { }

const Watek = model<WatekModel>('Watek', WatekSchema, 'watki');
export default Watek; 