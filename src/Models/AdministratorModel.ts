import {Document, model} from 'mongoose';
import {DaneDoLogowania} from './utils/CommonUtils';
import AdministratorSchema from '../Schemas/AdministratorSchema'

export interface IAdministrator {
    daneDoLogowania: DaneDoLogowania
}

interface AdministratorModel extends IAdministrator, Document { }

const Administrator = model<AdministratorModel>('Administrator', AdministratorSchema, 'administratorzy');
export default Administrator;
