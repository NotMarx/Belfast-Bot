import { ClientEvents } from "detritus-client/lib/constants";
import { Event } from "../interfaces";
import { GatewayClientEvents } from "detritus-client";
import { InteractionDataApplicationCommand } from "detritus-client/lib/structures";
import { Logger } from "../utils";

export const event: Event = {
    name: ClientEvents.INTERACTION_CREATE,
    run: async (client, payload: GatewayClientEvents.InteractionCreate) => {
        const interaction = payload.interaction;

        // Ignore bots and outside guilds
        if (interaction.member.bot || !interaction.guild) return;
        
        const command = client.interactionCommands.get((interaction.data as InteractionDataApplicationCommand).name);

        if (!command) return;

        if (command) {
            Logger.command("COMMAND", `${interaction.member.tag} (${interaction.member.id}) Runs "${command.name}" In Guild: ${interaction.guild.name} (${interaction.guildId})`);
            command.run(client, payload);
        }
    }
}