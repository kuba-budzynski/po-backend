import { Document, Schema, model } from 'mongoose';
import Id from './utils/CommonUtils';
import RankingSchema from '../Schemas/RankingSchema'

export interface IRanking {
    czyZamrozony: Boolean,
    druzyny: Id[]
}

export interface RankingModel extends IRanking, Document { }

const Ranking = model<RankingModel>('Ranking', RankingSchema, 'rankingi');
export default Ranking; 