import {CommandInteraction, SlashCommandBuilder} from 'discord.js';

export interface PtcordCommand {
  getName(): string;
  getDescription(): string;
  getCommand(): SlashCommandBuilder;
  execute(interaction: CommandInteraction): Promise<void>;
}
