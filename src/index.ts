import {PtcordManager} from "./ptcordManager";
import {BotManager} from "./discord/botManager";
import {config as botConfig} from "./config/botConfig";
import {PteroManager} from "./ptero/pteroManager";

class Ptcord {
  private readonly managers: Array<PtcordManager>;
  private readonly botManager;

  constructor() {
    this.botManager = new BotManager();

    this.managers = new Array<PtcordManager>();
    this.managers.push(this.botManager);
    this.managers.push(new PteroManager());
  }

  start(): void {
    for (const manager of this.managers) {
      manager.enable();
    }

    this.botManager.client.login(botConfig.token);
  }
}

new Ptcord().start();
