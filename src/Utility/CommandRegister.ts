import Logger from "./Logger";
import GetFiles from "./GetFiles";
import ITextCommand from "../Models/ITextCommand";
import { SlashCreator, GatewayServer } from 'slash-create';
import { join, dirname } from 'path';
import Client from '../index';
import * as Discord from 'discord.js-light';

export default class CommandRegister {
    /**
     * Registers Text Commands.
     * @param path The path to the TextCommands folder. Should be relative to ./bin.
     */
    public static async RegisterTextCommands(path: string): Promise<void> {
        // Make path relative to /bin
        let dir: string;
        try { dir = join('./bin/', path); } catch (e) { return Logger.Error("Could not get files. `path` is invalid."); }

        // Iterate over all event files.
        for await (const file of GetFiles(dir)) {
            // Skip files that are not .js files.
            if (file.split('.').pop() != 'js') continue;

            const command: ITextCommand = require(file).default;

            if (command.Config.Name.length < 1) 
                return Logger.Error(`Command File 'Config.Name' property must be provided. File: ${file}`);

            if (Client.Collections.TextCommands.has(command.Config.Name) || Client.Collections.TextCommandAliases.has(command.Config.Name)) 
                return Logger.Error(`Duplicate Command Name found, only one command with name \`${command.Config.Name}\` will be registered.`);

            if (command.Config.Description.length < 1) 
                Logger.Warning(`'${command.Config.Name}' command description not provided.`);

            Client.Collections.TextCommands.set(command.Config.Name, command);
            Logger.Info(`Registered Text Command: ${command.Config.Name}`);

            if (command.Config.Aliases.length < 1) return;

            command.Config.Aliases.forEach(alias => {
                if (Client.Collections.TextCommands.has(alias) || Client.Collections.TextCommandAliases.has(alias))
                    return Logger.Error(`Duplicate Aliases found, only one command with alias \`${alias}\` will have that alias registered.`);

                Client.Collections.TextCommandAliases.set(alias, command.Config.Name);
            });
            Logger.Info(`Registered ${command.Config.Aliases.length} aliases for Text Command: ${command.Config.Name}`);
        }
    }

    /**
     * Registers Slash Commands.
     * @param path The path to the SlashCommands folder. Should be relative to /bin.
     * @param client The client to register commands with.
     */
    public static async RegisterSlashCommands(path: string, client: Discord.Client): Promise<void> {
        let dir: string;
        try { dir = join(dirname(__dirname), path); } catch (e) { return Logger.Error("Could not get files. `path` is invalid."); }

        const creator = new SlashCreator({
            applicationID: client.user!.id,
            token: client.token!,
            client: client
        });

        creator.on('error', message => Logger.Error(message.message));
        creator.on('warn', message => Logger.Warning(message.toString()));
        creator.on('commandError', (command, error) => Logger.Error(`Error Executing ${command.commandName} command.`, error));
        creator.on('commandRegister', (command) => Logger.Info(`Slash Command Registered: ${command.commandName}`));
        creator.on('commandRun', (command, _promise, context) => Logger.Info(`${context.user.username} (${context.user.id}) executed ${command.commandName} slash command... `));
        
        creator
                .withServer(
                    new GatewayServer(handler => client.ws.on('INTERACTION_CREATE', handler))
                )
                .registerCommandsIn(dir)
                .syncCommands();
    }

    /**
     * Handles Text Commands.
     * @param client The client.
     * @param message The message.
     */
    public static async HandleTextCommands(client: Discord.Client, message: Discord.Message): Promise<void> {
        // Ignore messages that are from bots, in a DM channel, or do not start with the designated text command prefix.
        if (message.author.bot) return;
        if (message.channel.type == 'DM') return;
        if (!message.content.startsWith(Client.UserConfig.General.TextCommandPrefix)) return;

        // Parse message content.
        const messageArr = message.content.split(' ');
        const commandName = messageArr[0].slice(Client.UserConfig.General.TextCommandPrefix.length);
        const args = messageArr.slice(1);

        // Attempt to find given command in collections. If not found, ignore the message.
        const command = Client.Collections.TextCommands.get(commandName) || Client.Collections.TextCommands.get(Client.Collections.TextCommandAliases.get(commandName)!);
        if (command) {
            // If the command has `Config.Admin` set to true, validate that the user is in the UserConfig.Admins array. If they are not, ignore the message.
            if (command.Config.Admin && !Client.UserConfig.General.Admins.includes(message.author.id)) return;

            const timer = process.hrtime();
            await command.Run(client, message, args);
            const elapsed = process.hrtime(timer)[1] / 1000000;

            Logger.Info(`${message.author.tag} (${message.author.id}) executed ${commandName} text command... Execution Took: ${process.hrtime(timer)[0] ? `${process.hrtime(timer)[0]}s ` : ""}${elapsed.toFixed(3)}ms`);
        }
    }
}