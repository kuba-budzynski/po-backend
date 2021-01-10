import { BaseRepository } from './BaseRepo';
import Sesja, { SesjaModel } from '../Models/SesjaModel';
import { UpdateQuery, _AllowStringsForIds, FilterQuery } from 'mongoose';

export class SessionRepo implements BaseRepository<SesjaModel>{

    async create(item: SesjaModel): Promise<SesjaModel> {
        return Sesja.create(item);
    }
    async update(id: string, item: UpdateQuery<SesjaModel>): Promise<SesjaModel> {
        return Sesja.findByIdAndUpdate(id, item);
    }
    async delete(id: string): Promise<SesjaModel> {
        return Sesja.findByIdAndDelete(id);
    }
    async find(item: FilterQuery<SesjaModel>): Promise<SesjaModel[]> {
        return Sesja.find(item);
    }
    async findOne(item: FilterQuery<SesjaModel>): Promise<SesjaModel> {
        return Sesja.findOne(item);
    }
}

export default new SessionRepo();