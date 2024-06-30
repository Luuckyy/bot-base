import { SlashCommandBuilder,ChatInputCommandInteraction,Collection, SlashCommandOptionsOnlyBuilder } from 'discord.js';

export interface Command {
    data: () => Promise<Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'> | SlashCommandOptionsOnlyBuilder>,
    execute: (interaction:ChatInputCommandInteraction) => Promise<void>
}