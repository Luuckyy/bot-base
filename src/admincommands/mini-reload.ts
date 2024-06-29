import { SlashCommandBuilder,ChatInputCommandInteraction,Collection } from 'discord.js';
import { Command } from '../Command';
import { spawn } from "node:child_process";
import fs from 'node:fs';
import path from 'node:path';
import CommandService from '../services/CommandService';

const mini_reload:Command = {
	data: async function (){ return new SlashCommandBuilder()
		.setName('mini-reload')
		.setDescription('Reloads commands cached : Admin only')
    },
	async execute(interaction:ChatInputCommandInteraction) {
        if(interaction.user.id == '168495998652514304'){
            await CommandService.fullReload();
            await interaction.reply({content:"Reloaded ✅"});
        } else {
            await interaction.reply({content:`Only the owner can reload commands`});
        }
	},
};

module.exports = mini_reload;