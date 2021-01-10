import {BaseRepository} from './BaseRepo';
import Ranking, {RankingModel} from '../Models/RankingModel';

export class RankingRepo extends BaseRepository<RankingModel> {
    constructor() {
        super(Ranking);
    }
}

export default new RankingRepo();
