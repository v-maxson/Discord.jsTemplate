import { Collection } from "discord.js-light";
import ITextCommand from "./ITextCommand";
import ISlashCommand from './ISlashCommand';

export default interface ICollectionData {
    TextCommands: Collection<string, ITextCommand>;
    TextCommandAliases: Collection<string, string>;
    SlashCommands: Collection<string, ISlashCommand>;
}