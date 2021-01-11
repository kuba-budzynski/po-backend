import { RegisterRoutes } from "../_generated/routes";
import {Express} from "express";

const configRoutes = (app: Express) => RegisterRoutes(app);

export default configRoutes;

