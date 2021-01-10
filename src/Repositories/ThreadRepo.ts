import {BaseRepository} from './BaseRepo';
import Watek, {IWatek} from '../Models/WatekModel';

export class ThreadRepo extends BaseRepository<IWatek> {
    constructor() {
        super(Watek);
    }
}

export default new ThreadRepo();
