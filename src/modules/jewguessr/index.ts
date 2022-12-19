/**
 * Modules Entry File
 *
 * @format
 */

/***** Imports *****/
import Toolkit from "@Toolkit";
import Module from "@Core/lib/Module";
import { IModConfig } from "@Core/lib/ModConfig";
import { Info } from "@Mods/jewguessr/jewguessr.json";

/***** Interfaces *****/
interface JewguessrConfig extends IModConfig {}

/***** Setup *****/
let Logger = Toolkit.Logger.Mods.scope("Mods.Jewguessr");
Logger.start(`Initializing ${Info.name}
Module Version: ${Info.version}
Module ID: ${Info.id}`);

class Jewguessr extends Module {
	protected config = <JewguessrConfig>this._config.getConfig();

	constructor() {
		super(Info.name, Info.id, Info.version);

		Logger.disable();
		Logger.debug(this.config);
		Logger.enable();
	}
}

new Jewguessr();
