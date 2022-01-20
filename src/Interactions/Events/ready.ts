import IClientEvent from '../../models/IClientEvent';
import CommandRegister from '../../utility/CommandRegister'
import Logger from '../../utility/Logger';

const event: IClientEvent = {
    Config: {
        Name: "ready"
    },

    Run: async (client) => {
        Logger.Info('Connected...');

        // Set Client user activity.
        client.DiscordClient.user?.setPresence({
            activities: [
                {
                    name: "an algorithmic gorilla plot world dominance.",
                    type: 'LISTENING'
                }
            ],
            afk: false,
            status: 'dnd'
        });

        await CommandRegister.RegisterSlashCommands('./interactions/slash_commands', client);
    }
}

export default event;