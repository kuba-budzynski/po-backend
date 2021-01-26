import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';
import server from "../../server";

const testMongo = new MongoMemoryServer()

export const before = async () => {
    const uri = await testMongo.getUri()
    mongoose.set("useNewUrlParser", true);
    mongoose.set("useFindAndModify", false);
    mongoose.set("useCreateIndex", true);
    mongoose.set("useUnifiedTopology", true);
    mongoose.set("returnOriginal", false);
    await mongoose.connect(uri)
}

export const beforeEach = async (t) => {
    t.context.app = server
}

export const after = async () => {
    await mongoose.disconnect()
    await testMongo.stop()
}
