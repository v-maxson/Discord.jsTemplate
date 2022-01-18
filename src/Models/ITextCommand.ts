import { Client, Message } from 'discord.js-light';

export interface ITextCommandConfig {
    /**
     * The name of the command, will be shown in the help command.
     */
    Name: string;

    /**
     * The description for this command, will be shown in the help command.
     */
    Description: string;

    /**
     * Alternative names for this command.
     */
    Aliases: string[];

    /**
     * Whether or not this command should be limited to just those whose IDs are included in the `Client.UserConfig.Admins` array.
     */
    Admin: boolean;
}

export default interface ITextCommand {
    /**
     * Configuration for this command.
     */
    Config: ITextCommandConfig;

    /**
     * Logic for this command.
     */
    Run: (client: Client, message: Message, args: string[]) => Promise<void>;
}