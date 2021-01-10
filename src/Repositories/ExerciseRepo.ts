import {BaseRepository} from './BaseRepo';
import Zadanie, {ZadanieModel} from '../Models/ZadanieModel'
import { UpdateQuery, _AllowStringsForIds, FilterQuery } from 'mongoose';

export class ExerciseRepo implements BaseRepository<ZadanieModel>{

    async create(item: ZadanieModel): Promise<ZadanieModel> {
        return Zadanie.create(item);
    }
    async update(id: string, item: UpdateQuery<ZadanieModel>): Promise<ZadanieModel> {
        return Zadanie.findByIdAndUpdate(id, item);
    }
    async delete(id: string): Promise<ZadanieModel> {
        return Zadanie.findByIdAndDelete(id);
    }
    async find(item: FilterQuery<ZadanieModel>): Promise<ZadanieModel[]> {
        return Zadanie.find(item);
    }
    async findOne(item: FilterQuery<ZadanieModel>): Promise<ZadanieModel> {
        return Zadanie.findOne(item);
    }
} 

export default new ExerciseRepo();