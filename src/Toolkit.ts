/** @format */

import { Signale } from "signale";
import Module from "@Core/lib/Module";
import { ChildProcess } from "child_process";
import ModConfig, { IModConfig, ModID } from "@Core/lib/ModConfig";

export type ToolkitDomain = "api" | "app" | "core" | "module";

export interface ToolkitConfig extends IModConfig {
	Api: {
		disabled: boolean;
	};
	App: {
		disabled: boolean;
	};
	Core: {
		disabled: boolean;
	};
	Module: {
		disabled: boolean;
	};
}

export const SignaleOpts = {
	scope: "Toolkit",
	types: {
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
	},
};

export var InitLogger = new Signale(SignaleOpts);
export var __TKConfigs: Map<ModID, ModConfig> = new Map();
export var __TKModules: Map<ModID, Module> = new Map();

class Toolkit extends Module {
	public readonly Config = <ToolkitConfig>this._config.getConfig();

	public Paths = {
		Config: `${process.cwd()}\\config`,
		Api: `${process.cwd()}\\src\\api`,
		App: `${process.cwd()}\\src\\app`,
		Core: `${process.cwd()}\\src\\core`,
		Mods: `${process.cwd()}\\src\\modules`,
	};

	public Logger = {
		Global: new Signale(SignaleOpts),
		Api: new Signale(SignaleOpts).scope("Api"),
		App: new Signale(SignaleOpts).scope("App"),
		Core: new Signale(SignaleOpts).scope("Core"),
		Mods: new Signale(SignaleOpts).scope("Mods"),
	};

	public Workers: Map<ToolkitDomain, ChildProcess> = new Map();
	public Modules = __TKConfigs;
	public Configs = __TKConfigs;

	constructor() {
		super("Toolkit", "toolkit", "0.0.1", "lib", "none");
	}
}

//Loggers.Global.info(Toolkit.Paths.Config);

export default new Toolkit();
