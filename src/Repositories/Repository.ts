import {Document, FilterQuery, UpdateQuery} from 'mongoose';

export interface Write<T extends Document> {
    create(item: T): Promise<T>;
    update(id: string, item: UpdateQuery<T>): Promise<T>;
    delete(id: string): Promise<T>;
}

export interface Read<T extends Document> {
    find(item: FilterQuery<T>): Promise<T[]>;
    findOne(item: FilterQuery<T>): Promise<T>;
}

export interface BaseRepository<T extends Document> extends Write<T>, Read<T> { }