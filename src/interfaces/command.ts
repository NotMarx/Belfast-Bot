import BelfastClient from "../client";
import { GatewayClientEvents } from "detritus-client";

interface CommandRun {
    (client: BelfastClient, payload: GatewayClientEvents.MessageCreate, args?: Array<String>): Promise<any>;
}

export interface Command {
    name: string;
    description?: string;
    category?: string;
    aliases: string[];
    nsfwOnly?: boolean;
    guildOnly?: boolean;
    adminOnly?: boolean;
    modOnly?: boolean;
    permissions: string[];
    permissionClient: string[];
    run: CommandRun
}