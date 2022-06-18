import { ActivityType, PresenceStatusData } from 'discord.js-light';

interface IGeneralConfigurationData {
    Token: string;
    TextCommandPrefix: string;
    Admins: string[];
}

interface ISlashCommandConfigurationData {
    RegisterGlobally: boolean;
    SlashCommandGuilds: string[];
}

interface IPresenceData {
    Name: string;
    Type: ActivityType
    AFK: boolean;
    Status: PresenceStatusData;
}

export default interface IUserConfig {
    DebugMode: boolean;
    General: IGeneralConfigurationData;
    SlashCommands: ISlashCommandConfigurationData;
    Presence: IPresenceData;
}