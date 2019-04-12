import Vorpal = require("vorpal")
import { Args, CommandInstance } from "vorpal"

export function discover(vorpal: Vorpal, {  }: any) {
    vorpal
        .command("run [command]", "Runs the command in all kingdoms.")
        .action(action)
        .autocomplete(["git status"])
}

async function action(this: CommandInstance, args: Args) {
    this.log("Run: " + args.command)
}
