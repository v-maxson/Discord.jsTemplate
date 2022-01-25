import IClientEvent from '../../models/IClientEvent';
import CommandRegister from '../../utility/CommandRegister'
import Logger from '../../utility/Logger';

const event: IClientEvent = {
    Config: {
        Name: "ready"
    },

    Run: async (client) => {
        Logger.Info('Connected...');

        // @ts-ignore - Set Client user activity.
        client.DiscordClient!.user?.setPresence({ activities: [ { name: client.UserConfig.Presence.Name, type: client.UserConfig.Presence.Type,  } ], afk: false, status: 'dnd' });

        await CommandRegister.RegisterSlashCommands('./interactions/slash_commands', client);
    }
}

export default event;