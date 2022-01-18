interface IGeneralConfigurationData {
    Token: string;
    TextCommandPrefix: string;
    Admins: string[];
    MainGuild: string;
}

interface IChannelConfigurationData {
    LogChannel: string;
}

export default interface IUserConfig {
    DebugMode: boolean;
    General: IGeneralConfigurationData;
    Channels: IChannelConfigurationData;
}