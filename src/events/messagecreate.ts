import { ClientEvents } from "detritus-client/lib/constants";
import { Command, Event } from "../interfaces";
import { GatewayClientEvents } from "detritus-client";
import { Logger } from "../utils";
import * as ClientConfig from "../../config.json";

export const event: Event = {
    name: ClientEvents.MESSAGE_CREATE,
    run: async (client, payload: GatewayClientEvents.MessageCreate) => {
        const message = payload.message;

        if (message.author.bot || !message.guild || !message.content.startsWith(ClientConfig.PREFIX)) return;

        let messageArray: string[] = message.content.split(" ");
        let args: string[] = messageArray.slice(1);
        let commandName: string = messageArray[0].slice(ClientConfig.PREFIX.length);
        const command: Command = client.commands.get(commandName);

        if (!command) return;

        if (command.nsfwOnly && !message.channel.nsfw) {
            return client.replyMessage(payload, { content: "You can only run this command on **NSFW** channels!" });
        }

        if (command.adminOnly && !ClientConfig.ADMIN_ID.includes(message.author.id)) {
            return client.replyMessage(payload, { content: "You're forbidden to use this command!" });
        }

        if (command) {
            Logger.command("COMMAND", `${message.author.tag} (${message.author.id}) Runs "${command.name}" In Guild: ${message.guild.name} (${message.guildId})`);
            command.run(client, payload, args);
        }

    }
}