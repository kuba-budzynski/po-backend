import {Request} from "express"
import settings from "../settings";
import {mongoose} from "@typegoose/typegoose";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
    user: {
        email: string,
        role: string,
        sessionId?: mongoose.Types.ObjectId,
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
