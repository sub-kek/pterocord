import {EmbedBuilder} from "discord.js";
import {config} from "../../config/botConfig";

export class PtcordEmbed {
  private readonly embed: EmbedBuilder;

  constructor() {
    this.embed = new EmbedBuilder()
        .setColor(config.embed_color);
  }

  setDescription(description: string): PtcordEmbed {
    this.embed.setDescription(description);
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
