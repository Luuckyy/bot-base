import { SlashCommandBuilder,ChatInputCommandInteraction,Collection } from 'discord.js';
import { Command } from '../Command';

const ping:Command = {
	data: async function() {return new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!')
	},
	async execute(interaction:ChatInputCommandInteraction) {
		await interaction.reply({content:'Pang!'});
	},
};

module.exports = ping;