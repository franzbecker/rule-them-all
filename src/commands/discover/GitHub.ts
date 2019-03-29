import Octokit, { ReposListForOrgResponse } from "@octokit/rest"
import { GitServiceIntegration, GitRepositoryMetaData } from "./model/GitServiceIntegration"

const regex = /(?:https?:\/\/)?(?:www\.)?github.com\/([a-zA-Z-]+)(?:\/.*)?/

export class GitHub implements GitServiceIntegration {
    public getName(): string {
        return "GitHub"
    }
    public canConquer(url: string): boolean {
        return regex.test(url)
    }

    public async listRepositories(url: string): Promise<GitRepositoryMetaData[]> {
        const octokit = new Octokit()
        const options = octokit.repos.listForOrg.endpoint.merge({
            org: this.getOwner(url),
            type: "all",
        })
        return octokit.paginate(options).then(paginationResponse => {
            const responses = paginationResponse as ReposListForOrgResponse
            return responses.map(data => {
                return {
                    name: data.name,
                    sshUrl: data.ssh_url,
                }
            })
        })
    }

    public getOwner(url: string): string {
        const match = regex.exec(url)
        if (match) {
            const [, owner] = match
            return owner
        }
        throw Error("failed")
    }
}
