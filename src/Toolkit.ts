/** @format */

import { Signale } from "signale";
import Module from "@Core/lib/Module";
import { ChildProcess } from "child_process";
import ModConfig, { ModID } from "@Core/lib/ModConfig";

export type ToolkitDomain = "api" | "app" | "core" | "module";

export interface ToolkitConfig {
	disabled: ToolkitDomain[];
}

class Toolkit {
	public Paths = {
		Config: `${process.cwd()}\\config`,
		Api: `${process.cwd()}\\src\\api`,
		App: `${process.cwd()}\\src\\app`,
		Core: `${process.cwd()}\\src\\core`,
		Mods: `${process.cwd()}\\src\\modules`,
	};

	public Logger = {
		Global: new Signale({ scope: "Global" }),
		Api: new Signale({ scope: "Api" }),
		App: new Signale({ scope: "App" }),
		Core: new Signale({ scope: "Core" }),
		Mods: new Signale({ scope: "Mods" }),
	};

	public Workers: Map<ToolkitDomain, ChildProcess> = new Map();
	public Modules: Map<ModID, Module> = new Map();
	public Configs: Map<ModID, ModConfig> = new Map();
}

//Loggers.Global.info(Toolkit.Paths.Config);

export default new Toolkit();
