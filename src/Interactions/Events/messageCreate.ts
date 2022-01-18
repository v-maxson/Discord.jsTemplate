import IClientEvent from '../../Models/IClientEvent';
import Client from '../../index'
import * as Discord from 'discord.js-light';
import Logger from '../../Utility/Logger';

const event: IClientEvent = {
    Config: {
        Name: "messageCreate"
    },

    Run: async (client: Discord.Client, message: Discord.Message) => {
        if (message.author.bot) return;
        if (message.channel.type == 'DM') return;
        if (!message.content.startsWith(Client.UserConfig.General.TextCommandPrefix)) return;

        const messageArr = message.content.split(' ');
        const commandName = messageArr[0].slice(Client.UserConfig.General.TextCommandPrefix.length);
        const args = messageArr.slice(1);

        // @ts-ignore
        const command = Client.Commands.get(commandName) || Client.Commands.get(Client.Aliases.get(commandName));
        if (command) {
            if (command.Config.Admin && !Client.UserConfig.General.Admins.includes(message.author.id)) return;

            const timer = process.hrtime();
            await command.Run(client, message, args);
            const elapsed = process.hrtime(timer)[1] / 1000000;

            Logger.Info(`${message.author.tag} (${message.author.id}) executed ${commandName} command... Execution Took: ${process.hrtime(timer)[0]}s ${elapsed.toFixed(3)}ms`);
        }
    }
}

export default event;