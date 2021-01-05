import * as express from 'express'
import createSession from '../Controllers/Sesja/CreateSessionController';
import deleteSession from '../Controllers/Sesja/DeleteSessionController';
import getSession from '../Controllers/Sesja/GetSessionController';
import updateSession from '../Controllers/Sesja/UpdateSessionController';

import { Router } from 'express'
const userRouter: Router = Router();

userRouter.get('/id/:id',
    (req, res) => getSession.execute(req, res)
);

userRouter.post('/',
    (req, res) => createSession.execute(req, res)
);

userRouter.delete('/id/:id',
    (req, res) => deleteSession.execute(req, res)
);

userRouter.put('/:operation/id/:id/',
    (req, res) => updateSession.execute(req, res)
);

export default userRouter;