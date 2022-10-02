/** @format */

import { existsSync, PathLike, readFileSync, writeFileSync } from "fs";
import { parse } from "toml";
import { Module } from "@Core/lib/Module";
import Toolkit from "@Toolkit";
import { join } from "path";

export type ModName = string;
export type ModID = string;
export type ModVersion = string;
export type ModType = "lib" | "mod";
export type ModRequires = "none" | Array<ModID>;

export interface IModConfig {
	name: ModName;
	id: ModID;
	version: ModVersion;
	type: ModType;
	requires: ModRequires;
	disabled: boolean;
}

// ? Change this config system to my old ConfigBuilder
// ? https://github.com/Stapleton/Bot-Archive/blob/master/Alloybot-Core-Dec2018/lib/ConfigBuilder.ts

export default class ModConfig {
	private Config: IModConfig;
	private Path: PathLike;
	private NotInit: ModID[] = [];

	constructor(mod: Module) {
		this.Path = join(Toolkit.Paths.Config, `${mod.getID()}.toml`);

		//Toolkit.Logger.Core.debug(this.Path);

		if (existsSync(this.Path)) {
			this.setConfig(mod.getID());
		} else {
			Toolkit.Logger.Core.star(`Created Config for ${mod.getName()}`);
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
		return parse(text);
	}

	private setConfig(id: ModID) {
		let data = this.readFile(this.Path);
		this.Config = this.parseConfig(data);
		Toolkit.Configs.set(id, this);
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
		let data = `name = "${name}"
id = "${id}"
version = "${version}"
type = "${type}"
requires = "${requires}"
disabled = false`;

		writeFileSync(this.Path, data, "utf8");

		let a = this.NotInit.indexOf(id);
		delete this.NotInit[a];
		this.setConfig(id);

		Toolkit.Logger.Core.star(`Initialized Config for ${name}`);
	}
}
