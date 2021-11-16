import { Command } from "../../../interfaces";
import { Player } from "../../../api/music/filter";
import yargs from "yargs/yargs";

export const command: Command = {
    name: "filter",
    description: "Adds a filter effect to the music",
    aliases: [],
    run: async (client, payload, args) => {
        const effectFlag = await yargs(args.slice(0)).array(["effect"]).argv;
        const activeFlag = await yargs(args.slice(0)).boolean(["add", "remove"]).argv;
        const player = client.manager.players.get(payload.message.guildId) as Player;

        if (effectFlag.effect[0] === "nightcore") {
            if (activeFlag.add) {
                client.replyMessage(payload, { content: "Nightcore Activated!" });
                player.setNightcore(true);
            } else if (activeFlag.remove) {
                client.replyMessage(payload, { content: "Nightcore Deactivated!" });
                player.setNightcore(false);
            }
        }
    }
}