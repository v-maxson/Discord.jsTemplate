// @ts-ignore
import * as Discord from 'discord.js-light';
import { SlashCommandBuilder } from '@discordjs/builders';
import ISlashCommand from '../../models/ISlashCommand';

const command: ISlashCommand = {
    Config: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Replies with a list of text-based commands.')
    ,

    Run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: true });

        const helpDescription = client.Collections.TextCommands.filter(c => !c.Config.Admin).map(c => `\`${c.Config.Name}\`: ${c.Config.Description}`).join('\n');

        const helpEmbed = new Discord.MessageEmbed()
            .setAuthor({ name: 'Text Commands:', iconURL: client.DiscordClient!.user!.displayAvatarURL() })
            .setDescription(helpDescription.length < 1 ? 'None.' : helpDescription);
        
        interaction.editReply({ content: null, embeds: [helpEmbed] });
    }
}

export default command;