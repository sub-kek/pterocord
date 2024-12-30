import {EmbedBuilder} from "discord.js";
import {config} from "../../config/botConfig";

export class PtcordEmbed {
  private readonly embed: EmbedBuilder;

  constructor() {
    this.embed = new EmbedBuilder()
        .setColor(config.embed_color);
  }

  setTitle(title: string): PtcordEmbed {
    this.embed.setTitle(title);
    return this;
  }

  setDescription(description: string): PtcordEmbed {
    this.embed.setDescription(description);
    return this;
  }

  setFooter(footer: string): PtcordEmbed {
    this.embed.setFooter({ text: footer });
    return this;
  }

  setColor(color: number): PtcordEmbed {
    this.embed.setColor(color);
    return this;
  }

  build(): EmbedBuilder {
    return this.embed;
  }
}
