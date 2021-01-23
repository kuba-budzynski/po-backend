import {Express, NextFunction, Request, Response} from "express";

export abstract class RequestError extends Error {
    code: number
    type: string
    protected constructor(message?: string) {
        super(message || "")
    }
}

const RequestErrorFactory = (code: number, type: string) =>
    class _ extends RequestError {
        constructor(message?: string) {
            super(message)
            super.code = code
            super.type = type
        }
    }

export const BadRequestError = RequestErrorFactory(400, "Bad Request")
export const NotFoundError = RequestErrorFactory(404, "Not Found")


const configHandleErrors = (app: Express) => {
    app.use(() => {
        throw new NotFoundError()
    })

    app.use((err, req: Request, res: Response, next: NextFunction) => {
        if (!(err instanceof RequestError) && err instanceof Error)
            return res.status(500).json({
                message: "Internal Server Error"
            })
        if (err instanceof RequestError) {
            return res.status(err.code).json({
                message: `${err?.message ? `${err.message} ` : ''}[${err.type}]`
            })
        }

        next()
    })
}

export default configHandleErrors

