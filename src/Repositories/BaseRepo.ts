// definition for all Repositories

import {Document, FilterQuery, Model, Query, UpdateQuery} from 'mongoose';

export interface Write<T extends Document> {
    create(item: T): Promise<T>;
    update(id: string, item: UpdateQuery<T>): Query<T, T>;
    delete(id: string): Query<T, T>;
}

export interface Read<T extends Document> {
    find(item: FilterQuery<T>): Query<T[], T>;
    findOne(item: FilterQuery<T>): Query<T, T>;
}

export class BaseRepository<T extends Document> implements Write<T>, Read<T> {
    model: Model<T>
    constructor(model: Model<T>) {
        this.model = model
    }

    create(item: T): Promise<T> {
        return this.model.create(item)
    }

    update(id: string, item: UpdateQuery<T>): Query<T, T> {
        return this.model.findByIdAndUpdate(id, item)
    }

    delete(id: string): Query<T, T> {
        return this.model.findByIdAndDelete(id)
    }

    find(item: FilterQuery<T>): Query<T[], T> {
        return this.model.find(item)
    }

    findOne(item: FilterQuery<T>): Query<T, T> {
        return this.model.findOne(item)
    }

}
