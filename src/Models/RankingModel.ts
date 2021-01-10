import {Document, model} from 'mongoose';
import Id from './utils/CommonUtils';
import RankingSchema from '../Schemas/RankingSchema'

export interface IRanking {
    czyZamrozony: boolean,
    druzyny: Id[]
}

export type RankingModel = IRanking & Document

const Ranking = model<RankingModel>('Ranking', RankingSchema, 'rankingi');
export default Ranking; 
