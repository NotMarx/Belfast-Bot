import { Command } from "../../../interfaces";
import { Embed } from "detritus-client/lib/utils/embed";

export const command: Command = {
    name: "stats",
    aliases: ["status"],
    run: async (client, payload) => {
        const embed = new Embed()
            .setTitle(`${client.user.username}'s Stats`)
            .setColor(0x7289DA)
            .addField("Shard ID", `${payload.message.guild.shardId}/${client.shardCount - 1}`)

        return client.replyMessage(payload, { embed: embed });
    }
}