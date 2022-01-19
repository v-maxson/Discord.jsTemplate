import * as SlashCreate from 'slash-create';

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
        return context.send({ content: "This is a test!", ephemeral: true });
    }
}

module.exports = Command;