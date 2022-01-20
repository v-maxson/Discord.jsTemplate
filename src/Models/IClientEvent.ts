import IClient from './IClient';

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
    Run: (client: IClient, arg2: any, arg3: any, arg4: any) => Promise<void>;
}