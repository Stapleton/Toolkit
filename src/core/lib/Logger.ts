/** @format */
import { Signale } from "signale";
import * as Auth from "../../../config/auth.json";

const SignaleTypes = {
	close: {
		label: "Closed",
		color: "red",
		badge: "🚫",
	},
	listen: {
		label: "Listening",
		color: "green",
		badge: "👂",
	},
	message: {
		label: "Message",
		color: "blue",
		badge: "💬",
	},
	connect: {
		label: "Connect",
		color: "cyan",
		badge: "🤝",
	},
	create: {
		label: "Create",
		color: "yellow",
		badge: "✨",
	},
	disabled: {
		label: "Disabled",
		color: "grey",
		badge: "❌",
	},
};

const SignaleOpts = {
	secrets: [Auth.Discord.BotToken, Auth.Discord.ClientID],
	scope: "Toolkit",
	types: SignaleTypes,
};

const Logger = {
	Global: new Signale(SignaleOpts),
	Api: new Signale(SignaleOpts).scope("Api"),
	App: new Signale(SignaleOpts).scope("App"),
	Core: new Signale(SignaleOpts).scope("Core"),
	Mods: new Signale(SignaleOpts).scope("Mods"),
};

export default Logger;
