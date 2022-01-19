import IClientEvent from '../../Models/IClientEvent';
import CommandRegister from '../../Utility/CommandRegister'
import Logger from '../../Utility/Logger';

const event: IClientEvent = {
    Config: {
        Name: "ready"
    },

    Run: async (client) => {
        Logger.Info('Connected...');

        // Register Slash Commands.
        CommandRegister.RegisterSlashCommands('./Interactions/SlashCommands', client);

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