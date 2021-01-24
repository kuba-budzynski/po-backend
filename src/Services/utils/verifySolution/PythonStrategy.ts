import {VerifyStrategy} from "./SolutionVerify";
import {ChildProcessWithoutNullStreams, spawn} from "child_process";

export class PythonStrategy implements VerifyStrategy {
    extension = "py";

    async getProcess(path: string): Promise<ChildProcessWithoutNullStreams> {
        return spawn("python", [path]);
    }

}
