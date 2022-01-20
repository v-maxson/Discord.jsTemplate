import IClientEvent from '../../models/IClientEvent';
import * as Discord from 'discord.js-light';
import CommandRegister from '../../utility/CommandRegister';

const event: IClientEvent = {
    Config: {
        Name: "interactionCreate"
    },

    Run: async (client, interaction: Discord.Interaction) => {
        if (interaction.isCommand()) {
            CommandRegister.HandleSlashCommands(client, interaction);
        }
    }
}

export default event;