import os from "os"
import shell from "shelljs"

export function createTmpDir(): string {
    const randomPathSegment = Math.random()
        .toString()
        .replace(/\./g, "")
    const tmpDir = `${os.tmpdir}/rta-test/${randomPathSegment}`
    shell.mkdir("-p", tmpDir)
    return tmpDir
}

export function removeTmpDir(dir: string) {
    shell.rm("-r", dir)
}
