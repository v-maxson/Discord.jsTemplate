import ITextCommand from '../../Models/ITextCommand';
import * as Discord from 'discord.js-light';
import Client from '../../index';


const command: ITextCommand = {
    Config: {
        Name: "help",
        Description: "Replies with a list of commands.",
        Aliases: [
            'commands',
            'cmds'
        ],
        Admin: false
    },

    Run: async (client: Discord.Client, message: Discord.Message, args: string[]) => {

        // Loop through each command and interpolate it into a string.
        let embedDescription = "";
        Client.Collections.TextCommands.forEach(command => {
            if (command.Config.Admin) return;
            embedDescription += `\`${command.Config.Name}\`: ${command.Config.Description}\n`
        });

        const helpEmbed = new Discord.MessageEmbed()
            .setAuthor({ name: client.user!.username, iconURL: client.user!.displayAvatarURL() })
            .setColor('NOT_QUITE_BLACK')
            .setTitle('Command List:')
            .setDescription(embedDescription)
            .setTimestamp();

        await message.reply({ embeds: [helpEmbed] });
    }
}

export default command;