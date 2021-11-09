import { ShardClient, ShardClientRunOptions } from "detritus-client";
import { Database } from "./api";
import * as Config from "../config.json";
import { join } from "path";
import { readdirSync } from "fs";

export default class BelfastClient extends ShardClient {
    public config = Config;
    public database = new Database();

    public async launch(options?: ShardClientRunOptions): Promise<void> {
        this.run(options);
    }

    public launchDB(): void {
        this.database.launch();
    }
}