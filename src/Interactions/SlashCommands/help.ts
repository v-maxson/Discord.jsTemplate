import * as SlashCreate from 'slash-create';
import Client from '../../index';

class Command extends SlashCreate.SlashCommand {
    constructor(creator: SlashCreate.SlashCreator) {
        super(creator, {
            name: 'help',
            description: 'Replies with a list of commands.',
            guildIDs: [
                "820008628777254942"
            ]
        }); 
    }

    async run(context: SlashCreate.CommandContext) {
        // Loop through each command and interpolate it into a string.
        let embedDescription = "";
        Client.Collections.TextCommands.forEach(command => {
            if (command.Config.Admin) return;
            embedDescription += `\`${command.Config.Name}\`: ${command.Config.Description}\n`
        });

        const helpEmbed: SlashCreate.MessageEmbedOptions = {
            author: { name: context.creator.client.user!.username, icon_url: context.creator.client.user!.displayAvatarURL() },
            title:  'Command List:',
            description: embedDescription,
            timestamp: new Date()
        }

        context.send({ embeds: [helpEmbed], ephemeral: true })
    }
}

module.exports = Command;