/**
 * Modules Entry File
 *
 * @format
 */

/***** Imports *****/
import Toolkit from "../../../src/Toolkit";
import { IModConfig, Module } from "../../../src/core/lib/Module";
import { Info } from "../../../src/modules/command-manager/command-manager.json";

/***** Interfaces *****/
interface CommandManagerConfig extends IModConfig {}

/***** Setup *****/
let Logger = Toolkit.Logger.Mods.scope("Mods.Command Manager");
Logger.start(`Initializing ${Info.name}
Module Version: ${Info.version}
Module ID: ${Info.id}`);

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
