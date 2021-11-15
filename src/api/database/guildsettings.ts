import BelfastClient from "../../client";
import { Database } from "xen.db";

const Endpoint = {
    GuildPrefix: (guildId: string) => `Database.${guildId}.Prefix`
}

export default class GuildSettings {
    database: Database;

    constructor(client: BelfastClient) {
        this.database = client.database;
    }

    saveGuildPrefix(guildId: string, newPrefix: string): void {
        return this.database.set(Endpoint.GuildPrefix(guildId), newPrefix);
    }
}