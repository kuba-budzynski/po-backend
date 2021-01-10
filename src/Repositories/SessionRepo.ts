import {BaseRepository} from './BaseRepo';
import Sesja, {ISesja} from '../Models/SesjaModel';

export class SessionRepo extends BaseRepository<ISesja> {
    constructor() {
        super(Sesja);
    }
}

export default new SessionRepo();
