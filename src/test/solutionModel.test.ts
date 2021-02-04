import test from 'ava'
import {after, before} from "./helpers";
import Repository from "../Repositories/Repository";
import {SolutionStatus} from "../Models/Solution";
import {SchoolType, TeamStatus} from "../Models/Team";
import SolutionService from "../Services/SolutionService";
import {UserRole} from "../Models/helpers/User";

let exercise
let session
let team
let solution

test.before(async () => {
    await before()
    exercise = await Repository.ExerciseRepo.create<any>({
        name: "Exercise",
        content: "Exercise content.",
        number: 1,
    })
    session = await Repository.SessionRepo.create<any>({
        name: "Session",
        start: new Date('2020-01-01'),
        end: new Date('2030-01-01'),
        exercises: [exercise._id],
    })
    team = await Repository.TeamRepo.create<any>({
        name: "Team",
        schoolName: "School name",
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
        }
    })
})

test.serial('Is solution being added to collection and team', async (t) => {
    solution = await SolutionService.createSolution({
        author: team._id,
        exercise: exercise._id,
        sent: new Date(),
        status: SolutionStatus.PENDING,
        solutionFile: {
            name: 'file.py',
            size: 0,
            code: Buffer.from(' ')
        }
    })

    const isSolutionFound = await Repository.SolutionRepo.exists({ _id: solution.id })
    const foundTeam = await Repository.TeamRepo.findById(team.id)

    t.is(isSolutionFound, true)
    t.is(foundTeam.solutions.some((s) => s.toString() === solution.id), true)
})

test.serial('If solution does not belong to undefined exercise', async (t) => {
    t.is(solution.belongsToExercise(), false)
})

test.serial('If solution does not belong to incorrect exercise', async (t) => {
    t.is(solution.belongsToExercise('adfdsaggasdf'), false)
})

test.serial('If solution belongs to correct exercise', async (t) => {
    t.is(solution.belongsToExercise(exercise.id), true)
})

test.serial('If Solution isStatus checks correctly', async (t) => {
    solution = await Repository.SolutionRepo.findByIdAndUpdate(solution._id, {status: SolutionStatus.PENDING})
    t.is(solution.isStatus(SolutionStatus.PENDING), true)

    solution = await Repository.SolutionRepo.findByIdAndUpdate(solution._id, {status: SolutionStatus.ERROR_EXECUTION})
    t.is(solution.isStatus(SolutionStatus.ERROR_EXECUTION), true)

    solution = await Repository.SolutionRepo.findByIdAndUpdate(solution._id, {status: SolutionStatus.CORRECT})
    t.is(solution.isStatus(SolutionStatus.CORRECT), true)
})

test.serial('If Solution false on empty param', async (t) => {
    t.is(solution.isStatus(), false)
})

test.serial('If pending solution is blocking', async (t) => {
    solution = await Repository.SolutionRepo.findByIdAndUpdate(solution._id, {status: SolutionStatus.PENDING})
    t.is(solution.isBlocking(), true)
})

test.serial('If correct solution is blocking', async (t) => {
    solution = await Repository.SolutionRepo.findByIdAndUpdate(solution._id, {status: SolutionStatus.CORRECT})
    t.is(solution.isBlocking(), true)
})

test.serial('If error solution is not blocking', async (t) => {
    solution = await Repository.SolutionRepo.findByIdAndUpdate(solution._id, {status: SolutionStatus.ERROR_EXECUTION})
    t.is(solution.isBlocking(), false)

    solution = await Repository.SolutionRepo.findByIdAndUpdate(solution._id, {status: SolutionStatus.ERROR_COMPILATION})
    t.is(solution.isBlocking(), false)

    solution = await Repository.SolutionRepo.findByIdAndUpdate(solution._id, {status: SolutionStatus.ERROR_PRESENTATION})
    t.is(solution.isBlocking(), false)
})

test.serial('If error solution is error', async (t) => {
    solution = await Repository.SolutionRepo.findByIdAndUpdate(solution._id, {status: SolutionStatus.ERROR_EXECUTION})
    t.is(solution.isError(), true)

    solution = await Repository.SolutionRepo.findByIdAndUpdate(solution._id, {status: SolutionStatus.ERROR_COMPILATION})
    t.is(solution.isError(), true)

    solution = await Repository.SolutionRepo.findByIdAndUpdate(solution._id, {status: SolutionStatus.ERROR_PRESENTATION})
    t.is(solution.isError(), true)
})

test.after.always(after)
