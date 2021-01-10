const jwt = require("jsonwebtoken");

import { Request } from "express"
export interface AuthRequest extends Request {
    user: {
        email: String,
        role: String,
        sessionId?: String,
    }
}

function authenticate(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader?.split(' ')[1]
    if (token == null) return res.status(401).json({ message: 'Nieupoważniony dostęp' })

    jwt.verify(token, process.env.AUTH_SECRET, (err: any, user: any) => {
        if (err) return res.status(403).json({ message: 'Nieupoważniony dostęp' })
        req.user = user
        next()
    })
}

export default authenticate
