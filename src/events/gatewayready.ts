import { Event } from "../interfaces";
import { ClientEvents } from "detritus-client/lib/constants";

export const event: Event = {
    name: ClientEvents.GATEWAY_READY,
    run: async (client) => {
        console.log(`${client.user.tag} Has Gone ${client.gateway.presence.status.toUpperCase()}`);
    }
}