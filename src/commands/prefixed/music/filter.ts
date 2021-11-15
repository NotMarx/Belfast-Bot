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
    }
}