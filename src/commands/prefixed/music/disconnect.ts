import { Command } from "../../../interfaces";
import { Embed } from "detritus-client/lib/utils";

export const command: Command = {
    name: "disconnect",
    description: "Disconnect the bot from a Voice Channel",
    aliases: [],
    run: async (client, payload) => {
        const channel = payload.message.member.voiceState;

        if (!channel) {
            const embed = new Embed()   
                .setDescription("You're not in a **Voice Channel**!")
                .setColor(0xE9E2E6)

            return client.replyMessage(payload, { embed: embed });
        }

        const embed = new Embed()
            .setDescription("I've successfully disconnected from the Voice Channel!")
            .setColor(0xE9E2E6)

        client.replyMessage(payload, { embed: embed });
        client.manager.players.get(payload.message.guildId).disconnect();
    }
}