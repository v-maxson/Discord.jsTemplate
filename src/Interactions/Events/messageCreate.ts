import IClientEvent from '../../Models/IClientEvent';
import CommandRegister from '../../Utility/CommandRegister';
import * as Discord from 'discord.js-light';

const event: IClientEvent = {
    Config: {
        Name: "messageCreate"
    },

    Run: async (client: Discord.Client, message: Discord.Message) => {
        CommandRegister.HandleTextCommands(client, message);
    }
}

export default event;