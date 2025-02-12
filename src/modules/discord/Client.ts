/** @format */

import Logger from "../../core/lib/Logger";
import { Discord } from "../../../config/auth.json";
import { Client as DJSClient, Events, GatewayIntentBits } from "discord.js";

export default class Client {
	private static INSTANCE: Client;

	public static logger: typeof Logger["Mods"] = Logger.Mods.scope("Mods.Discord.Client");

	private djsClient: DJSClient;

	public static getInstance() {
		if (!this.INSTANCE) {
			this.INSTANCE = new Client();
		}
		return this.INSTANCE;
	}

	private constructor() {
		this.djsClient = new DJSClient({
			intents: [
				GatewayIntentBits.Guilds,
				GatewayIntentBits.GuildIntegrations,
				GatewayIntentBits.GuildMembers,
				GatewayIntentBits.GuildMessages,
				GatewayIntentBits.GuildMessageReactions,
				GatewayIntentBits.GuildMessageTyping,
				GatewayIntentBits.GuildVoiceStates,
				GatewayIntentBits.GuildWebhooks,
				GatewayIntentBits.MessageContent,
			],
		});

		this.djsClient.once(Events.ClientReady, this.handlerClientReady);

		this.djsClient.login(Discord.BotToken);
	}

	private handlerClientReady(_client: DJSClient) {
		Client.logger.success(`Discord Client Ready! Username is ${_client.user.username}`);
	}
}
