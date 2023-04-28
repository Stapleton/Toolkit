/**
 * Modules Entry File
 *
 * @format
 */

/***** Imports *****/
import Toolkit from "@Toolkit";
import { IModConfig, Module } from "@Core/lib/Module";
import { Info } from "@Mods/examplemod/examplemod.json";

/***** Interfaces *****/
interface ExampleModConfig extends IModConfig {}

/***** Setup *****/
let Logger = Toolkit.Logger.Mods.scope("Mods.Chat Cleaner");
Logger.start(`Initializing ${Info.name}
Module Version: ${Info.version}
Module ID: ${Info.id}`);

class ExampleMod extends Module {
	protected config = <ExampleModConfig>this._config.getConfig();

	constructor() {
		super(Info.name, Info.id, Info.version);

		Logger.disable();
		Logger.debug(this.config);
		Logger.enable();
	}
}

new ExampleMod();
