import test from 'ava'
import {after, before} from "./helpers";
import Repository from "../Repositories/Repository";
import {SchoolType, TeamStatus} from "../Models/Team";
import {UserRole} from "../Models/helpers/User";
import RankingService from '../Services/RankingService';
import { BadRequestError } from '../config/handleError';

let session
let team1
let team2
let team3
let team4

test.before(async () => {
    await before()
    
    session = await Repository.SessionRepo.create<any>({
        name: "Session",
        start: new Date('2020-01-01'),
        end: new Date('2020-01-02')
    })

    team1 = await Repository.TeamRepo.create<any>({
        name: "Team1",
        schoolName: "School name1",
        schoolType: SchoolType.UNIVERSITY,
        members: [{
            name: "Name",
            surname: "Surname 1",
            isCaptain: true,
        }, {
            name: "Name",
            surname: "Surname 2",
            isCaptain: false,
        }],
        session: session._id,
        status: TeamStatus.QUALIFIED,
        loginData: {
            email: "email@email.com",
            password: "12345",
            role: UserRole.TEAM,
        },
        score:{
            correct: 2,
            time: 1.55
        }
    })

    team2 = await Repository.TeamRepo.create<any>({
        name: "Team2",
        schoolName: "School name2",
        schoolType: SchoolType.UNIVERSITY,
        members: [{
            name: "Name",
            surname: "Surname 1",
            isCaptain: true,
        }, {
            name: "Name",
            surname: "Surname 2",
            isCaptain: false,
        }],
        session: session._id,
        status: TeamStatus.DISQUALIFIED,
        loginData: {
            email: "email@email.com",
            password: "12345",
            role: UserRole.TEAM,
        },
        score: {
            correct: 0,
            time: 0
        }
    })

    team3 = await Repository.TeamRepo.create<any>({
        name: "Team3",
        schoolName: "School name3",
        schoolType: SchoolType.UNIVERSITY,
        members: [{
            name: "Name",
            surname: "Surname 1",
            isCaptain: true,
        }, {
            name: "Name",
            surname: "Surname 2",
            isCaptain: false,
        }],
        session: session._id,
        status: TeamStatus.QUALIFIED,
        loginData: {
            email: "email@email.com",
            password: "12345",
            role: UserRole.TEAM,
        },
        score: {
            correct: 2,
            time: 2.12
        }
    })

    team4 = await Repository.TeamRepo.create<any>({
        name: "Team3",
        schoolName: "School name3",
        schoolType: SchoolType.UNIVERSITY,
        members: [{
            name: "Name",
            surname: "Surname 1",
            isCaptain: true,
        }, {
            name: "Name",
            surname: "Surname 2",
            isCaptain: false,
        }],
        session: session._id,
        status: TeamStatus.QUALIFIED,
        loginData: {
            email: "email@email.com",
            password: "12345",
            role: UserRole.TEAM,
        },
        score: {
            correct: 3,
            time: 5.11
        }
    })

    await Repository.SessionRepo.updateOne({_id: session._id},
        {teams: [team1._id, team2._id, team3._id, team4._id]})
})

test.serial('Are disqualified teams not in ranking', async (t) => {
    
    const ranking = await RankingService.getCurrentRanking(session._id)
    t.is(ranking.length, 3)
})

test.serial('Is ranking sorted in correct way', async (t) => {
    const ranking = await RankingService.getCurrentRanking(session._id)
    t.is(ranking[0].id.toString(), team4._id.toString())
    t.is(ranking[1].id.toString(), team1._id.toString())
    t.is(ranking[2].id.toString(), team3._id.toString())
})

test.serial('Return exception for invalid format of session id', async (t) => {
    const error = await t.throwsAsync(RankingService.getCurrentRanking(""), { instanceOf: BadRequestError })
    t.is(error.message, "Nie znaleziono sesji o podanym id.")
})

test.serial('Return exception for unknown session id', async (t) => {
    const error = await t.throwsAsync(RankingService.getCurrentRanking("5ffd6b8a7f533c119cbc3b7e"), { instanceOf: BadRequestError })
    t.is(error.message, "Nie znaleziono sesji o podanym id.")
})

test.after.always(after)
