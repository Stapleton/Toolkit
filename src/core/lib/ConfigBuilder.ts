/**
 * Modules Entry File
 *
 * @format
 */

/***** Imports *****/
import Toolkit from "../..";
import { join } from "path";
import { parse } from "toml";
import { PathLike } from "fs";
import { Module } from "../../../src/core/lib/Module";

/***** Setup *****/
const Logger = Toolkit.Logger.Mods.scope("Core/ConfigBuilder");
Logger.start("Initializing");

export class ConfigBuilder {
	private RootDir: string = Toolkit.Paths.Config;
	private Original: string;
	private footer: string[];
	private version: string;
	private file: PathLike;
	private id: string;

	constructor(module: Module) {
		this.id = module.getID();
		this.version = module.getVersion();

		this.file = join(this.RootDir, `${this.id}.toml`);

		this.footer[0] = `# ANY EDITS PAST THIS LINE MAY NOT BE KEPT`;
		this.footer[1] = `Module/Config Version: ${this.version}`;
	}

	// ! GARBAGE BELOW //
	/*

	constructor(name: string, version: string) {
		let split = name.split("/");
		this.configName = name = split.pop();
		this.version = version;

		this.configDir = path.join(this.baseConfigDir, split.join("/"));
		this.contents = `module.exports = {\n${this.indent}__META: {\n${this.indent}${this.indent}version: '${this.version}',\n${this.indent}${this.indent}name: '${this.configName}'\n${this.indent}}`;
	}

	

	private writeConfig() {
		let name = path.join(this.configDir, this.configName);
		if (!fs.existsSync(this.configDir)) fs.mkdirSync(this.configDir, { recursive: true });
		if (!fs.existsSync(`${name}.js`)) fs.writeFileSync(`${name}.js`, this.contents, "utf8");
		this.configFile = require(path.join(this.configDir, this.configName));
		if (this.configFile.__META.version != this.version) {
			this.logger.note(
				`The config for ${
					this.configName
				} is out of date!\nPlease backup any changes you have made, and delete the config.\nThe latest version of the config will be regenerated on the next startup.\nLocation: ${path.join(
					__dirname,
					name
				)}`
			);
		}
	}

	public addOption(name: string, type: string[], comment?: string): void {
		if (name.includes("/")) {
			let loopIndent: string[] = [];
			let split = name.split("/");
			name = split.pop();

			while (split.length > 0) {
				if (!this.contents.endsWith(` {`) && !this.contents.endsWith(" "))
					this.contents = this.contents + `,\n`;
				loopIndent.push(this.indent);
				let item = split.shift();
				this.contents = this.contents + `\n${loopIndent.join("")}${item}: {`;
			}

			this.appendOption(loopIndent.join("") + this.indent, name, type, comment);

			while (loopIndent.length > 0) {
				this.contents = this.contents + `\n${loopIndent.join("")}}`;
				loopIndent.pop();
			}
		} else {
			this.appendOption(this.indent, name, type, comment);
		}
	}

	private appendOption(indent, name, type, comment) {
		if (!this.contents.endsWith(` {`) && !this.contents.endsWith(" "))
			this.contents = this.contents + `,\n${indent}`;
		this.contents =
			this.contents +
			`\n${indent}/**\n${indent} * @property {${type.join(" | ")}} ${name}\n${indent} * @default undefined`;
		if (comment) this.contents = this.contents + `\n${indent} * @description ${comment}\n${indent} * /`;
		this.contents = this.contents + `\n${indent}${name}: undefined`;
	}

	public close() {
		this.contents = this.contents + "\n}";
		this.writeConfig();
	}

	public getConfig() {
		return this.configFile;
	}*/
}
// TODO: Use json2toml for writing configs to file
