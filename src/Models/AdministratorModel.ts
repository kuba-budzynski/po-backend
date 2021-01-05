import { Document, Schema, model} from 'mongoose';
import Id, {DaneDoLogowania} from './utils/CommonUtils';
import AdministratorSchema from '../Schemas/AdministratorSchema'

export interface IAdministrator {
    sesje: Id[],
    imie: String,
    nazwisko: String,
    daneDoLogowania: DaneDoLogowania
}

interface AdministratorModel extends IAdministrator, Document { }

const Administrator = model<AdministratorModel>('Administrator', AdministratorSchema, 'administratorzy');
export default Administrator;