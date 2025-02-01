/** @format */

import { REST, Routes, Client, Events } from "discord.js";
import youtube from "./commands/youtube";
import * as Auth from "../../../config/auth.json";

export default class DiscordCommandManager {
	private rest = new REST().setToken(Auth.Discord.BotToken);

	constructor() {
		//console.log(youtube);

		this.RefreshSlashCommands().then();
	}

	public async RefreshSlashCommands() {
		try {
			console.log("Started refreshing application (/) commands.");

			this.rest
				.put(Routes.applicationGuildCommands(Auth.Discord.ClientID, Auth.Discord.GuildID), {
					body: [youtube.data],
				})
				.then(() => console.log("Successfully reloaded application (/) commands."));
		} catch (error) {
			console.error(error);
		}
	}
}
