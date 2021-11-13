import axios from "axios";
import { Command } from "../../../interfaces";
import { Embed } from "detritus-client/lib/utils";

export const command: Command = {
    name: "manga",
    description: "Search for a Manga",
    aliases: [],
    run: async (client, payload, args) => {
        if (!args.length) {
            return client.replyMessage(payload, { content: "Please provide a manga!" });
        }

        axios.request({
            url: `https://kitsu.io/api/edge/manga?filter[text]=${args.join(" ")}`,
            method: "GET",
            headers: {
                "Content-Type": "application/vnd.api+json",
                "Accept": "application/vnd.api+json"
            }
        }).then((res) => {
            const data = res.data.data[0];

            const embed = new Embed()
                .setTitle(`${data.attributes.titles.en_jp} (${data.attributes.titles.ja_jp})`)
                .setThumbnail(data.attributes.posterImage.large)
                .setUrl(data.links.self)

            return client.replyMessage(payload, { embed: embed });
        });
    }
}