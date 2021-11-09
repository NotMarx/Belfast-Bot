import { GatewayClientEvents, ShardClient, ShardClientRunOptions } from "detritus-client";
import { Database } from "./api";
import { Command, Event } from "./interfaces";
import * as Config from "../config.json";
import { MessageReplyOptions } from "detritus-client/lib/structures";
import { join } from "path";
import { readdirSync } from "fs";
import { Database as XenDatabase } from "xen.db";

export default class BelfastClient extends ShardClient {
    public commands = new Map<string, Command>();
    public config = Config;
    public database = new XenDatabase("src/api/database/Belfast-Database.sql", { path: "src/api/database", table: "JSON", useWalMode: false });
    public db = new Database();
    public events = new Map<string, Event>();

    /**
     * Initialize the bot to the Gateway 
     * @param options Client Run Options
     * @returns {Promise<void}
     */
     public async launch(options?: ShardClientRunOptions): Promise<void> {
        this.run(options);

        const commandPath: string = join(__dirname, "commands", "prefixed");
        
        readdirSync(commandPath).forEach((dir) => {
            const commands: string[] = readdirSync(`${commandPath}/${dir}`).filter((file) => file.endsWith(".ts"));

            for (const file of commands) {
                const { command } = require(`${commandPath}/${dir}/${file}`);
                this.commands.set(command.name, command);
            }
        });

        const eventPath: string = join(__dirname, "events");

        readdirSync(eventPath).forEach(async (file) => {
            const { event } = await import(`${eventPath}/${file}`);
            this.events.set(event.name, event);
            this.on(event.name, event.run.bind(null, this));
        });
    }

    public launchDB(): void {
        this.db.launch();
    }

    public replyMessage(payload: GatewayClientEvents.MessageCreate, options: MessageReplyOptions) {
        return payload.message.reply({ reference: true, allowedMentions: { repliedUser: false }, ...options });
    }
}