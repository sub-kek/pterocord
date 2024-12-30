import { PtcordManager } from "./ptcordManager";
import { BotManager } from "./discord/BotManager";
import { config as botConfig } from "./config/botConfig";

class Ptcord {
  private readonly managers: Array<PtcordManager>;
  private readonly botManager;

  constructor() {
    this.botManager = new BotManager();

    this.managers = [];
    this.managers.push( this.botManager )
  }

  start(): void {
    for (const manager of this.managers) {
      manager.enable();
    }

    this.botManager.client.login(botConfig.token)
  }
}

new Ptcord().start();
