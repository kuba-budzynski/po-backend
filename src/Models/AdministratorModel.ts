import {Document, model} from 'mongoose';
import {DaneDoLogowania} from './utils/CommonUtils';
import AdministratorSchema from '../Schemas/AdministratorSchema'

export interface IAdministrator {
    daneLogowania: DaneDoLogowania
}

export type AdministratorModel = IAdministrator & Document

const Administrator = model<AdministratorModel>('Administrator', AdministratorSchema, 'administratorzy');
export default Administrator;
