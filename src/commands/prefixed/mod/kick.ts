import { Command } from "../../../interfaces";

export const command: Command = {
    name: "kick",
    description: "Kick a member from a server",
    aliases: [],
    modOnly: true,
    run: async (client, payload, args) => {
        const member = payload.message.guild.members.find((m) => m.id === args[0]) || payload.message.guild.members.find((m) => m.username === args.slice(0).join(" "));

        if (!member) {
            return client.replyMessage(payload, { content: "No member found!" });
        }

        member.remove();
    }
}