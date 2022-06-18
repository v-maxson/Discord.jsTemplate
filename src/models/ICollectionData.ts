import { Collection } from 'discord.js-light';

import ISlashCommand from './ISlashCommand';
import ITextCommand from './ITextCommand';

export default interface ICollectionData {
    TextCommands: Collection<string, ITextCommand>;
    TextCommandAliases: Collection<string, string>;
    SlashCommands: Collection<string, ISlashCommand>;
}