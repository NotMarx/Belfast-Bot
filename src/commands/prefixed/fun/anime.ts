import axios from "axios";
import { Embed } from "detritus-client/lib/utils";
import { Command } from "../../../interfaces";

export const command: Command = {
    name: "anime",
    description: "Search for an anime",
    aliases: [],
    run: async (client, payload, args) => {
        if (!args.length) {
            return client.replyMessage(payload, { content: "Please provide an anime!" });
        }

        axios.request({
            url: `https://kitsu.io/api/edge/anime?filter[text]=${args.join(" ")}`,
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