import {BaseRepository} from './BaseRepo';
import Administrator, {IAdministrator} from '../Models/AdministratorModel';

export class AdminRepo extends BaseRepository<IAdministrator> {
    constructor() {
        super(Administrator);
    }
}

export default new AdminRepo();
