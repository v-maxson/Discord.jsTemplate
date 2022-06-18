import * as Discord from 'discord.js-light';
import ICollectionData from "./ICollectionData";
import IUserConfig from "./IUserConfig";

export default interface IClient {
    DiscordClient: Discord.Client | null;
    UserConfig: IUserConfig;
    PackageVersion: number;
    Collections: ICollectionData
}