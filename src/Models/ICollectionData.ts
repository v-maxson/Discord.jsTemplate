import { Collection } from "discord.js-light";
import ITextCommand from "./ITextCommand";

export default interface ICollectionData {
    TextCommands: Collection<string, ITextCommand>;
    TextCommandAliases: Collection<string, string>;
}