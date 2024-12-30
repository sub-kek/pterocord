import {PtcordManager} from "../ptcordManager";
import {Client, GatewayIntentBits} from "discord.js";
import {CommandHandler} from "./command/commandHandler";

export class BotManager implements PtcordManager {
  readonly client: Client;
  readonly commandHandler: CommandHandler;

  constructor() {
    this.client = new Client({
      intents: [
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
      ]
    });

    this.commandHandler = new CommandHandler(this.client);
  }

  enable(): void {
    this.client.on('ready', async () => {
      console.log(`Logged in as ${this.client.user?.tag}!`);
      await this.commandHandler.registerCommands();
    });

    this.client.on('interactionCreate', async (interaction) => {
      if (interaction.isCommand()) {
        await this.commandHandler.onSlashCommandInteraction(interaction);
      }
    });
  }

  disable(): void {
  }

  getClass(): Function {
    return BotManager;
  }
}
