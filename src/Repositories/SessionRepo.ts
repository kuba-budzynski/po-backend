import {BaseRepository} from './BaseRepo';
import Sesja, {SesjaModel} from '../Models/SesjaModel';

export class SessionRepo extends BaseRepository<SesjaModel> {
    constructor() {
        super(Sesja);
    }
}

export default new SessionRepo();
