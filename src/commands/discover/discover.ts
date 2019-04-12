import Vorpal = require("vorpal")
import { Args, CommandInstance } from "vorpal"
import { GitHub } from "./GitHub"
import { GitServiceIntegration } from "./model/GitServiceIntegration"

const integrations: GitServiceIntegration[] = [new GitHub()]

export function discover(vorpal: Vorpal, {  }: any) {
    vorpal
        .command("discover [url]", "Discovers new kingdoms")
        .action(action)
        .autocomplete(["https://github.com/octocat"])
}

async function action(this: CommandInstance, args: Args) {
    this.log("It's time to discover new kingdoms! 🗺")
    let url = args.url as string
    if (url === undefined) {
        url = await promptForUrl(this)
    }
    if (url) {
        const service = integrations.find(_ => _.canConquer(url))
        if (service) {
            this.log(`Using the ${service.getName()} integration.`)
            const cloneUrls = await service.listRepositories(url)
            this.log("Found: " + cloneUrls.map(_ => _.sshUrl))
        }
    } else {
        this.log("Well, maybe later. 🦄")
    }
}

async function promptForUrl(instance: CommandInstance): Promise<string> {
    return instance
        .prompt({
            message: "Where shall we look?",
            name: "url",
            type: "input",
        })
        .then(result => {
            return (result as { url: string }).url
        })
}
