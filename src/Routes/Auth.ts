import { Router } from 'express'
import LoginUserController from "../Controllers/Auth/LoginUserController";

const authRouter: Router = Router();

authRouter.post('/login', (req, res) => LoginUserController.execute(req, res));

export default authRouter;
