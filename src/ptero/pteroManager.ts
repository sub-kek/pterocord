import {PtcordManager} from "../ptcordManager";
import {Server, UserClient} from "pterodactyl.ts";
import dotenv from "dotenv";

export class Ptero {
  readonly client: UserClient;

  constructor(client: UserClient) {
    this.client = client;
  }

  async getServers(): Promise<Array<Server>> {
    return await this.client.getServers();
  }
}

export let ptero: Ptero;

export class PteroManager implements PtcordManager {
  readonly client: UserClient

  constructor() {
    dotenv.config();
    this.client = new UserClient({ panel: process.env.PANEL as string, apikey: process.env.API_KEY as string });
  }

  enable(): void {
    ptero = new Ptero(this.client);
  }

  disable(): void {
  }

  getClass(): Function {
    return PteroManager;
  }
}

