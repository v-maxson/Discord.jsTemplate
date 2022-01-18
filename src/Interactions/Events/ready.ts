import IClientEvent from '../../Models/IClientEvent';
import * as Discord from 'discord.js-light';
import Logger from '../../Utility/Logger';

const event: IClientEvent = {
    Config: {
        Name: "ready"
    },

    Run: async (client: Discord.Client) => {
        Logger.Info('Connected...');

        // Set Client user activity.
        client.user?.setPresence({
            activities: [
                {
                    name: "an algorithmic gorilla plot world dominance.",
                    type: 'LISTENING'
                }
            ],
            afk: false,
            status: 'dnd'
        });
    }
}

export default event;