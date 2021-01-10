import { BaseRepository } from './BaseRepo';
import Druzyna, { DruzynaModel } from '../Models/DruzynaModel';
import { UpdateQuery, _AllowStringsForIds, FilterQuery } from 'mongoose';

export class TeamRepo extends BaseRepository<DruzynaModel> {
    constructor() {
        super(Druzyna);
    }
}

export default new TeamRepo();
