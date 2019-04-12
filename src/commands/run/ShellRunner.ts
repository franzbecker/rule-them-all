import shell from "shelljs"

export class ShellRunner {
    public run() {
        shell.ls(".").forEach(file => {
            shell.echo(file)
        })
    }
}
