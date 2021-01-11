import express from "express";
import cors from "cors";
import helmet from "helmet";
import Logger from './logger'
import bodyParser from "body-parser";
import './Config/database';
import settings from './settings';
import configRoutes from "./Config/routes";
import configSwagger from "./Config/swagger";

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

app.listen(settings.port, () => {
    console.log(`Listening on port ${settings.port}`);
})
