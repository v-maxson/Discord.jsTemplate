import { CommandInteraction } from 'discord.js-light';
import { SlashCommandBuilder } from '@discordjs/builders';
import IClient from './IClient';

export default interface ITextCommand {
    /**
     * Configuration for this command.
     */
    Config: SlashCommandBuilder;

    /**
     * Logic for this command.
     */
    Run: (client: IClient, interaction: CommandInteraction) => Promise<void>;
}