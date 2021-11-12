import { ClientEvents } from "detritus-client/lib/constants";
import { Event } from "../interfaces";
import { GatewayClientEvents } from "detritus-client";
import { Logger } from "../utils";

export const event: Event = {
    name: ClientEvents.GUILD_CREATE,
    run: async (client, payload: GatewayClientEvents.GuildCreate) => {
        if (payload.fromUnavailable) {
            Logger.system("GUILD", `${payload.guild.name} (${payload.guild.id}) Has Connected And Now Available`);

            // Register slash commands
            for (const command of client.prefixedCommands.values()) {
                client.rest.createApplicationGuildCommand(client.applicationId, payload.guild.id, {
                    name: command.name,
                    description: command.description,
                    ...command
                });
            }
        } else {
            Logger.system("GUILD", `Joined Guild: ${payload.guild.name} (${payload.guild.id}) With ${payload.guild.memberCount} Members`);

            // Register slash commands
            for (const command of client.prefixedCommands.values()) {
                client.rest.createApplicationGuildCommand(client.applicationId, payload.guild.id, {
                    name: command.name,
                    description: command.description,
                    ...command
                });
            }
        }
    }
}