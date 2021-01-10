import {BaseRepository} from './BaseRepo';
import SedziaGlowny, {SedziaGlownyModel} from '../Models/SedziaGlownyModel';

export class PrimaryJudgeRepo extends BaseRepository<SedziaGlownyModel> {
    constructor() {
        super(SedziaGlowny);
    }
}

export default new PrimaryJudgeRepo();
