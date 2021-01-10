import Id from "../Models/utils/CommonUtils";

const jwt = require("jsonwebtoken");

import { Request } from "express"
import settings from "../settings";
export interface AuthRequest extends Request {
    user: {
        email: String,
        role: String,
        sessionId?: Id,
    }
}

function authenticate(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader?.split(' ')[1]
    if (token == null) return res.status(401).json({ message: 'Nieupoważniony dostęp' })

    jwt.verify(token, settings.authSecret, (err: any, user: any) => {
        if (err) return res.status(403).json({ message: 'Nieupoważniony dostęp' })
        req.user = user
        next()
    })
}

export default authenticate
