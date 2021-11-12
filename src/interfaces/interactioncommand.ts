import BelfastClient from "../client";
import { GatewayClientEvents } from "detritus-client";

interface InteractionCommandRun {
    (client: BelfastClient, payload: GatewayClientEvents.InteractionCreate): Promise<any>;
}

export interface InteractionCommand {
    name: string;
    description?: string;
    category?: string;
    nsfwOnly?: boolean;
    guildOnly?: boolean;
    adminOnly?: boolean;
    modOnly?: boolean;
    permissions?: string[];
    permissionClient?: string[];
    run: InteractionCommandRun
}