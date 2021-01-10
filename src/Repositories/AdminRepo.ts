import {BaseRepository} from './BaseRepo';
import Administrator, {AdministratorModel} from '../Models/AdministratorModel';

export class AdminRepo extends BaseRepository<AdministratorModel> {
    constructor() {
        super(Administrator);
    }
}

export default new AdminRepo();
