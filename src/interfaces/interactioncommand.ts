import BelfastClient from "../client";
import { GatewayClientEvents } from "detritus-client";
import { RequestTypes } from "detritus-client-rest/lib";

interface InteractionCommandRun {
    (client: BelfastClient, payload: GatewayClientEvents.InteractionCreate): Promise<any>;
}

export interface InteractionCommand extends RequestTypes.CreateApplicationCommand {
    category?: string;
    nsfwOnly?: boolean;
    guildOnly?: boolean;
    adminOnly?: boolean;
    modOnly?: boolean;
    permissions?: string[];
    permissionClient?: string[];
    run: InteractionCommandRun
}