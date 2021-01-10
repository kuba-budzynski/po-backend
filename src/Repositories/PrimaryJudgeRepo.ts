import {BaseRepository} from './BaseRepo';
import SedziaGlowny, {ISedziaGlowny} from '../Models/SedziaGlownyModel';

export class PrimaryJudgeRepo extends BaseRepository<ISedziaGlowny> {
    constructor() {
        super(SedziaGlowny);
    }
}

export default new PrimaryJudgeRepo();
