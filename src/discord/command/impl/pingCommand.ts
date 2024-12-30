import {CommandInteraction, SlashCommandBuilder} from "discord.js";
import {PtcordCommand} from "../ptcordCommand";
import {language} from "../../../config/botConfig";
import {PtcordEmbed} from "../../utils/ptcordEmbed";

export class PingCommand implements PtcordCommand {
  getName(): string {
    return 'ping';
  }

  getDescription(): string {
    return language.get("discord.command.ping.description");
  }

  getCommand(): SlashCommandBuilder {
    return new SlashCommandBuilder()
        .setName(this.getName())
        .setDescription(this.getDescription());
  }

  private readonly embed = new PtcordEmbed();

  async execute(interaction: CommandInteraction): Promise<void> {
    const time = Date.now();

    this.embed.setDescription(language.get("discord.command.ping.message.testing"));
    await interaction.reply({embeds: [this.embed.build()]});

    const execTime = Date.now() - time;

    this.embed.setDescription(language.get("discord.command.ping.message.result", {execTime}));
    await interaction.editReply({embeds: [this.embed.build()]});
  }
}
