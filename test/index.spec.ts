import { Application } from "../src/app/Application"

jest.mock("../src/app/Application")

describe("entry point", () => {
    it("runs the application", () => {
        // when
        const index = require("../src/index")

        // then
        expect(index).toBeTruthy()
        expect(Application).toHaveBeenCalled()
        expect(Application.prototype.run).toHaveBeenCalled()
    })
})
