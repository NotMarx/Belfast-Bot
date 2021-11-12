import { InteractionCallbackTypes, MessageFlags } from "detritus-client/lib/constants";
import { InteractionCommand } from "../../../interfaces";

export const command: InteractionCommand = {
    name: "ping",
    description: "Ping the Bot",
    run: async (client, payload) => {
        payload.interaction.respond(InteractionCallbackTypes.CHANNEL_MESSAGE_WITH_SOURCE, {
            content: `Gateway: ${(await client.ping()).gateway}ms | REST: ${(await client.ping()).rest}ms`,
            flags: MessageFlags.EPHEMERAL
        });
    }
}