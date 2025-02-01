/** @format */

import { SlashCommandBuilder, CommandInteraction, ContextMenuCommandInteraction } from "discord.js";

export default {
	data: new SlashCommandBuilder()
		.setName("youtube")
		.setDescription("Stream a youtube video.")
		.addStringOption((option) => option.setName("url").setDescription("Youtube URL to stream in voice chat."))
		.toJSON(),
	async execute(interaction: CommandInteraction) {
		const { value: url } = interaction.options.get("url");

		await interaction.reply(`${url}`);
	},
};
