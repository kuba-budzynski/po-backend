import {BaseRepository} from './BaseRepo';
import Ranking, {IRanking} from '../Models/RankingModel';

export class RankingRepo extends BaseRepository<IRanking> {
    constructor() {
        super(Ranking);
    }
}

export default new RankingRepo();
