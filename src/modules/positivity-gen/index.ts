/** @format */

/***** Imports *****/
import Toolkit from "@Toolkit";
import Module from "@Core/lib/Module";
import { IModConfig } from "@Core/lib/ModConfig";
import { Info } from "@Mods/positivity-gen/positivity-gen.json";

/***** Interfaces *****/
interface PositivityGeneratorConfig extends IModConfig {}

/***** Setup *****/
let Logger = Toolkit.Logger.Mods.scope(`Mods/${Info.id}`); // Finish Logger Definition
Logger.start(`Initializing ${Info.name}
Module Version: ${Info.version}
Module ID: ${Info.id}`);

class PositivityGenerator extends Module {
	protected config = <PositivityGeneratorConfig>this._config.getConfig();

	constructor() {
		super(Info.name, Info.id, Info.version);
	}
}

new PositivityGenerator();
