import { BaseRepository } from './BaseRepo';
import Watek, { WatekModel } from '../Models/WatekModel';
import { UpdateQuery, _AllowStringsForIds, FilterQuery } from 'mongoose';

export class ThreadRepo implements BaseRepository<WatekModel>{

    async create(item: WatekModel): Promise<WatekModel> {
        return Watek.create(item);
    }
    async update(id: string, item: UpdateQuery<WatekModel>): Promise<WatekModel> {
        return Watek.findByIdAndUpdate(id, item);
    }
    async delete(id: string): Promise<WatekModel> {
        return Watek.findByIdAndDelete(id);
    }
    async find(item: FilterQuery<WatekModel>): Promise<WatekModel[]> {
        return Watek.find(item);
    }
    async findOne(item: FilterQuery<WatekModel>): Promise<WatekModel> {
        return Watek.findOne(item);
    }
}

export default new ThreadRepo();
