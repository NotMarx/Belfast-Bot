import { Command } from "../../../interfaces";
import { Embed } from "detritus-client/lib/utils";
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
        let embed = new Embed()
            .setColor(0xE9E2E6)

        switch (effectFlag.effect[0]) {
            case "nightcore":
                if (activeFlag.add) {
                    embed.setDescription("Nightcore Activated!");

                    client.replyMessage(payload, { embed: embed });
                    player.setNightcore(true);
                } else if (activeFlag.remove) {
                    embed.setDescription("Nightcore Deactivated!");

                    client.replyMessage(payload, { embed: embed });
                    player.setNightcore(false);
                }
                break;
            case "8d":
                if (activeFlag.add) {
                    embed.setDescription("8D Activated!");

                    client.replyMessage(payload, { embed: embed });
                    player.setEightD(true);
                } else if (activeFlag.remove) {
                    embed.setDescription("8D Deactivated!");

                    client.replyMessage(payload, { embed: embed });
                    player.setEightD(false);
                }
                break;
            case "daycore":
                if (activeFlag.add) {
                    embed.setDescription("Daycore Activated!");

                    client.replyMessage(payload, { embed: embed });
                    player.setDaycore(true);
                } else if (activeFlag.remove) {
                    embed.setDescription("Daycore Deactivated!");

                    client.replyMessage(payload, { embed: embed });
                    player.setDaycore(false);
                }
                break;
            case "distortion":
                if (activeFlag.add) {
                    embed.setDescription("Distortion Activated!");

                    client.replyMessage(payload, { embed: embed });
                    player.setDistortion(true);
                } else if (activeFlag.remove) {
                    embed.setDescription("Distortion Deactivated!");

                    client.replyMessage(payload, { embed: embed });
                    player.setDistortion(false);
                }
                break;
            default:
                embed.setDescription("No filter effect found!");

                client.replyMessage(payload, { embed: embed });
                break;
        }
    }
}