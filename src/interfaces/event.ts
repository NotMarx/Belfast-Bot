import BelfastClient from "../client";
import { ClientEvents } from "detritus-client/lib/constants";

interface EventRun {
    (client: BelfastClient, ...args: any): Promise<any>;
}

export interface Event {
    name: ClientEvents;
    run: EventRun;
}