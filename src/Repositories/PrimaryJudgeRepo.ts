import { BaseRepository } from './BaseRepo';
import { UpdateQuery, _AllowStringsForIds, FilterQuery } from 'mongoose';
import SedziaGlowny, { SedziaGlownyModel } from '../Models/SedziaGlownyModel';

export class PrimaryJudgeRepo implements BaseRepository<SedziaGlownyModel>{

    async create(item: SedziaGlownyModel): Promise<SedziaGlownyModel> {
        return SedziaGlowny.create(item);
    }
    async update(id: string, item: UpdateQuery<SedziaGlownyModel>): Promise<SedziaGlownyModel> {
        return SedziaGlowny.findByIdAndUpdate(id, item);
    }
    async delete(id: string): Promise<SedziaGlownyModel> {
        return SedziaGlowny.findByIdAndDelete(id);
    }
    async find(item: FilterQuery<SedziaGlownyModel>): Promise<SedziaGlownyModel[]> {
        return SedziaGlowny.find(item);
    }
    async findOne(item: FilterQuery<SedziaGlownyModel>): Promise<SedziaGlownyModel> {
        return SedziaGlowny.findOne(item);
    }
}

export default new PrimaryJudgeRepo();
