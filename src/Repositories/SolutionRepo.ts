import { BaseRepository } from './BaseRepo';
import Rozwiazanie, { RozwiazanieModel } from '../Models/RozwiazanieModel';
import { UpdateQuery, _AllowStringsForIds, FilterQuery } from 'mongoose';

export class SolutionRepo implements BaseRepository<RozwiazanieModel>{

    async create(item: RozwiazanieModel): Promise<RozwiazanieModel> {
        return Rozwiazanie.create(item);
    }
    async update(id: string, item: UpdateQuery<RozwiazanieModel>): Promise<RozwiazanieModel> {
        return Rozwiazanie.findByIdAndUpdate(id, item);
    }
    async delete(id: string): Promise<RozwiazanieModel> {
        return Rozwiazanie.findByIdAndDelete(id);
    }
    async find(item: FilterQuery<RozwiazanieModel>): Promise<RozwiazanieModel[]> {
        return Rozwiazanie.find(item);
    }
    async findOne(item: FilterQuery<RozwiazanieModel>): Promise<RozwiazanieModel> {
        return Rozwiazanie.findOne(item);
    }
}

export default new SolutionRepo();