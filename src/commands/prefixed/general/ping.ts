import { Command } from "../../../interfaces";

export const command: Command = {
    name: "ping",
    aliases: ["pong", "test"],
    run: async (client, payload) => {
        return client.replyMessage(payload, { content: `Gateway: ${(await client.ping()).gateway}ms | REST: ${(await client.ping()).rest}ms` })
    }
}