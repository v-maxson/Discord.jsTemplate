import { join } from 'path';
import IClient from "../models/IClient";
import IClientEvent from "../models/IClientEvent";
import GetFiles from "./GetFiles";
import Logger from "./Logger";

export default class EventRegister {
    /**
     * Registers events.
     * @param path The path to the events folder. Should be relative to ./bin.
     * @param client The client to register events.
     */
    public static async RegisterEvents(path: string, client: IClient): Promise<void> {
        // Make path relative to /bin
        let dir: string;
        try { dir = join('./bin/', path); } catch (e) { return Logger.Error("Could not get files. `path` is invalid."); }

        // Iterate over all event files.
        const files = GetFiles(dir);
        if (!files) return;

        for await (const file of files) {
            // Skip files that are not .js files.
            if (file.split('.').pop() != 'js') continue;

            const event: IClientEvent = require(file).default;

            Logger.Info(`Registering Event: ${event.Config.Name}`);
            client.DiscordClient!.on(event.Config.Name, event.Run.bind(null, client));
        }
    }
}