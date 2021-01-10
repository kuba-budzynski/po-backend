import { BaseRepository } from './BaseRepo';
import Ranking, { RankingModel } from '../Models/RankingModel';
import { UpdateQuery, _AllowStringsForIds, FilterQuery } from 'mongoose';

export class RankingRepo implements BaseRepository<RankingModel>{

    async create(item: RankingModel): Promise<RankingModel> {
        return Ranking.create(item);
    }
    async update(id: string, item: UpdateQuery<RankingModel>): Promise<RankingModel> {
        return Ranking.findByIdAndUpdate(id, item);
    }
    async delete(id: string): Promise<RankingModel> {
        return Ranking.findByIdAndDelete(id);
    }
    async find(item: FilterQuery<RankingModel>): Promise<RankingModel[]> {
        return Ranking.find(item);
    }
    async findOne(item: FilterQuery<RankingModel>): Promise<RankingModel> {
        return Ranking.findOne(item);
    }
}

export default new RankingRepo();