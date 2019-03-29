import Vorpal from "vorpal"
import { Application } from "../../src/app/Application"

jest.mock("vorpal", () => {
    return jest.fn().mockImplementation(() => ({
        use: jest.fn(),
        show: jest.fn(),
        delimiter: jest.fn(),
    }))
})

describe("Application", () => {
    it("does not require any parameters", () => {
        // when
        const app = new Application()

        // then
        expect(app).toBeTruthy()
        expect(Vorpal).toHaveBeenCalled()
        expect(app.vorpal).toBeTruthy()
    })

    it("should set the delimiter and show the CLI", () => {
        // given
        const vorpal = new Vorpal() as jest.Mocked<Vorpal>
        const app = new Application(vorpal)

        // when
        app.run()

        // then
        expect(vorpal.delimiter).toHaveBeenCalledWith("rta$")
        expect(vorpal.show).toHaveBeenCalled()
    })
})
