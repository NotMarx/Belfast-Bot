import { Database as QuickMongoDatabase } from "quickmongo";
import { MONGODB_URI } from "../../../config.json";

export class Database {
    public db = new QuickMongoDatabase(MONGODB_URI);

    public async launch() {
        this.db.on("ready", () => {
            console.log("[DATABASE] - MongoDB Successfully Connected");
        });
    }
}