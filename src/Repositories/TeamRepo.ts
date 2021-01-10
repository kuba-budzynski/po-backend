import { BaseRepository } from './BaseRepo';
import Druzyna, { DruzynaModel } from '../Models/DruzynaModel';
import { UpdateQuery, _AllowStringsForIds, FilterQuery } from 'mongoose';

export class TeamRepo implements BaseRepository<DruzynaModel>{

    async create(item: DruzynaModel): Promise<DruzynaModel> {
        return Druzyna.create(item);
    }
    async update(id: string, item: UpdateQuery<DruzynaModel>): Promise<DruzynaModel> {
        return Druzyna.findByIdAndUpdate(id, item);
    }
    async delete(id: string): Promise<DruzynaModel> {
        return Druzyna.findByIdAndDelete(id);
    }
    async find(item: FilterQuery<DruzynaModel>): Promise<DruzynaModel[]> {
        return Druzyna.find(item);
    }
    async findOne(item: FilterQuery<DruzynaModel>): Promise<DruzynaModel> {
        return Druzyna.findOne(item);
    }
}

export default new TeamRepo();