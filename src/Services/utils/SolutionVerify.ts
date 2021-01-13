import {SolutionStatus} from "../../Models/Solution";
import {file} from "tmp-promise";
import fs from "fs";
import {spawn} from "child_process";
import {Test} from "../../Models/Exercise";

type SolutionVerify = (code: Buffer, tests: Test[]) => Promise<{ status: SolutionStatus, message?: string }>


export const PythonVerify:SolutionVerify = async (code, tests) => {
    const { fd, path, cleanup } = await file({ postfix: ".js", dir: "_temp" })
    try {
        return new Promise((_resolve) => {
            const resolve = (status: SolutionStatus, message?: any) => {
                console.error(status, message)
                _resolve({ status, ...(message && { message }) })
            }

            fs.write(fd, code, () => {
                for (const test of tests) {
                    const { input, output } = test
                    const process = spawn("python", [path])
                    process.stdin.setDefaultEncoding("utf-8")
                    process.stdin.write(`${input}\n`)
                    process.stdin.end()

                    const out: string[] = []
                    process.stdout.on("data", (data: string) => out.push(data))
                    process.stderr.on("data", (error) => resolve(SolutionStatus.ERROR_EXECUTION, error))
                    process.on("close", (code) => {
                        if (code === 0) {
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
        })
    } finally {
        await cleanup()
    }
}
