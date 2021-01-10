import {BaseRepository} from './BaseRepo';
import SedziaZadania, {SedziaZadaniaModel} from "../Models/SedziaZadaniaModel";

export class ExerciseJudgeRepo extends BaseRepository<SedziaZadaniaModel> {
    constructor() {
        super(SedziaZadania);
    }
}

export default new ExerciseJudgeRepo();
