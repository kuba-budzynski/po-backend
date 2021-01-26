import multer from "multer";
import {Express, Request} from "express";

const FILE_SIZE_LIMIT = 2097152

class RequestFile {
    private readonly multer
    constructor(name: string) {
        this.multer = multer({limits: {fileSize: FILE_SIZE_LIMIT}}).single(name)
    }
    attachFile(request: Request) {
        return new Promise<Express.Multer.File>((resolve) => {
            this.multer(request, undefined, (error) => {
                if (error) resolve(null)
                resolve(request.file)
            })
        })
    }
}

export default RequestFile
