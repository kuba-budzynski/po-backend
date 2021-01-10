import {BaseRepository} from './BaseRepo';
import Zadanie, {IZadanie} from '../Models/ZadanieModel'

export class ExerciseRepo extends BaseRepository<IZadanie> {
    constructor() {
        super(Zadanie);
    }
}

export default new ExerciseRepo();
