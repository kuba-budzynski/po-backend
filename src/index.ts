import express from "express";
import cors from "cors";
import helmet from "helmet";
import Logger from './logger'
import bodyParser from "body-parser";
import './DB/database';
import settings from './settings';
import userRouter from './Routes/Session';
import authRouter from "./Routes/Auth";
import exerciseRouter from "./Routes/Exercise";
import authenticate from "./middlewares/authenticate";

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
app.use('/auth', authRouter);
app.use('/exercise', authenticate, exerciseRouter)

// --------------------------------------------------------------------------------------------

app.listen(settings.port, () => {
    console.log(`Listening on port ${settings.port}`);
})
