import IClientEvent from '../../models/IClientEvent';
import CommandRegister from '../../utility/CommandRegister'
import Logger from '../../utility/Logger';

const event: IClientEvent = {
    Config: {
        Name: "ready"
    },

    Run: async (client) => {
        Logger.Info('Connected...');

        // Register Slash Commands.
        CommandRegister.RegisterSlashCommands('./interactions/slash_commands', client);

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