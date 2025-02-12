/** @format */

import logger from "./Logger";
import { EventEmitter } from "node:events";
import { ModConfig } from "../lib/ModConfig";

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
	module: {
		name: IModule.ModName;
		id: IModule.ModID;
		version: IModule.ModVersion;
		type: IModule.ModType;
		requires: IModule.ModRequires;
		disabled: boolean;
	};
}

export class Module extends EventEmitter {
	protected _name: IModule.ModName;
	protected id: IModule.ModID;
	protected version: IModule.ModVersion;
	protected type: IModule.ModType;
	protected requires: IModule.ModRequires;
	protected _config: ModConfig;

	public Logger: typeof logger["Global"] = logger.Global.scope("Toolkit.Lib.Module");

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

		if (this._config.notInit(id)) this._config.init(name, id, version, type, requires);
		if (this._config.getConfig().module.disabled) this.disabledMod(5);

		__TKModules.set(this.id, this);
	}

	protected disabledMod(exitcode: number) {
		this.Logger.disabled(`${this._name} is disabled.`);
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
