import {getModelForClass as getRepository} from "@typegoose/typegoose";
import Team from "../Models/Team";
import Session from "../Models/Session";
import Exercise from "../Models/Exercise";
import Solution from "../Models/Solution";
import PrimaryJudge from "../Models/PrimaryJudge";
import ExerciseJudge from "../Models/ExerciseJudge";
import Thread from "../Models/Thread";
import Admin from "../Models/Admin";

class RepositoryClass {
    AdminRepo =             getRepository(Admin);
    SessionRepo =           getRepository(Session);
    TeamRepo =              getRepository(Team);
    ExerciseRepo =          getRepository(Exercise);
    SolutionRepo =          getRepository(Solution);
    PrimaryJudgeRepo =      getRepository(PrimaryJudge);
    ExerciseJudgeRepo =     getRepository(ExerciseJudge);
    ThreadRepo =            getRepository(Thread);
}

const Repository = new RepositoryClass()
export default Repository
