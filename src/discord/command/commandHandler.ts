import { Client, CommandInteraction } from 'discord.js';
import { PingCommand } from './impl/pingCommand';
import { PtcordCommand } from './ptcordCommand';
import { language } from "../../config/botConfig";

export class CommandHandler {
  private client: Client;
  private readonly commands: Array<PtcordCommand>;

  constructor(client: Client) {
    this.client = client;
    this.commands = new Array<PtcordCommand>();

    this.commands.push(new PingCommand());
  }

  // Регистрация команд на старте
  public async registerCommands() {
    for (const command of this.commands) {
      this.client.application?.commands.create(command.getCommand())
    }
  }

  // Обработчик Slash команд
  public async onSlashCommandInteraction(interaction: CommandInteraction) {
    this.commands.forEach(command => {

    });

    for (const command of this.commands) {
      if (command.getName() !== interaction.commandName) continue;

      await command.execute(interaction);
      return
    }

    await interaction.reply(language.get("discord.error.message.command_not_found"));
  }
}
