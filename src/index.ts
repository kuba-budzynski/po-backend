import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import Logger from './logger'
import bodyParser from "body-parser";
import './DB/database';
import settings from './settings';
import Sesja from './Models/SesjaModel'
import mongoose from 'mongoose';
import userRouter from './Routes/Sesja';

const itemsRouter = express.Router();
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

app.use('/sesja', userRouter);

// --------------------------------------------------------------------------------------------

app.listen(settings.port, () => {
    console.log(`Listening on port ${settings.port}`);
})

