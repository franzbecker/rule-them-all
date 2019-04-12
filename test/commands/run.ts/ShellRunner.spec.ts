import { createTmpDir, removeTmpDir } from "../../utils"
import shell from "shelljs"

const CWD = process.cwd()

describe("test", () => {
    let tmpDir: string

    beforeEach(() => {
        tmpDir = createTmpDir()
        shell.cd(tmpDir)
    })

    afterEach(() => {
        removeTmpDir(tmpDir)
        process.chdir(CWD)
    })

    it("should do something", () => {
        expect(shell.pwd().toString()).toEqual("bla")
    })
})
