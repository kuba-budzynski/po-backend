// definition for all Repositories

import {Document, FilterQuery, Model, UpdateQuery} from 'mongoose';

export interface Write<T extends Document> {
    create(item: T): Promise<T>;
    update(id: string, item: UpdateQuery<T>): Promise<T>;
    delete(id: string): Promise<T>;
}

export interface Read<T extends Document> {
    find(item: FilterQuery<T>): Promise<T[]>;
    findOne(item: FilterQuery<T>): Promise<T>;
}

export class BaseRepository<T extends Document> implements Write<T>, Read<T> {
    model: Model<T>
    constructor(model: Model<T>) {
        this.model = model
    }

    create(item: T): Promise<T> {
        return this.model.create(item)
    }

    update(id: string, item: UpdateQuery<T>): Promise<T> {
        return this.model.findByIdAndUpdate(id, item)
    }

    delete(id: string): Promise<T> {
        return this.model.findByIdAndDelete(id)
    }

    find(item: FilterQuery<T>): Promise<T[]> {
        return this.model.find(item)
    }

    findOne(item: FilterQuery<T>): Promise<T> {
        return this.model.findOne(item)
    }

}
