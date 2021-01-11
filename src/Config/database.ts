import mongoose from "mongoose";
import Logger from '../logger'
import settings from './../settings';
const logger = new Logger('mongoDB');

class Connection{
    private URI: string;
    constructor(){
        this.URI = `mongodb://${settings.db.username}:${settings.db.password}@${settings.db.ip}:${settings.db.port}`
             + "/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false";
        mongoose.set("useNewUrlParser", true);
        mongoose.set("useFindAndModify", false);
        mongoose.set("useCreateIndex", true);
        mongoose.set("useUnifiedTopology", true);
        mongoose.connect(this.URI, (err) => {
            if (!err) logger.info(`MongoDB connection established to ${settings.db.ip}:${settings.db.port}`);
            else logger.error(`connection to ${settings.db.ip}:${settings.db.port} failed: ` + err);
        });
    }
}

export default new Connection();
