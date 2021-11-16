import { Command } from "../../../interfaces";
import LevelXP from "../../../api/rank";
import { Rank } from "canvacord";
import yargs from "yargs/yargs";

export const command: Command = {
    name: "rank",
    description: "Shows the user's rank",
    aliases: ["level"],
    run: async (client, payload, args) => {
        const member = payload.message.guild.members.find((m) => m.id === args[0]) || payload.message.guild.members.find((m) => m.username === args.slice(0).join(" ")) || payload.message.member;

        if (member.bot) {
            return client.replyMessage(payload, { content: "Bots have no levels!" });
        }

        const userXP: number = client.database.fetch(`Database.${payload.message.guildId}.LevelXP.${member.id}`);
        const levelBase = client.database.fetch(`Database.${payload.message.guildId}.LevelXP`);

        let { level, remxp, levelXP } = LevelXP.getInfo(userXP);

        if (userXP === 0) {
            level = 0,
            remxp = 0,
            levelXP = 0
        }

        if (!userXP) {
            return client.replyMessage(payload, { content: `**${member.tag}** is still unranked` });
        }

        let arrayXP = [];

        for (let item in levelBase) {
            arrayXP.push([item, userXP[item]]);
        }

        const ranked = Object.entries(levelBase).sort(([, a], [, b]) => (b as number) - (a as number)).map((item, i) => `${item[0]} ${i + 1}`);
        const getUserRank = (user: string) => ranked.filter((entry) => entry.includes(user))[0].split(user)[1];
    
        const data = new Rank()
            .setAvatar(member.avatarUrl)
            .setRank(parseInt(getUserRank(member.id)))
            .setCurrentXP(remxp || 0)
            .setLevel(level || 0)
            .setOverlay("#000000", 1)
            .setStatus("offline", false)
            .setLevelColor("#E9E2E6")
            .setRequiredXP(levelXP || 100)
            .setProgressBar("#E9E2E6", "COLOR")
            .setUsername(member.username)
            .setDiscriminator(member.discriminator);

        data.build({ fontX: "Manrope", fontY: "Manrope" }).then((buffer) => {
            return client.replyMessage(payload, { file: { filename: "rank.png", value: buffer }});
        });
    }
}