import {BaseRepository} from './BaseRepo';
import Druzyna, {IDruzyna} from '../Models/DruzynaModel';

export class TeamRepo extends BaseRepository<IDruzyna> {
    constructor() {
        super(Druzyna);
    }
}

export default new TeamRepo();
