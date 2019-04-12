import Vorpal from "vorpal"

import { discover } from "../commands/discover/discover"
import { run } from "../commands/run/run"

export class Application {
    constructor(public readonly vorpal: Vorpal = new Vorpal()) {}

    public run() {
        this.vorpal.use(discover)
        this.vorpal.use(run)
        this.vorpal.delimiter("rta$")
        this.vorpal.show()
    }
}
