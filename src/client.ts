import { ActivityTypes, PresenceStatuses } from "detritus-client/lib/constants";
import { GatewayIntents } from "detritus-client-socket/lib/constants";
import BelfastClient from "./bot";
import { TOKEN } from "../config.json";

const client = new BelfastClient(TOKEN, {
    gateway: {
        compress: false,
        intents: [GatewayIntents.GUILDS, GatewayIntents.GUILD_MESSAGES, GatewayIntents.GUILD_MEMBERS],
        shardCount: 1,
        autoReconnect: true,
        presence: {
            activity: {
                name: "Me Being Rewrite",
                type: ActivityTypes.WATCHING
            },
            status: PresenceStatuses.IDLE
        }
    },
    cache: {
        messages: {
            limit: 100,
            enabled: true,
            expire: 60 * 60 * 1000
        }
    }
});

client.launch();
client.launchDB();