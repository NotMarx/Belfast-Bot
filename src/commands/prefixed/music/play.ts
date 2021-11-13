import { Embed } from "detritus-client/lib/utils";
import { Command } from "../../../interfaces";
import { Logger } from "../../../utils";

export const command: Command = {
    name: "play",
    description: "Play a Music",
    aliases: ["play-music"],
    run: async (client, payload, args) => {
        const songQuery = args.join(" ");
        const channel = payload.message.member.voiceState;

        if (!channel) {
            const embed = new Embed()   
                .setDescription("You're not in a **Voice Channel**!")
                .setColor(0xE9E2E6)

            return client.replyMessage(payload, { embed: embed });
        } else {
            const play = client.manager.get(payload.message.guildId);

            if (!play) {
                const player = client.manager.create({
                    guild: payload.message.guildId,
                    voiceChannel: channel.channelId,
                    textChannel: payload.message.channelId,
                    selfDeafen: true,
                    volume: 69
                });
                player.connect();
            }

            const player = client.manager.get(payload.message.guildId);
            let res;

            try {
                res = await client.manager.search(songQuery, payload.message.author);
                if (res.loadType === "LOAD_FAILED") {
                    if (!player.queue.current) player.destroy();
                    Logger.error("PLAYER", `An Error Occur: ${res.exception.message}`);
                }
            } catch (err) {
                return payload.message.channel.createMessage({ content: "No Results Found!" });
            }

            switch (res.loadType) {
                case "NO_MATCHES": 
                    if (!player.queue.current) player.destroy();
                    return payload.message.channel.createMessage({ content: "No Results Found!" });
                case "TRACK_LOADED":
                    await player.queue.add(res.tracks[0]);
                    if (!player.playing && !player.paused && !player.queue.length) player.play();
                    let embed = {
                        description: `Queued: **[${res.tracks[0].title}](${res.tracks[0].uri})**`,
                        color: 0xE9E2E6
                    };
                    if (player.queue.length >= 1) payload.message.channel.createMessage({ embeds: [embed] });
                    return;
                case "PLAYLIST_LOADED":
                    await player.queue.add(res.tracks);
                    if (!player.playing && !player.paused && player.queue.size + 1 === res.tracks.length) player.play();
                    let embed1 = {
                        description: `Queued: **[${res.playlist.name}](${res.tracks[0].uri})** \`[${res.tracks.length} Musics]\``,
                        color: 0xE9E2E6
                    };
                    if (player.queue.length >= res.tracks.length) payload.message.channel.createMessage({ embeds: [embed1] });
                    return;
                case "SEARCH_RESULT":
                    await player.queue.add(res.tracks[0]);
                    if (!player.playing && !player.paused && !player.queue.length) player.play();
                    let embed2 = {
                        description: `Queued: **[${res.tracks[0].title}](${res.tracks[0].uri})**`,
                        color: 0xE9E2E6
                    };
                    if (player.queue.length >= 1) payload.message.channel.createMessage({ embeds: [embed2] });
                    return;
            }
        }
    }
}