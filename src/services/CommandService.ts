import { Collection } from "discord.js";
import { Command } from "src/Command";
import fs from 'node:fs';
import path from 'node:path';

class CommandService {
    private static _instance: CommandService;
    private commands: Collection<String,Command>;

    private constructor(){
        this.commands = new Collection()
    }

    public static get Instance(){
        return this._instance || (this._instance = new this())
    }

    public async reloadCommands(){
        await this.addCommands('../commands')
    }

    public async reloadAdminCommands(){
        await this.addCommands('../admincommands')
    }

    public async fullReload(){
        await this.reloadCommands();
        await this.reloadAdminCommands();
    }

    private async addCommands(directory: string){
        const commandsPath = path.join(__dirname, directory);
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));
        
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            if(require.resolve(filePath)){
                delete require.cache[require.resolve(filePath)]
            }
            const command = await require(filePath);
            const d = await command.data();
            this.commands.set(d.name, command);
        }
      }

    public get(name: string){
        try{
            return this.commands.get(name)
        } catch(e) {
            console.error(`Could not fetch command : ${name}`)
            return null;
        }
    }
}

export default CommandService.Instance;