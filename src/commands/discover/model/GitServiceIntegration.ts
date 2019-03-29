export interface GitServiceIntegration {
    getName(): string
    canConquer(url: string): boolean
    listRepositories(url: string): Promise<GitRepositoryMetaData[]>
}

export interface GitRepositoryMetaData {
    name: string
    sshUrl: string
}
