import {SolutionStatus} from "../../Models/Solution";
import fs from "fs";
const fsPromises = fs.promises;
import {spawn} from "child_process";
import {Test} from "../../Models/Exercise";
var path = require('path');

type ReturnType = { status: SolutionStatus, message?: string }
type SolutionVerify = (code: Buffer, tests: Test[], solutionId: string) => Promise<ReturnType>
const FILE_PATH = (fileName: string) => path.resolve(path.dirname(require.main.filename), "_temp", fileName)

export const PythonVerify:SolutionVerify = async (code, tests, solutionId) => {
    const path = FILE_PATH(`${solutionId}.py`)
    await fsPromises.writeFile(path, code)
    const format = (status: SolutionStatus, message?: string) => ({ status, ...(message && { message }) })
    const promises =
        tests.map((test: Test) => new Promise((resolve, reject) => {
            const { input, output } = test
            const process = spawn("python", [path])
            process.stdin.setDefaultEncoding("utf-8")
            let inputs = input.match(/[^\r\n]+/g)

            const out: string[] = []
            process.stdout.on("data", (data: string) => {
                if (!inputs.length) {
                    process.stdin.end()
                    out.push(data.toString().replace(/(\r\n|\n|\r)*$/, ""))
                } else {
                    const [current, ...rest] = inputs
                    process.stdin.write(`${current}\n`)
                    inputs = rest
                }
            })
            process.stderr.on("data", (error) => reject(format(SolutionStatus.ERROR_EXECUTION, error)))
            process.on("close", (code) => {
                if (code === 0) {
                    const receivedOutput = out.join("\n")
                    if (output !== receivedOutput)
                        return reject(format(SolutionStatus.ERROR_PRESENTATION, `Oczekiwane wyjście: ${output}. Otrzymane wyjście: ${receivedOutput}`))
                    return resolve(format(SolutionStatus.CORRECT))
                }
                return reject(format(SolutionStatus.ERROR_TIME, code.toString()))
            })
        }))

    Promise.allSettled(promises).finally(() => fsPromises.unlink(path))
    try {
        await Promise.all(promises)
        return { status: SolutionStatus.CORRECT }
    } catch (e) {
        return e
    }
}
