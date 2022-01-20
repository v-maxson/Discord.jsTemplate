import ICollectionData from "./ICollectionData";
import IUserConfig from "./IUserConfig";
import * as Discord from 'discord.js-light';

export default interface IClient {
    DiscordClient: Discord.Client;
    UserConfig: IUserConfig;
    PackageVersion: number;
    Collections: ICollectionData
}