import BelfastClient from "../../client";
import { Message } from "detritus-client/lib/structures"; 
export default class LevelXP {

    /**
     * Get a level
     * @param xp The XP
     * @param extra Whether to enable extra mode
     * @returns {Number | Array<Number>}
     */
    static getLevel(xp: number, extra = false): number | number[] {
        let level = 0;

        while (xp >= this.getLevelXP(level)) {
            xp -= this.getLevelXP(level);
            level++
        }

        if (extra) {
            return [level, xp];
        } else {
            return level;
        }
    }

    /**
     * Get a level XP
     * @param level The level
     * @returns {Number}
     */
    static getLevelXP(level: number): number {
        return 5 * Math.pow(level, 2) + 50 * level + 100;
    }

    /**
     * Get the rank info from the EXP given
     * @param exp The EXP
     * @returns {Object}
     */
    static getInfo(exp: number) {
        let [level, remxp]: any = this.getLevel(exp, true);
        let levelXP = this.getLevelXP(level);

        return { level, remxp, levelXP };
    }

    /**
     * Add an EXP to the user
     * @param client Belfast client
     * @param message The message payload
     * @returns {void}
     */
    static addExp(client: BelfastClient, message: Message): void {
        let toAdd = Math.floor(Math.random() * 5 + 5);
        let oldXP: number = client.database.get(`Database.${message.guildId}.LevelXP.${message.author.id}`);
        let oldLevel = this.getLevel(oldXP);
        let newXP = oldXP + toAdd;
        let newLevel = this.getLevel(newXP);

        client.database.add(`Database.${message.guildId}.LevelXP.${message.author.id}`, toAdd);

        // Sends a congrats message whenever user ranks up
        if (newLevel > oldLevel) {
            message.channel.createMessage({ content: `${message.author.mention}, You just reached Level **${newLevel}**!` });
        }
    }
}