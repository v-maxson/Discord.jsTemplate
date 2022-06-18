import { SlashCommandBuilder } from '@discordjs/builders';
import * as Discord from 'discord.js-light';

import ISlashCommand from '../../models/ISlashCommand';

function convertMS(value: number): string {
    const date = new Date(value*1000);
    const days = date.getUTCDate() - 1,
    hours = date.getUTCHours(),
    minutes = date.getUTCMinutes(),
    seconds = date.getUTCSeconds(),
    milliseconds = date.getUTCMilliseconds();

    let segments = [];

    if (days > 0) segments.push(days + ' day' + ((days == 1) ? '' : 's'));
    if (hours > 0) segments.push(hours + ' hour' + ((hours == 1) ? '' : 's'));
    if (minutes > 0) segments.push(minutes + ' minute' + ((minutes == 1) ? '' : 's'));
    if (seconds > 0) segments.push(seconds + ' second' + ((seconds == 1) ? '' : 's'));
    if (milliseconds > 0) segments.push(milliseconds + ' millisecond' + ((milliseconds == 1) ? '' : 's'));
    return segments.join(', ');
}

const command: ISlashCommand = {
    Config: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Replies with information including client latency and uptime metrics.')
    ,

    Run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: true });

        const infoEmbed: Discord.MessageEmbed = new Discord.MessageEmbed()
            .setAuthor({name: client.DiscordClient!.user!.username, iconURL: client.DiscordClient!.user?.displayAvatarURL()})
            .addField('Client Latency:', `\`${client.DiscordClient!.ws.ping}ms\``)
            .addField('Client Uptime:', convertMS(process.uptime()))
            .addField('Version:', `\`v${client.PackageVersion}\``)
            .setTimestamp();
        
        interaction.editReply({embeds: [infoEmbed]});
    }
}

export default command;