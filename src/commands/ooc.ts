import { SlashCommandBuilder,ChatInputCommandInteraction,Collection, APIApplicationCommandOptionChoice } from 'discord.js';
import { Command } from '../Command';
import { MongoClient } from "mongodb";

async function run(){
    const uri =
    "mongodb+srv://admub:<password>@cluster0.3o6cn.mongodb.net/?retryWrites=true&w=majority";
    const clientMongo = new MongoClient(uri);
    const database = clientMongo.db('discord_bot');
    const oocCollection = database.collection('ooc');
    const query = { type: 'User' };
    const users = await (await oocCollection.find(query)).toArray();

    const array:APIApplicationCommandOptionChoice<string>[] = [];

    users.forEach(doc => array.push({name:doc?.name,value:doc?.name}))
    
    const ooc:Command = {
        data: async function (){const command = new SlashCommandBuilder()
            .setName('ooc')
            .setDescription('Random out of context screen')
            .addStringOption(option => {
                    option.setName("user")
                    .setDescription("Out of context concerning a specified user"),
                    users.forEach(doc => option.addChoices(({name:doc?.name,value:doc?.name})))
                    return option;
                }
                )
                return command
            }
                ,
        async execute(interaction:ChatInputCommandInteraction,commands:Collection<String,Command>) {
            await interaction.reply({content:'Pong!'});
        },
    };
    
    await clientMongo.close();
    return ooc;
}

module.exports = run();