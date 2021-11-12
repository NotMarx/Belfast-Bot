import { GatewayClientEvents, ShardClient, ShardClientRunOptions } from "detritus-client";
import { Database, launchLavalinkNode } from "./api";
import { Command, Event, InteractionCommand } from "./interfaces";
import * as Config from "../config.json";
import { Manager } from "erela.js";
import { MessageReplyOptions } from "detritus-client/lib/structures";
import { join } from "path";
import { readdirSync } from "fs";
import { Database as XenDatabase } from "xen.db";

export default class BelfastClient extends ShardClient {
    public config = Config;
    public database = new XenDatabase("src/api/database/Belfast-Database.sql", { path: "src/api/database", table: "JSON", useWalMode: false });
    public db = new Database();
    public events = new Map<string, Event>();
    public interactionCommands = new Map<string, InteractionCommand>();
    public manager: Manager;
    public prefixedCommands = new Map<string, Command>();

    /**
     * Initialize the bot to the Gateway 
     * @param options Client Run Options
     * @returns {Promise<void}
     */
     public async launch(options?: ShardClientRunOptions): Promise<void> {
        this.run(options);

        const prefiedCommandPath: string = join(__dirname, "commands", "prefixed");
        
        readdirSync(prefiedCommandPath).forEach((dir) => {
            const commands: string[] = readdirSync(`${prefiedCommandPath}/${dir}`).filter((file) => file.endsWith(".ts"));

            for (const file of commands) {
                const { command } = require(`${prefiedCommandPath}/${dir}/${file}`);
                this.prefixedCommands.set(command.name as string, command);
            }
        });

        const interactionCommandPath: string = join(__dirname, "commands", "interactions");

        readdirSync(interactionCommandPath).forEach((dir) => {
            const commands: string[] = readdirSync(`${interactionCommandPath}/${dir}`).filter((file) => file.endsWith(".ts"));
        
            for (const file of commands) {
                const { command } = require(`${interactionCommandPath}/${dir}/${file}`);
                this.interactionCommands.set(command.name as string, command);
            }
        });

        const eventPath: string = join(__dirname, "events");

        readdirSync(eventPath).forEach(async (file) => {
            const { event } = await import(`${eventPath}/${file}`);
            this.events.set(event.name, event);
            this.on(event.name, event.run.bind(null, this));
        });
    }

    public launchDB(): Promise<void> {
        return this.db.launch();
    }

    public launchLavalink(): Promise<void> {
        return launchLavalinkNode(this);
    }

    public replyMessage(payload: GatewayClientEvents.MessageCreate, options: MessageReplyOptions) {
        return payload.message.reply({ reference: true, allowedMentions: { repliedUser: false }, ...options });
    }
}