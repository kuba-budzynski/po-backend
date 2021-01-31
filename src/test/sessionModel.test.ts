import test from 'ava'
import {after, before} from "./helpers";
import Repository from "../Repositories/Repository";
import {SolutionStatus} from "../Models/Solution";
import {SchoolType, TeamStatus} from "../Models/Team";
import SolutionService from "../Services/SolutionService";
import {UserRole} from "../Models/helpers/User";
import SessionService from '../Services/SessionService';
import { BadRequestError } from '../config/handleError';

let session1
let session2
let session3

test.before(async () => {
    await before()

    session1 = await Repository.SessionRepo.create<any>({
        name: "Session1",
        start: new Date('2020-01-01'),
        end: new Date('2021-01-01'),
    })

    session2 = await Repository.SessionRepo.create<any>({
        name: "Session2",
        start: new Date('2021-01-01'),
        end: new Date('2021-01-03'),
    })

    session3 = await Repository.SessionRepo.create<any>({
        name: "Session3",
        start: new Date('2018-01-01'),
        end: new Date('2019-02-01'),
    })
})

test.serial('Check if list of sessions is being sorted', async (t) => {
    const sessions = await SessionService.getGrouped()
    const years = sessions.map(s => s.year)
    t.deepEqual(years, ["2021", "2020", "2018"])
})

test.serial('Is session being added', async (t) => {
    const newSession = await Repository.SessionRepo.create<any>({
        name: "Session4",
        start: new Date('2020-01-01'),
        end: new Date('2021-02-01'),
    })
    const isSession = await Repository.SessionRepo.exists({ _id: newSession.id })
    t.truthy(isSession)
})

test.serial('Return exception for invalid format of session id', async (t) => {
    const error = await t.throwsAsync(SessionService.getSession(""), { instanceOf: BadRequestError })
    t.is(error.message, "Nie znaleziono sesji o podanym id.")
})

test.serial('Return exception for unknown session id', async (t) => {
    const error = await t.throwsAsync(SessionService.getSession("5ffd6b8a7f533c119cbc3b7e"), { instanceOf: BadRequestError })
    t.is(error.message, "Nie znaleziono sesji o podanym id.")
})

test.after.always(after)
