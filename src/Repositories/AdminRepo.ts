import { BaseRepository } from './BaseRepo';
import Administrator, { AdministratorModel } from '../Models/AdministratorModel';
import { UpdateQuery, _AllowStringsForIds, FilterQuery } from 'mongoose';

export class AdminRepo implements BaseRepository<AdministratorModel>{

    async create(item: AdministratorModel): Promise<AdministratorModel> {
        return Administrator.create(item);
    }
    async update(id: string, item: UpdateQuery<AdministratorModel>): Promise<AdministratorModel> {
        return Administrator.findByIdAndUpdate(id, item);
    }
    async delete(id: string): Promise<AdministratorModel> {
        return Administrator.findByIdAndDelete(id);
    }
    async find(item: FilterQuery<AdministratorModel>): Promise<AdministratorModel[]> {
        return Administrator.find(item);
    }
    async findOne(item: FilterQuery<AdministratorModel>): Promise<AdministratorModel> {
        return Administrator.findOne(item);
    }
}

export default new AdminRepo();