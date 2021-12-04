import { ApplicationCommandOptionTypes, InteractionCallbackTypes, MessageFlags } from "detritus-client/lib/constants";
import { InteractionCommand } from "../../../interfaces";
import { InteractionDataApplicationCommand } from "detritus-client/lib/structures";
import LevelXP from "../../../api/rank";
import { Rank } from "canvacord";

export const command: InteractionCommand = {
    name: "rank",
    options: [
        {
            name: "user",
            description: "The user",
            type: ApplicationCommandOptionTypes.USER,
        }
    ],
    description: "Shows the user rank",
    run: async (client, payload) => {
        const member = (payload.interaction.data as InteractionDataApplicationCommand).options ? payload.interaction.guild.members.find((m) => m.id === (payload.interaction.data as InteractionDataApplicationCommand).options.get("user").value) : payload.interaction.member;

        if (member.bot) {
            return payload.interaction.respond(InteractionCallbackTypes.CHANNEL_MESSAGE_WITH_SOURCE, {
                content: "Bots have no levels!",
                flags: MessageFlags.EPHEMERAL
            });
        }

        const userXP: number = client.database.fetch(`Database.${payload.interaction.guildId}.LevelXP.${member.id}`);
        const levelBase = client.database.fetch(`Database.${payload.interaction.guildId}.LevelXP`);

        let { level, remxp, levelXP } = LevelXP.getInfo(userXP);

        if (userXP === 0) {
            level = 0,
            remxp = 0,
            levelXP = 0
        }

        if (!userXP) {
            return payload.interaction.respond(InteractionCallbackTypes.CHANNEL_MESSAGE_WITH_SOURCE, {
                content: `**${member.tag}** is unranked!`,
                flags: MessageFlags.EPHEMERAL
            });
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
            .setStatus(member.presence ? member.presence.status as "online" | "dnd" | "idle" | "streaming" : "offline", false)
            .setLevelColor("#E9E2E6")
            .setRequiredXP(levelXP || 100)
            .setProgressBar("#E9E2E6", "COLOR")
            .setUsername(member.username)
            .setDiscriminator(member.discriminator);

        data.build({ fontX: "Manrope", fontY: "Manrope" }).then((buffer) => {
            return payload.interaction.respond(InteractionCallbackTypes.CHANNEL_MESSAGE_WITH_SOURCE, {
                file: { filename: "rank.png", value: buffer },
            });
        });

    }
}