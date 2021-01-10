import {BaseRepository} from './BaseRepo';
import SedziaZadania, {ISedziaZadania} from "../Models/SedziaZadaniaModel";

export class ExerciseJudgeRepo extends BaseRepository<ISedziaZadania> {
    constructor() {
        super(SedziaZadania);
    }
}

export default new ExerciseJudgeRepo();
