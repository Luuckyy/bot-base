import { SlashCommandBuilder,ChatInputCommandInteraction,Collection } from 'discord.js';

export interface Command {
    data:SlashCommandBuilder,
    execute: (interaction:ChatInputCommandInteraction,commands:Collection<String,Command>) => Promise<void>
}