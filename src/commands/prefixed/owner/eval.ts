import { Command } from "../../../interfaces"
import { Embed, Markup } from "detritus-client/lib/utils";
import { inspect } from "util"

export const command: Command = {
    name: "eval",
    description: "Evaluate Code",
    aliases: [],
    adminOnly: true,
    run: async (client, payload, args) => {
        const toEval = inspect(eval(args.join(" ")), { depth: 0 });

        if (toEval.length > 1024) {
            const embed = new Embed()
                .setTitle("Code Evaled")
                .setColor(0xf4d7fc)
                .addField("Input", Markup.codeblock(args.join(" "), { language: "ts" }))
                .addField("Output", Markup.codeblock("- Output Code Exceeded 2048 Characters. It'll Not Be Show", { language: "diff" }))
                .addField("TypeOf", Markup.codeblock(typeof eval(args.join(" ")), { language: "ts" }));

            return client.replyMessage(payload, { embed: embed });
        }

        const embed = new Embed()
            .setTitle("Code Evaled")
            .setColor(0xf4d7fc)
            .addField("Input", Markup.codeblock(args.join(" "), { language: "ts" }))
            .addField("Output", Markup.codeblock(toEval, { language: "ts" }))
            .addField("TypeOf", Markup.codeblock(typeof eval(args.join(" ")), { language: "ts" }));

        return client.replyMessage(payload, { embed: embed });
    }
}