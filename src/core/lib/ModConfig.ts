/** @format */

import { Signale } from "signale";

import { existsSync, PathLike, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, parse as parsePath } from "path";
import { parse } from "toml";
import { IModConfig, IModule, Module } from "./Module";
import { __TKConfigs, __TKModules } from "./Module";

const Logger = new Signale({
	types: {
		disabled: {
			label: "Disabled",
			color: "grey",
			badge: "❌",
		},
		create: {
			label: "Create",
			color: "yellow",
			badge: "✨",
		},
	},
});

export class ModConfig {
	private Config: IModConfig;
	private Path: PathLike;

	/**
	 * An array of ModuleIDs that gets updated at startup during scan/init of all modules
	 * Any Module found in the mods folder that doesnt have a matching Config
	 * will show up in this list and will automatically have a default config generated for it.
	 */
	private NotInit: IModule.ModID[] = [];

	constructor(mod: Module) {
		this.Path = join(process.cwd(), "config", `${mod.getID()}.toml`);

		//Toolkit.Logger.Core.debug(this.Path);

		if (existsSync(this.Path)) {
			this.setConfig(mod.getID());
		} else {
			Logger.create(`New Config for ${mod.getName()}`);
			this.makeConfig();
			this.NotInit.push(mod.getID());
		}
		//mod.getName(), mod.getID(), mod.getVersion(), mod.getType(), mod.getRequires()

		//this.Config = this.parseConfig(this.readFile(path));
	}

	private makeConfig() {
		try {
			mkdirSync(parsePath(this.Path.toString()).dir, { recursive: true });
		} catch (e) {
			if (e.code != "EEXIST") Logger.error(`Failed to create config directory.\n${e.message}`);
		} finally {
			return writeFileSync(this.Path, "", "utf8");
		}
	}

	private readFile(path: PathLike): string {
		return readFileSync(path, "utf8");
	}

	private parseConfig(text: string): IModConfig {
		let config = parse(text);
		return {
			...config,
		};
	}

	private setConfig(id: IModule.ModID) {
		let data = this.readFile(this.Path);
		this.Config = this.parseConfig(data);
		__TKConfigs.set(id, this);
	}

	public getConfig() {
		return this.Config;
	}

	public notInit(id: IModule.ModID) {
		return this.NotInit.includes(id);
	}

	public init(
		name: IModule.ModName,
		id: IModule.ModID,
		version: IModule.ModVersion = "0.0.0",
		type: IModule.ModType = "mod",
		requires: IModule.ModRequires = "none"
	) {
		let data = `[module]
name = "${name}"
id = "${id}"
version = "${version}"
type = "${type}"
requires = "${requires}"
disabled = false`;

		writeFileSync(this.Path, data, "utf8");

		let a = this.NotInit.indexOf(id);
		delete this.NotInit[a];
		this.setConfig(id);

		Logger.create(`Initialized Config for ${name}`);
	}
}

export default ModConfig;
