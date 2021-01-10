import {BaseRepository} from './BaseRepo';
import Rozwiazanie, {RozwiazanieModel} from '../Models/RozwiazanieModel';

export class SolutionRepo extends BaseRepository<RozwiazanieModel> {
    constructor() {
        super(Rozwiazanie);
    }
}

export default new SolutionRepo();
