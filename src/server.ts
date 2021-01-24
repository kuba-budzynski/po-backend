import express from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import './config/database';
import configRoutes from "./config/routes";
import configSwagger from "./config/swagger";
import configHandleErrors from "./config/handleError";

const server = express();

server.use(helmet());
server.use(cors());
server.use(bodyParser.json());

server.get("/", (req, res) => {
    res.send("OK");
});

configSwagger(server);
configRoutes(server);

configHandleErrors(server);

export default server
