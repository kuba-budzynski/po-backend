import {BaseRepository} from './BaseRepo';
import Watek, {WatekModel} from '../Models/WatekModel';

export class ThreadRepo extends BaseRepository<WatekModel> {
    constructor() {
        super(Watek);
    }
}

export default new ThreadRepo();
