import BelfastClient from "../../client";
import { Message } from "detritus-client/lib/structures"; 

export default class LevelXP {
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

    static getLevelXP(level: number): number {
        return 5 * Math.pow(level, 2) + 50 * level + 100;
    }

    static getInfo(exp: number) {
        let [level, remxp]: any = this.getLevel(exp, true);
        let levelXP = this.getLevelXP(level);

        return { level, remxp, levelXP };
    }

    static addExp(client: BelfastClient, message: Message) {
        let toAdd = Math.floor(Math.random() * 5 + 5);
        let oldXP: number = client.database.get(`Database.${message.guildId}.LevelXP.${message.author.id}`);
        let oldLevel = this.getLevel(oldXP);
        let newXP = oldXP + toAdd;
        let newLevel = this.getLevel(newXP);

        client.database.add(`Database.${message.guildId}.LevelXP.${message.author.id}`, toAdd);

        if (newLevel > oldLevel) {
            message.channel.createMessage({ content: `${message.author.mention}, You just reached Level **${newLevel}**!` });
        }
    }
}