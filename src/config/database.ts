import mongoose from "mongoose";
import Logger from './logger'
import settings from './settings';
const logger = new Logger('mongoDB');

export const connectToDatabase = async () => {
    const uri = `mongodb+srv://${settings.db.username}:${settings.db.password}@${settings.db.hostname}/${settings.db.defaultDB}?authSource=admin&replicaSet=atlas-r994lj-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true`
    mongoose.set("useNewUrlParser", true);
    mongoose.set("useFindAndModify", false);
    mongoose.set("useCreateIndex", true);
    mongoose.set("useUnifiedTopology", true);

    await mongoose.connect(uri, (err) => {
        if (!err) logger.info(`MongoDB connection established to MongoDB Atlas: ${settings.db.hostname}:${settings.db.port}`);
        else logger.error(`connection to MongoDB Atlas: ${settings.db.hostname}:${settings.db.port} failed: ` + err);
    });
}
