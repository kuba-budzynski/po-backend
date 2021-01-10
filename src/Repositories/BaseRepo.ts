// definition for all Repositories

import {Document, FilterQuery, Model, Query, UpdateQuery} from 'mongoose';

type Modeled<T> = T & Document

export interface Write<T> {
    create(item: T): Promise<Modeled<T>>;
    update(id: string, item: UpdateQuery<Modeled<T>>): Query<Modeled<T>, Modeled<T>>;
    delete(id: string): Query<Modeled<T>, Modeled<T>>;
}

export interface Read<T extends Document> {
    find(item: FilterQuery<T>): Query<T[], T>;
    findOne(item: FilterQuery<T>): Query<T, T>;
}

export class BaseRepository<T> implements Write<T>, Read<Modeled<T>> {
    model: Model<Modeled<T>>
    constructor(model: Model<Modeled<T>>) {
        this.model = model
    }

    create(item: T): Promise<Modeled<T>> {
        return this.model.create(item)
    }

    // @ts-ignore
    // TODO: find out if false positive
    update(id: string, item: UpdateQuery<Modeled<T>>): Query<Modeled<T>, Modeled<T>> {
        return this.model.findByIdAndUpdate(id, item)
    }

    delete(id: string): Query<Modeled<T>, Modeled<T>> {
        return this.model.findByIdAndDelete(id)
    }

    find(item: FilterQuery<Modeled<T>>): Query<Modeled<T>[], Modeled<T>> {
        return this.model.find(item)
    }

    findOne(item: FilterQuery<Modeled<T>>): Query<Modeled<T>, Modeled<T>> {
        return this.model.findOne(item)
    }

}
