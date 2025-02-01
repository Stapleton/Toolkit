/** @format */

/***** Imports *****/
import Toolkit from "../../../src/Toolkit";
import { IModConfig, Module } from "../../../src/core/lib/Module";
import { meta } from "./tk-module.json";

/***** Interfaces *****/
interface PositivityGeneratorConfig extends IModConfig {}

/***** Setup *****/
let Logger = Toolkit.Logger.Mods.scope(`Mods.${meta.id}`); // Finish Logger Definition
Logger.start(`Initializing ${meta.name}`);
Logger.info(`Module Version: ${meta.version}`);
Logger.info(`Module ID: ${meta.id}`);

class PositivityGenerator extends Module {
	protected config = <PositivityGeneratorConfig>this._config.getConfig();

	constructor() {
		super(meta.name, meta.id, meta.version);
	}
}

new PositivityGenerator();
