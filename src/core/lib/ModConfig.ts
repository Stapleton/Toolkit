/** @format */

import { join } from "path";
import { parse } from "toml";
import { Signale } from "signale";
import Module from "@Core/lib/Module";
import { existsSync, PathLike, readFileSync, writeFileSync } from "fs";

export var __TKConfigs: Map<ModID, ModConfig> = new Map();

export type ModName = string;
export type ModID = string;
export type ModVersion = string;
export type ModType = "lib" | "mod";
export type ModRequires = "none" | Array<ModID>;

export interface IModConfig {
	_name: ModName;
	_id: ModID;
	_version: ModVersion;
	_type: ModType;
	_requires: ModRequires;
	_disabled: boolean;
}

// TODO: Compare config version with package version, update config version if older than package version
// TODO: Add config fields programmatically, this will then prevent needing to package a config with differences and will cause config options to be added as needed

const Logger = new Signale({
	types: {
		create: {
			label: "Create",
			color: "yellow",
			badge: "✨",
		},
	},
});

export default class ModConfig {
	private Config: IModConfig;
	private Path: PathLike;

	/**
	 * An array of ModuleIDs that gets updated at startup during scan/init of all modules
	 * Any Module found in the mods folder that doesnt have a matching Config
	 * will show up in this list and will automatically have a default config generated for it.
	 */
	private NotInit: ModID[] = [];

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
		return writeFileSync(this.Path, "", "utf8");
	}

	private readFile(path: PathLike): string {
		return readFileSync(path, "utf8");
	}

	private parseConfig(text: string): IModConfig {
		let config = parse(text);
		return {
			_name: config.name,
			_id: config.id,
			_version: config.version,
			_type: config.type,
			_requires: config.requires,
			_disabled: config.disabled,
			...config,
		};
	}

	private setConfig(id: ModID) {
		let data = this.readFile(this.Path);
		this.Config = this.parseConfig(data);
		__TKConfigs.set(id, this);
	}

	public getConfig() {
		return this.Config;
	}

	public notInit(id: ModID) {
		return this.NotInit.includes(id);
	}

	public init(
		name: ModName,
		id: ModID,
		version: ModVersion = "0.0.0",
		type: ModType = "mod",
		requires: ModRequires = "none"
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
