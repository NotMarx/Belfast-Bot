import { Event } from "../interfaces";
import { ClientEvents } from "detritus-client/lib/constants";
import { Logger } from "../utils";

export const event: Event = {
    name: ClientEvents.GATEWAY_READY,
    run: async (client) => {
        Logger.system("GATEWAY", `${client.user.tag} Successfully Has Gone ${client.gateway.presence.status.toUpperCase()}`);
        client.manager.init(client.userId);
    }
}