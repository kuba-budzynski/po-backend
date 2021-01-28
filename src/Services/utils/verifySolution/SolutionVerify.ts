import path from "path";
import fs from "fs";
import {Test} from "../../../Models/Exercise";
import {ChildProcessWithoutNullStreams} from "child_process";
import {SolutionStatus} from "../../../Models/Solution";
const fsPromises = fs.promises;

type ReturnType = { status: SolutionStatus, message?: string }

export interface VerifyStrategy {
    extension: string
    getProcess(path: string): Promise<ChildProcessWithoutNullStreams>
}

export class SolutionVerify {
    private filePath: string
    private verifyStrategy: VerifyStrategy
    constructor(verifyStrategy: VerifyStrategy) {
        this.verifyStrategy = verifyStrategy
    }

    async createFile(code: Buffer, fileName: string) {
        this.filePath = path.resolve(path.dirname(require.main.filename), "_temp", `${fileName}.${this.verifyStrategy.extension}`)
        await fsPromises.writeFile(this.filePath, code)
    }

    async deleteFile(path: string) {
        if (!path) return
        await fsPromises.unlink(path)
    }

    test(tests: Test[]): Promise<ReturnType> {
        const formatResponse = (status: SolutionStatus, message?: string) => ({ status, ...(message && { message }) })

        const runningTests = tests.map((test) => (
            new Promise(async (resolve, reject) => {
                const { input, output } = test
                let process: ChildProcessWithoutNullStreams
                try {
                    process = await this.verifyStrategy.getProcess(this.filePath)
                } catch (e) {
                    return reject(e)
                }

                const outputs: string[] = []

                process.stdin.setDefaultEncoding("utf-8")

                process.stderr.on("data", (error) => {
                    reject(formatResponse(SolutionStatus.ERROR_EXECUTION, error))
                })

                process.on("close", (code) => {
                    if (code !== 0)
                        return reject(formatResponse(SolutionStatus.ERROR_EXECUTION, code.toString()))

                    const receivedOutputs = outputs.join("\n")
                    if (output !== receivedOutputs)
                        return reject(
                            formatResponse(
                                SolutionStatus.ERROR_PRESENTATION,
                                `Oczekiwane wyjście: ${output}. Otrzymane wyjście: ${receivedOutputs}`
                            )
                        )
                    return resolve(formatResponse(SolutionStatus.CORRECT))
                })

                process.stdin.write(input)
                process.stdin.end()

                process.stdout.on("data", (data: string) => {
                    outputs.push(data.toString().replace(/(\r\n|\n|\r)*$/, ""))
                })

            })
        ))

        Promise.allSettled(runningTests).finally(() => this.deleteFile(this.filePath))
        return Promise.all(runningTests)
            .then<ReturnType>(() => ({ status: SolutionStatus.CORRECT }))
            .catch<ReturnType>((response: ReturnType) => response)
    }

}
