/**
 * Modules Entry File
 *
 * @format
 */

/***** Imports *****/
import Toolkit from "../../../src/Toolkit";
import { Module, IModConfig } from "../../../src/core/lib/Module";
import { meta } from "./tk-module.json";
/***** Interfaces *****/
interface JewguessrConfig extends IModConfig {}

/***** Setup *****/
let Logger = Toolkit.Logger.Mods.scope("Mods.Jewguessr");
Logger.start(`Initializing ${meta.name}`);
Logger.info(`Module Version: ${meta.version}`);
Logger.info(`Module ID: ${meta.id}`);

class Jewguessr extends Module {
	protected config = <JewguessrConfig>this._config.getConfig();

	constructor() {
		super(meta.name, meta.id, meta.version);

		Logger.disable();
		Logger.debug(this.config);
		Logger.enable();
	}
}

new Jewguessr();
