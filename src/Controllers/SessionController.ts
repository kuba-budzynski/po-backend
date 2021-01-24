import { Controller, Get, Post, Request, Route,} from "tsoa";
import SessionService from "../Services/SessionService";
import express from 'express';

@Route("session")
export class SessionController extends Controller {
    @Get()
    public async getSessionList() {
        return SessionService.getGrouped()
    }

    @Post()
    public async createSession(
        @Request() request: express.Request
    ): Promise<any>{
        return SessionService.createSession(request.body)
    }
}
