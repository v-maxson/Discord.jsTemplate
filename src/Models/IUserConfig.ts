interface IGeneralConfigurationData {
    Token: string;
    TextCommandPrefix: string;
    Admins: string[];
}


export default interface IUserConfig {
    DebugMode: boolean;
    General: IGeneralConfigurationData;
}