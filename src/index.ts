import { Client,GatewayIntentBits,Collection, Interaction, CacheType } from "discord.js";
import { Command } from "./Command";
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client'
import CommandService from "./services/CommandService";

dotenv.config();

const prisma = new PrismaClient()

async function run() {
  const clientDiscord = await connectDiscord();

  await CommandService.fullReload()

  clientDiscord.on('interactionCreate', interactionCreate);
}
run()
.catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
});

async function connectDiscord(){
  const discord_token = process.env.DISCORD_TOKEN || 'void';
  
  const clientDiscord = new Client({
      intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages,GatewayIntentBits.GuildEmojisAndStickers]
  });
  await clientDiscord.login(discord_token);

  return clientDiscord;
}

async function interactionCreate(interaction: Interaction<CacheType>){
  if (!interaction.isChatInputCommand()) return;
  
  const command = CommandService.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
}

// Examples of basic functions of Prisma

async function createUser(name: string, email: string){
  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
    },
  })

  return user;
}

async function retrieveAllUsers(){
  const users = await prisma.user.findMany();
  return users;
}