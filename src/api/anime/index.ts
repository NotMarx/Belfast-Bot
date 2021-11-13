import axios from "axios";
import { Logger } from "../../utils";

export async function getAnime(query: string) {
    if (!query) {
        Logger.error("API ERROR", "No Query Found When Searching Anime");
    }

    const res = await axios.request({
        url: `https://kitsu.io/api/edge/anime?filter[text]=${query}`,
        method: "GET",
        headers: {
            "Content-Type": "application/vnd.api+json",
            "Accept": "application/vnd.api+json"
        }
    });

    return res;
}

export async function getManga(query: string) {
    if (!query) {
        Logger.error("API ERROR", "No Query Found When Searching Manga");
    }

    const res = await axios.request({
        url: `https://kitsu.io/api/edge/manga?filter[text]=${query}`,
        method: "GET",
        headers: {
            "Content-Type": "application/vnd.api+json",
            "Accept": "application/vnd.api+json"
        }
    });

    return res;
}