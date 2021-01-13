import {SolutionStatus} from "../../Models/Solution";
import fs from "fs";
import {spawn} from "child_process";
import {Test} from "../../Models/Exercise";
var path = require('path');

type SolutionVerify = (code: Buffer, tests: Test[], solutionId: string) => Promise<{ status: SolutionStatus, message?: string }>
const FILE_PATH = (fileName: string) => path.resolve(path.dirname(require.main.filename), "_temp", fileName)


export const PythonVerify = async (code, tests, solutionId) =>
    new Promise(async (_resolve) => {
        const path = FILE_PATH(`${solutionId}.py`)
        try {
            const resolve = (status: SolutionStatus, message?: any) => {
                console.log("///////////", status, message)
                _resolve({ status, ...(message && { message }) })
            }

            fs.writeFile(path, code, () => {
                for (const test of tests) {
                    const { input, output } = test
                    const process = spawn("python", [path])
                    process.stdin.setDefaultEncoding("utf-8")
                    for (const line of input.match(/[^\r\n]+/g))
                        process.stdin.write(`${line}\n`)
                    process.stdin.end()

                    const out: string[] = []
                    process.stdout.on("data", (data: string) => out.push(data))
                    process.stderr.on("data", (error) => resolve(SolutionStatus.ERROR_EXECUTION, error))
                    process.on("close", (code) => {
                        if (code === 0) {
                            console.log(out.map(b => b.toString()))
                            const receivedOutput = out.join("\n").trim()
                            const expectedOutput = output.trim()
                            if (expectedOutput !== receivedOutput)
                                return resolve(SolutionStatus.ERROR_PRESENTATION, { expectedOutput, receivedOutput })
                        }
                        return resolve(SolutionStatus.ERROR_EXECUTION, code)
                    })
                }
                return resolve(SolutionStatus.CORRECT)
            })
        } finally {
            fs.unlinkSync(path)
            // await cleanup()
            //
        }
    })
