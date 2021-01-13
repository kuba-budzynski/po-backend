import express from "express";
import cors from "cors";
import helmet from "helmet";
import Logger from './config/logger'
import bodyParser from "body-parser";
import './config/database';
import settings from './config/settings';
import configRoutes from "./config/routes";
import configSwagger from "./config/swagger";
import * as https from "https";
import {SSL_OPTIONS} from "./config/ssl";

const logger = new Logger("routing");
const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

// --------------------------------------------------------------------------------------------

app.get("/", (req, res) => {
    res.send("OK");
    logger.info(`${req.method} ${req.path}`);
});

configSwagger(app);
configRoutes(app);

// --------------------------------------------------------------------------------------------

https.createServer(SSL_OPTIONS, app).listen(settings.port, () => {
    console.log(`Listening on port ${settings.port}`);
})
