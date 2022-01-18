import ITextCommand from '../../Models/ITextCommand';
import * as Discord from 'discord.js-light';


const event: ITextCommand = {
    Config: {
        Name: "",
        Description: "",
        Aliases: [],
        Admin: false
    },

    Run: async (client: Discord.Client, message: Discord.Message, args: string[]) => {
        
    }
}

export default event;