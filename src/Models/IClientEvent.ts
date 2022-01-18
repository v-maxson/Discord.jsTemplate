import { Client } from 'discord.js-light';

export interface IEventConfig {
    /**
     * The name of the event.
     */
    Name: string;
}

export default interface IClientEvent {
    /**
     * Configuration for this event.
     */
    Config: IEventConfig;

    /**
     * Logic for this event.
     */
    Run: (client: Client, arg2: any, arg3: any, arg4: any) => Promise<void>;
}