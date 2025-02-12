/** @format */

import youtube from "./commands/youtube";
import { REST, Routes } from "discord.js";
import Logger from "../../core/lib/Logger";
import * as Auth from "../../../config/auth.json";

export default class DiscordCommandManager {
	private rest = new REST().setToken(Auth.Discord.BotToken);
	private logger = Logger.Mods.scope("Mods.CommandManager.DiscordCommandManager");

	constructor() {
		//console.log(youtube);

		this.RefreshSlashCommands().then();
	}

	public async RefreshSlashCommands() {
		try {
			this.logger.start("Started refreshing application (/) commands.");

			this.rest
				.put(Routes.applicationGuildCommands(Auth.Discord.ClientID, Auth.Discord.GuildID), {
					body: [youtube.data],
				})
				.then(() => this.logger.success("Successfully reloaded application (/) commands."));
		} catch (error) {
			this.logger.error(error);
		}
	}
}
