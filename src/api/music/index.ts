import * as Config from "../../../config.json";
import { Embed } from "detritus-client/lib/utils";
import { ChannelGuildVoice, Message, User } from "detritus-client/lib/structures";
import { Manager } from "erela.js";
import { ErelaFilters } from "./filter";
import BelfastClient from "../../client";
import Spotify from "erela.js-spotify";
import { Logger } from "../../utils";

const clientId = Config.LAVALINK.CLIENT_ID;
const clientSecret = Config.LAVALINK.CLIENT_SECRET;
const host = Config.LAVALINK.HOST;
const password = Config.LAVALINK.PASSWORD;
const identifier = Config.LAVALINK.IDENTIFIER;

export async function launchLavalinkNode(client: BelfastClient) {
    let manager = new Manager({
        nodes: [
            {
                host: host,
                password: password,
                port: 80,
                retryDelay: 10000,
                identifier: identifier
            }
        ],
        plugins: [new Spotify({ clientID: clientId, clientSecret: clientSecret }), new ErelaFilters()],
        autoPlay: true,
        send: (id, payload) => {
            const guild = client.guilds.get(id);
            if (guild) {
                client.gateway.send(payload.op, payload.d);
            }
        }
    })

    .on("nodeConnect", (node) => {
        Logger.success("LAVALINK NODE", `${node.options.identifier} Has Connected On Host ${node.options.host}`);
    })

    .on("nodeError", (node, error) => {
        Logger.error("LAVALINK NODE", `An Error Occured: ${error.message}`);
    })

    .on("trackStart", (player, track) => {
        const guild = client.guilds.get(player.guild);
        const embed = new Embed()
            .setAuthor(`${guild.name} Player`, guild.iconUrl)
            .setTitle("Now Playing")
            .setDescription(`Title [${track.title}](${track.uri}) is now playing!`)
            .setThumbnail(track.displayThumbnail("maxresdefault"))
            .setFooter(`Requested By: ${(track.requester as User).tag}`)
            .setColor(0xE9E2E6)

        guild.channels.get(player.textChannel).createMessage({ embed: embed }).then((msg) => {
            player.set("messageCreate", msg);
        });
    })

    .on("socketClosed", (player, payload) => {
        if (payload.byRemote === true) {
            player.destroy();
        }
    })
    
    .on("trackEnd", (player) => {
        if ((player.get("messageCreate") as Message) && !(player.get("messageCreate") as Message).deleted) {
            (player.get("messageCreate") as Message).delete();
        }
    })
    
    .on("trackStuck", (player, track, payload) => {
        if ((player.get("messageCreate") as Message) && !(player.get("messageCreate") as Message).deleted) {
            (player.get("messageCreate") as Message).delete();
        }
        const embed = {
            description: "An Error Occur In The System!",
            color: 0xE9E2E6
        };
    
        client.guilds.get(player.guild).channels.get(player.textChannel).createMessage({ embeds: [embed] });
    })
    
    .on("trackError", (player, track, payload) => {
        if (!(player.get("messageCreate") as Message)) {
            return;
        }
        if ((player.get("messageCreate") as Message) && !(player.get("messageCreate") as Message).deleted) {
            (player.get("messageCreate") as Message).delete();
        }
        const embed = {
            description: "An Error Occur In The System!",
            color: 0xE9E2E6
        };
    
        client.guilds.get(player.guild).channels.get(player.textChannel).createMessage({ embeds: [embed] });
    })
    
    .on("playerMove", (player, initChannel, newChannel) => {
        player.voiceChannel = client.guilds.get(player.guild).channels.get(newChannel).id;
    })
    
    .on("queueEnd", (player) => {
        const guildPremium: boolean = client.database.fetch(`Database.${player.guild}.Premium`);
        const embed = {
            description: "The Queue Has Ended!",
            color: 0xE9E2E6
        };

        // Auto disconnect if guild is non-premium
        if (!guildPremium) {
            (client.channels.get(player.voiceChannel) as ChannelGuildVoice).leave();
        }
    
        client.guilds.get(player.guild).channels.get(player.textChannel).createMessage({ embeds: [embed] });
    });

    client.on("raw", (packet) => {
        manager.updateVoiceState(packet);
    });

    client.manager = manager;
}