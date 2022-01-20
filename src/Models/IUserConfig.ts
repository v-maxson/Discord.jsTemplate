interface IGeneralConfigurationData {
    Token: string;
    TextCommandPrefix: string;
    Admins: string[];
}

interface ISlashCommandConfigurationData {
    RegisterGlobally: boolean;
    SlashCommandGuilds: string[];
}


export default interface IUserConfig {
    DebugMode: boolean;
    General: IGeneralConfigurationData;
    SlashCommands: ISlashCommandConfigurationData;
}