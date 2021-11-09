import { Database as QuickMongoDatabase } from "quickmongo";
import { MONGODB_URI } from "../../../config.json";
import { Logger } from "../../utils";

export class Database {
    public db = new QuickMongoDatabase(MONGODB_URI, "Belfast");

    public async launch() {
        this.db.on("ready", () => {
            Logger.success("MONGODB", `MongoDB: ${this.db.name} Successfully Connected`);
        });
    }
}