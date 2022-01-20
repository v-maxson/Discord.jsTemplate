import Logger from "./Logger";
import GetFiles from "./GetFiles";
import { readFileSync, writeFileSync } from 'fs';
import ITextCommand from "../models/ITextCommand";
import ISlashCommand from '../models/ISlashCommand';
import { join } from 'path';
import IClient from "../models/IClient";
import * as Discord from 'discord.js-light';
import { ApplicationCommandDataResolvable } from "discord.js-light";

export default class CommandRegister {
    /**
     * Registers Text Commands.
     * @param path The path to the TextCommands folder. Should be relative to ./bin.
     */
    public static async RegisterTextCommands(path: string, client: IClient): Promise<void> {
        // Make path relative to /bin
        let dir: string;
        try { dir = join('./bin/', path); } catch (e) { return Logger.Error("Could not get files. `path` is invalid."); }

        // Iterate over all event files.
        const files = GetFiles(dir);
        if (!files) return;

        for await (const file of files) {
            // Skip files that are not .js files.
            if (file.split('.').pop() != 'js') continue;

            const command: ITextCommand = require(file).default;

            if (command.Config.Name.length < 1) 
                return Logger.Error(`Command File 'Config.Name' property must be provided. File: ${file}`);

            if (client.Collections.TextCommands.has(command.Config.Name) || client.Collections.TextCommandAliases.has(command.Config.Name)) 
                return Logger.Error(`Duplicate Command Name found, only one command with name \`${command.Config.Name}\` will be registered.`);

            if (command.Config.Description.length < 1) 
                Logger.Warning(`'${command.Config.Name}' command description not provided.`);

            client.Collections.TextCommands.set(command.Config.Name, command);
            Logger.Info(`Registered Text Command: ${command.Config.Name}`);

            if (command.Config.Aliases.length < 1) return;

            command.Config.Aliases.forEach(alias => {
                if (client.Collections.TextCommands.has(alias) || client.Collections.TextCommandAliases.has(alias))
                    return Logger.Error(`Duplicate Aliases found, only one command with alias \`${alias}\` will have that alias registered.`);

                client.Collections.TextCommandAliases.set(alias, command.Config.Name);
            });
            Logger.Info(`Registered ${command.Config.Aliases.length} aliases for Text Command: ${command.Config.Name}`);
        }
    }

    /**
     * Registers Slash Commands.
     * @param path The path to the SlashCommands folder. Should be relative to /bin.
     * @param client The client to register commands with.
     */
    public static async RegisterSlashCommands(path: string, client: IClient): Promise<void> {
        // Make path relative to /bin
        let dir: string;
        try { dir = join('./bin/', path); } catch (e) { return Logger.Error("Could not get files. `path` is invalid."); }

        // Iterate over all Slash Command files.
        const files = GetFiles(dir);
        if (!files) return;

        for await (const file of files) {
            // Skip files that are not .js files.
            if (file.split('.').pop() != 'js') continue;

            const command: ISlashCommand = require(file).default;

            if (!command.Config.name || command.Config.name.length < 1)
                return Logger.Error(`Slash Command name not provided... File: ${file}`);
            
            if (!command.Config.description || command.Config.description.length < 1)
                return Logger.Error(`Slash Command description not provided... Command: ${command.Config.name}`);
            
            Logger.Info(`Registering Slash Command: ${command.Config.name}`);
            client.Collections.SlashCommands.set(command.Config.name, command);
        }

        const cachedCommands: string = readFileSync('cache/application_commands.json', 'utf-8');

        // If one slash command has changed, all slash commands will need to be re-registered.
        // This is temporary.
        if (cachedCommands != JSON.stringify(client.Collections.SlashCommands)) {
            // Write new commands array to cache file.
            Logger.Info('Caching slash command changes...');
            writeFileSync('cache/application_commands.json', JSON.stringify(client.Collections.SlashCommands));

            // Register Commands.
            if (client.UserConfig.SlashCommands.RegisterGlobally) {
                const commandArr: ApplicationCommandDataResolvable[] = [];

                client.Collections.SlashCommands.forEach(command => {
                    commandArr.push(command.Config.toJSON());
                });

                client.DiscordClient.application?.commands.set(commandArr);
            } else {
                const commandArr: ApplicationCommandDataResolvable[] = [];

                client.Collections.SlashCommands.forEach(command => {
                    commandArr.push(command.Config.toJSON());
                });

                client.UserConfig.SlashCommands.SlashCommandGuilds.forEach(async guild => {
                    const fetchedGuild = await client.DiscordClient.guilds.fetch(guild);

                    fetchedGuild.commands.set(commandArr);
                });
                
            }
        }
    }

    /**
     * Handles Text Commands.
     * @param client The client.
     * @param message The message.
     */
    public static async HandleTextCommands(client: IClient, message: Discord.Message): Promise<void> {
        // Ignore messages that are from bots, in a DM channel, or do not start with the designated text command prefix.
        if (message.author.bot) return;
        if (message.channel.type == 'DM') return;
        if (!message.content.startsWith(client.UserConfig.General.TextCommandPrefix)) return;

        // Parse message content.
        const messageArr = message.content.split(' ');
        const commandName = messageArr[0].slice(client.UserConfig.General.TextCommandPrefix.length);
        const args = messageArr.slice(1);

        // Attempt to find given command in collections. If not found, ignore the message.
        const command = client.Collections.TextCommands.get(commandName) || client.Collections.TextCommands.get(client.Collections.TextCommandAliases.get(commandName)!);
        if (command) {
            // If the command has `Config.Admin` set to true, validate that the user is in the UserConfig.Admins array. If they are not, ignore the message.
            if (command.Config.Admin && !client.UserConfig.General.Admins.includes(message.author.id)) return;

            const timer = process.hrtime();
            await command.Run(client, message, args);
            const elapsed = process.hrtime(timer)[1] / 1000000;

            Logger.Info(`${message.author.tag} (${message.author.id}) executed ${commandName} text command... Execution Took: ${process.hrtime(timer)[0] ? `${process.hrtime(timer)[0]}s ` : ""}${elapsed.toFixed(3)}ms`);
        }
    }

    public static async HandleSlashCommands(client: IClient, interaction: Discord.CommandInteraction) {
        const command = client.Collections.SlashCommands.get(interaction.commandName);

        if (command) {
            const timer = process.hrtime();
            await command.Run(client, interaction);
            const elapsed = process.hrtime(timer)[1] / 1000000;

            Logger.Info(`${interaction.user.username} (${interaction.user.id}) executed ${interaction.commandName} slash command... Execution Took: ${process.hrtime(timer)[0] ? `${process.hrtime(timer)[0]}s ` : ""}${elapsed.toFixed(3)}ms`);
        }
    }
}