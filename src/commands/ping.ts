import { SlashCommandBuilder,ChatInputCommandInteraction,Collection } from 'discord.js';
import { Command } from '../Command';

const ping:Command = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction:ChatInputCommandInteraction,commands:Collection<String,Command>) {
		await interaction.reply({content:'Pong!'});
	},
};

module.exports = ping;