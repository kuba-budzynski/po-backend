import {Router} from 'express'
import createSession from '../Controllers/Sesja/CreateSessionController';
import getSessionList from '../Controllers/Sesja/GetSessionListController';

const userRouter: Router = Router();

userRouter.get('/',
    (req, res) => getSessionList.execute(req, res)
);

userRouter.post('/',
    (req, res) => createSession.execute(req, res)
);

export default userRouter;
