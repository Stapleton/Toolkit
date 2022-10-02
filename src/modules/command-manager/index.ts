/**
 * Modules Entry File
 *
 * @format
 */

/***** Imports *****/
import { IModConfig } from "@Core/lib/ModConfig";
import { Module } from "@Core/lib/Module";
import { Info } from "@Mods/command-manager/command-manager.json";
import Toolkit from "@Toolkit";

/***** Interfaces *****/
interface CommandManagerConfig extends IModConfig {}

/***** Setup *****/
let Logger = Toolkit.Logger.Mods.scope("Mod/Command Manager");
Logger.start("Initializing");

class CommandManager extends Module {
	protected config = <CommandManagerConfig>this._config.getConfig();

	constructor() {
		super(Info.name, Info.id, Info.version);

		Logger.disable();
		Logger.debug(this.config);
		Logger.enable();
	}
}

new CommandManager();
