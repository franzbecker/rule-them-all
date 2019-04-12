import { GitHub } from "../../../src/commands/discover/GitHub"
import nock from "nock"

describe(GitHub.name, () => {
    const github = new GitHub()

    describe("getName()", () => {
        it("should return the name", () => {
            expect(github.getName()).toEqual("GitHub")
        })
    })

    describe("canConquer()", () => {
        const cases: Array<{ url: string; expected: boolean }> = [
            { url: "", expected: false },
            { url: "http://example.com/", expected: false },
            { url: "https://github.com/octocat", expected: true },
            { url: "https://www.github.com/octocat", expected: true },
            { url: "https://github.com/octocat/Hello-World", expected: true },
            { url: "https://www.github.com/amazing-octocat", expected: true },
            { url: "https://github.com/amazing-octocat/Hello-World", expected: true },
        ]
        cases.forEach(testCase => {
            it(`'${testCase.url}' should yield '${testCase.expected}'`, () => {
                expect(github.canConquer(testCase.url)).toEqual(testCase.expected)
            })
        })
    })

    describe("getOwner()", () => {
        const cases: Array<{ url: string; expected: string }> = [
            { url: "github.com/octocat", expected: "octocat" },
            { url: "https://www.github.com/octocat", expected: "octocat" },
            { url: "https://github.com/octocat/Hello-World", expected: "octocat" },
            { url: "https://www.github.com/amazing-octocat", expected: "amazing-octocat" },
            { url: "https://github.com/amazing-octocat/Hello-World", expected: "amazing-octocat" },
        ]
        cases.forEach(testCase => {
            it(`'${testCase.url}' should yield '${testCase.expected}'`, () => {
                expect(github.getOwner(testCase.url)).toEqual(testCase.expected)
            })
        })
    })

    describe("listRepositories()", () => {
        it("should query with the proper owner", async () => {
            // given
            nock("https://api.github.com/")
                .get(uri => uri.includes("orgs/github/repos"))
                .reply(200, [{ name: "repo 1", ssh_url: "repo1" }, { name: "repo 2", ssh_url: "repo2" }])

            // when
            const result = await github.listRepositories("https://github.com/github")

            // then
            expect(result).toEqual([{ name: "repo 1", sshUrl: "repo1" }, { name: "repo 2", sshUrl: "repo2" }])
        })

        it("should handle pagination", async () => {
            // given
            const paginationResponseHeader = {
                Link: '<https://api.github.com/organizations/9919/repos?page=2>; rel="next"',
            }
            nock("https://api.github.com/")
                .get(uri => uri.includes("orgs/github/repos"))
                .reply(200, [{ name: "repo 1", ssh_url: "repo1" }, { name: "repo 2", ssh_url: "repo2" }], paginationResponseHeader)
                .get(uri => uri.includes("organizations/9919/repos"))
                .query({ page: 2 })
                .reply(200, [{ name: "repo 1", ssh_url: "repo3" }])
            // when
            const result = await github.listRepositories("https://github.com/github")

            // then
            const sshUrls = result.map(_ => _.sshUrl)
            expect(sshUrls).toEqual(["repo1", "repo2", "repo3"])
        })
    })
})
