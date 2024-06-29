import { SlashCommandBuilder,ChatInputCommandInteraction,Collection } from 'discord.js';

export interface Command {
    data: () => Promise<Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>>,
    execute: (interaction:ChatInputCommandInteraction) => Promise<void>
}