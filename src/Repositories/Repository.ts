import {getModelForClass as getRepository} from "@typegoose/typegoose";
import Team from "../Models/Team";
import Session from "../Models/Session";
import Exercise from "../Models/Exercise";
import Solution from "../Models/Solution";

class RepositoryClass {
    SessionRepo =           getRepository(Session);
    TeamRepo =              getRepository(Team);
    ExerciseRepo =          getRepository(Exercise);
    SolutionRepo =          getRepository(Solution);
}

const Repository = new RepositoryClass()
export default Repository
