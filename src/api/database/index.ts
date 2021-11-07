import { Database as QuickMongoDatabase } from "quickmongo";
import { MONGODB_URI } from "../../../config.json";

export class Database extends QuickMongoDatabase {
    public async launch() {
        this.on("ready", () => {
            console.log("[DATABASE] - MongoDB Successfully Connected");
        });
    }
}