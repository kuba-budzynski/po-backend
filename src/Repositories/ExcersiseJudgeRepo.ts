import { BaseRepository } from './BaseRepo';
import { UpdateQuery, _AllowStringsForIds, FilterQuery } from 'mongoose';
import SedziaZadania, { SedziaZadaniaModel } from '../Models/SedziaZadaniaModel';

export class PrimaryJudgeRepo implements BaseRepository<SedziaZadaniaModel>{

    async create(item: SedziaZadaniaModel): Promise<SedziaZadaniaModel> {
        return SedziaZadania.create(item);
    }
    async update(id: string, item: UpdateQuery<SedziaZadaniaModel>): Promise<SedziaZadaniaModel> {
        return SedziaZadania.findByIdAndUpdate(id, item);
    }
    async delete(id: string): Promise<SedziaZadaniaModel> {
        return SedziaZadania.findByIdAndDelete(id);
    }
    async find(item: FilterQuery<SedziaZadaniaModel>): Promise<SedziaZadaniaModel[]> {
        return SedziaZadania.find(item);
    }
    async findOne(item: FilterQuery<SedziaZadaniaModel>): Promise<SedziaZadaniaModel> {
        return SedziaZadania.findOne(item);
    }
}

export default new PrimaryJudgeRepo();