import {BaseRepository} from './BaseRepo';
import Rozwiazanie, {IRozwiazanie} from '../Models/RozwiazanieModel';

export class SolutionRepo extends BaseRepository<IRozwiazanie> {
    constructor() {
        super(Rozwiazanie);
    }
}

export default new SolutionRepo();
