/** @format */

import { join } from "path";
import { parse } from "toml";
import { Signale } from "signale";
import { EventEmitter } from "node:events";
import { existsSync, PathLike, readFileSync, writeFileSync } from "fs";

export var __TKModules: Map<IModule.ModID, Module> = new Map();
export var __TKConfigs: Map<IModule.ModID, ModConfig> = new Map();

export namespace IModule {
	export type ModName = string;
	export type ModID = string;
	export type ModVersion = string;
	export type ModType = "lib" | "mod";
	export type ModRequires = "none" | Array<string>;
}

export interface IModConfig {
	name: IModule.ModName;
	id: IModule.ModID;
	version: IModule.ModVersion;
	type: IModule.ModType;
	requires: IModule.ModRequires;
	disabled: boolean;
}

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

export class Module extends EventEmitter {
	protected _name: IModule.ModName;
	protected id: IModule.ModID;
	protected version: IModule.ModVersion;
	protected type: IModule.ModType;
	protected requires: IModule.ModRequires;
	protected _config: ModConfig;

	constructor(
		name: IModule.ModName,
		id: IModule.ModID,
		version: IModule.ModVersion,
		type: IModule.ModType = "mod",
		requires: IModule.ModRequires = "none"
	) {
		super();
		this._name = name;
		this.id = id;
		this.version = version;
		this.type = type;
		this.requires = requires;
		this._config = new ModConfig(this);

		if (this._config.notInit(id)) this._config.init(name, id, version);
		if (this._config.getConfig().disabled) this.disabledMod(5);

		__TKModules.set(this.id, this);
	}

	protected disabledMod(exitcode: number) {
		Logger.disabled(`${this._name} is disabled.`);
		process.exit(exitcode);
	}

	public getName(): IModule.ModName {
		return this._name;
	}

	public getID(): IModule.ModID {
		return this.id;
	}

	public getVersion(): IModule.ModVersion {
		return this.version;
	}

	public getType(): IModule.ModType {
		return this.type;
	}

	public getRequires(): IModule.ModRequires {
		return this.requires;
	}
}

// TODO: Compare config version with package version, update config version if older than package version
// TODO: Add config fields programmatically, this will then prevent needing to package a config with differences and will cause config options to be added as needed

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
