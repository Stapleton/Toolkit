/** @format */

import { Signale } from "signale";
import Module, { __TKModules } from "@Core/lib/Module";
import { ChildProcess, fork } from "child_process";
import { IModConfig, __TKConfigs } from "@Core/lib/ModConfig";

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

class Toolkit extends Module {
	public readonly Config = <ToolkitConfig>this._config.getConfig();

	private static INSTANCE: Toolkit;

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

	private constructor() {
		super("Toolkit", "toolkit", "0.0.1", "lib", "none");
	}

	public static getInstance() {
		if (!this.INSTANCE) {
			this.INSTANCE = new this();
		}
		return this.INSTANCE;
	}
}

//Loggers.Global.info(Toolkit.Paths.Config);

const TK = Toolkit.getInstance();

export default TK;
