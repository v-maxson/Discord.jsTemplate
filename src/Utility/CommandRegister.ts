import Logger from "./Logger";
import GetFiles from "./GetFiles";
import ITextCommand from "../Models/ITextCommand";
import { join } from 'path';
import Client from '../index';

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

            if (command.Config.Name.length < 1) return Logger.Error(`Command File 'Config.Name' property must be provided. File: ${file}`);
            if (command.Config.Description.length < 1) Logger.Warning(`'${command.Config.Name}' command description not provided.`);

            Client.Commands.set(command.Config.Name, command);
            Logger.Info(`Registered Text Command: ${command.Config.Name}`);

            if (command.Config.Aliases.length < 1) return;

            command.Config.Aliases.forEach(alias => {
                Client.Aliases.set(alias, command.Config.Name);
            });
            Logger.Info(`Registered ${command.Config.Aliases.length} aliases for Text Command: ${command.Config.Name}`);
        }
    }
}