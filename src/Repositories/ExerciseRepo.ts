import {BaseRepository} from './BaseRepo';
import Zadanie, {ZadanieModel} from '../Models/ZadanieModel'

export class ExerciseRepo extends BaseRepository<ZadanieModel> {
    constructor() {
        super(Zadanie);
    }
}

export default new ExerciseRepo();
