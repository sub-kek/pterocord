import {CommandInteraction, EmbedBuilder, SlashCommandBuilder} from "discord.js";
import {PtcordCommand} from "../ptcordCommand";
import {language} from "../../../config/botConfig";
import {PtcordEmbed} from "../../utils/ptcordEmbed";
import {ptero} from "../../../ptero/pteroManager";

function formatTime(ms: number): string {
  const seconds = Math.floor(ms / 1000) % 60;
  const minutes = Math.floor(ms / (1000 * 60)) % 60;
  const hours = Math.floor(ms / (1000 * 60 * 60)) % 24;
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));

  return `${days}d:${hours}h:${minutes}m:${seconds}s`;
}

export class GetServersCommand implements PtcordCommand {
  getName(): string {
    return 'get-servers';
  }

  getDescription(): string {
    return language.get("discord.command.get_servers.description");
  }

  getCommand(): SlashCommandBuilder {
    return new SlashCommandBuilder()
        .setName(this.getName())
        .setDescription(this.getDescription());
  }

  async execute(interaction: CommandInteraction): Promise<void> {
    ptero.getServers().then(async (servers) => {
      let serverEmbeds: Array<EmbedBuilder> = [];

      for (const server of servers) {
        let embed = new PtcordEmbed().setTitle(server.name);

        let serverId = server.identifier;
        let node = server.node;

        embed.setFooter(language.get("discord.command.get_servers.message.footer", {serverId, node}));

        if (server.is_suspended) {
          embed.setDescription(language.get("discord.command.get_servers.message.suspended"));
          embed.setColor(0xff0000);
          serverEmbeds.push(embed.build());
          continue;
        }

        let usage = await server.getUsage();
        let limits = server.limits;

        let cpuUsage = Math.round(usage.resources.cpu_absolute);
        let cpuTotal = limits.cpu;
        let memUsage = (usage.resources.memory_bytes / 1024 /* KB */ / 1024 /* MB */).toFixed(0);
        let memTotal = limits.memory;
        let uptime = formatTime(usage.resources.uptime);

        embed.build().addFields(
            {
              name: language.get("discord.command.get_servers.message.field.cpu.name"),
              value: language.get("discord.command.get_servers.message.field.cpu.value", {cpuUsage, cpuTotal}),
              inline: true,
            },
            {
              name: language.get("discord.command.get_servers.message.field.mem.name"),
              value: language.get("discord.command.get_servers.message.field.mem.value", {memUsage, memTotal}),
              inline: true,
            },
            {
              name: language.get("discord.command.get_servers.message.field.uptime.name"),
              value: language.get("discord.command.get_servers.message.field.uptime.value", {uptime}),
              inline: false,
            },
        );

        serverEmbeds.push(embed.build());
      }

      await interaction.reply({embeds: serverEmbeds});
    });
  }
}
