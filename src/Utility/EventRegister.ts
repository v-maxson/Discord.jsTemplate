import Logger from "./Logger";
import * as Discord from 'discord.js-light';
import GetFiles from "./GetFiles";
import IClientEvent from "../Models/IClientEvent";
import { join } from 'path';

export default class EventRegister {
    /**
     * Registers events.
     * @param path The path to the events folder. Should be relative to ./bin.
     * @param client The client to register events.
     */
    public static async RegisterEvents(path: string, client: Discord.Client): Promise<void> {
        // Make path relative to /bin
        let dir: string;
        try { dir = join('./bin/', path); } catch (e) { return Logger.Error("Could not get files. `path` is invalid."); }

        // Iterate over all event files.
        for await (const file of GetFiles(dir)) {
            // Skip files that are not .js files.
            if (file.split('.').pop() != 'js') continue;

            const event: IClientEvent = require(file).default;

            Logger.Info(`Registering Event: ${event.Config.Name}`);
            client.on(event.Config.Name, event.Run.bind(null, client));
        }
    }
}