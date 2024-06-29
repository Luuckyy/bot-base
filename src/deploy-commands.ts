import  { REST, Routes,RESTPostAPIApplicationCommandsJSONBody } from 'discord.js';
import path from 'node:path';
import fs from 'node:fs';
import { Command } from './Command';
import dotenv from 'dotenv';
dotenv.config()

async function run() {
  try {
    const discord_token = process.env.DISCORD_TOKEN || 'null';
    const clientId = process.env.CLIENT_ID || 'null';
    const guildId = process.env.GUILD_ID || 'null'

    const commands:RESTPostAPIApplicationCommandsJSONBody[] = [];
    const commandsPath = path.join(__dirname, 'commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));
    for await(const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        if(require.resolve(filePath)){
          delete require.cache[require.resolve(filePath)]
        }
        const command:Command = await require(filePath);
        const d = await command.data();
        commands.push(d.toJSON());
    }

    const rest = new REST({ version: '10' }).setToken(discord_token);

    //Delete every command
    rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
    .then(() => console.log('Successfully deleted all guild commands.'))
    .catch(console.error);

    // for global commands
    rest.put(Routes.applicationCommands(clientId), { body: [] })
    .then(() => console.log('Successfully deleted all application commands.'))
    .catch(console.error);


    rest.put(Routes.applicationCommands(clientId), { body: commands })
        .then((data:any) => console.log(`Successfully registered ${data.length} application commands.`))
        .catch(console.error);

    /*
    Register commands only for special servers
    */
    const commandsAdmin:RESTPostAPIApplicationCommandsJSONBody[] = [];
    const commandsPathAdmin = path.join(__dirname, 'admincommands');
    const commandFilesAdmin = fs.readdirSync(commandsPathAdmin).filter(file => file.endsWith('.ts'));
    for (const file of commandFilesAdmin) {
        const filePath = path.join(commandsPathAdmin, file);
        if(require.resolve(filePath)){
          delete require.cache[require.resolve(filePath)]
        }
        const commandAdmin:Command = await require(filePath);
        const d = await commandAdmin.data();
        commandsAdmin.push(d.toJSON());
    }
    rest.put(Routes.applicationGuildCommands(clientId,guildId), { body: commandsAdmin })
        .then((data:any) => console.log(`Successfully registered ${data.length} application commands.`))
        .catch(console.error);
    
  } catch {
    console.error
  }
}
run().catch(console.dir);