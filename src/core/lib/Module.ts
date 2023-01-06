/** @format */

import ModConfig, { ModName, ModID, ModVersion, ModType, ModRequires } from "@Core/lib/ModConfig";
import { Signale } from "signale";
import EventEmitter from "events";

export var __TKModules: Map<ModID, Module> = new Map();

const Logger = new Signale({
	types: {
		disabled: {
			label: "Disabled",
			color: "grey",
			badge: "❌",
		},
	},
});

export default class Module extends EventEmitter {
	protected _name: ModName;
	protected id: ModID;
	protected version: ModVersion;
	protected type: ModType;
	protected requires: ModRequires;
	protected _config: ModConfig;

	constructor(name: ModName, id: ModID, version: ModVersion, type: ModType = "mod", requires: ModRequires = "none") {
		super();
		this._name = name;
		this.id = id;
		this.version = version;
		this.type = type;
		this.requires = requires;
		this._config = new ModConfig(this);

		if (this._config.notInit(id)) this._config.init(name, id, version);
		if (this._config.getConfig()._disabled) this.disabledMod(5);

		__TKModules.set(this.id, this);
	}

	protected disabledMod(exitcode: number) {
		Logger.disabled(`${this._name} is disabled.`);
		process.exit(exitcode);
	}

	public getName(): ModName {
		return this._name;
	}

	public getID(): ModID {
		return this.id;
	}

	public getVersion(): ModVersion {
		return this.version;
	}

	public getType(): ModType {
		return this.type;
	}

	public getRequires(): ModRequires {
		return this.requires;
	}
}
