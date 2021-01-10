// definition for all Repositories

import {Document, FilterQuery, Model, UpdateQuery} from 'mongoose';

type Modelled<T> = T & Document

export class BaseRepository<T> {
    model: Model<Modelled<T>>
    constructor(model: Model<Modelled<T>>) {
        this.model = model
    }

    create(item: T) {
        return this.model.create(item)
    }

    update(id: string, item: UpdateQuery<Modelled<T>>) {
        return this.model.findByIdAndUpdate(id, item)
    }

    delete(id: string) {
        return this.model.findByIdAndDelete(id)
    }

    find(item?: FilterQuery<Modelled<T>>) {
        return this.model.find(item)
    }

    findOne(item: FilterQuery<Modelled<T>>) {
        return this.model.findOne(item)
    }

    get(id: string) {
        return this.model.findById(id)
    }

}
