/** @format */

/***** Imports *****/
import Toolkit from "../../../src/Toolkit";
import { IModConfig, Module } from "../../../src/core/lib/Module";
import { Info } from "../../../src/modules/positivity-gen/positivity-gen.json";

/***** Interfaces *****/
interface PositivityGeneratorConfig extends IModConfig {}

/***** Setup *****/
let Logger = Toolkit.Logger.Mods.scope(`Mods.${Info.id}`); // Finish Logger Definition
Logger.start(`Initializing ${Info.name}`);
Logger.info(`Module Version: ${Info.version}`);
Logger.info(`Module ID: ${Info.id}`);

class PositivityGenerator extends Module {
	protected config = <PositivityGeneratorConfig>this._config.getConfig();

	constructor() {
		super(Info.name, Info.id, Info.version);
	}
}

new PositivityGenerator();
