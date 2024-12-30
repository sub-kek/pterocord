import {CommandInteraction, EmbedBuilder, SlashCommandBuilder} from "discord.js";
import {PtcordCommand} from "../ptcordCommand";
import {language} from "../../../config/botConfig";
import {PtcordEmbed} from "../../utils/ptcordEmbed";
import {ptero} from "../../../ptero/pteroManager";

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

        embed.setFooter(language.get("discord.command.get_servers.message.footer", { serverId }))

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

        embed.setDescription(language.get("discord.command.get_servers.message.status", {
          cpuUsage,
          cpuTotal,
          memUsage,
          memTotal
        }));

        serverEmbeds.push(embed.build());
      }

      await interaction.reply({embeds: serverEmbeds});
    });
  }
}
