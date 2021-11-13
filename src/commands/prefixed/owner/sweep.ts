import { Command } from "../../../interfaces";
import { Embed } from "detritus-client/lib/utils";

export const command: Command = {
    name: "sweep",
    description: "Sweep a messages at once",
    aliases: ["purgeall", "clean"],
    adminOnly: true,
    run: async (client, payload) => {
        const messageIds = (await payload.message.channel.fetchMessages({ limit: 100 })).filter((m) => !m.pinned).map((m) => m.id);
    
        payload.message.channel.bulkDelete(messageIds).then(() => {
            const embed = new Embed()
                .setDescription(`Swept **${messageIds.length}** messags!`)
                .setColor(0xE9E2E6)

            return payload.message.channel.createMessage({ embed: embed }).then((m) => {
                setTimeout(() => {
                    m.delete();
                }, 3000);
            });
        });
    }
}