/**
 * Modules Entry File
 *
 * @format
 */

/***** Imports *****/
import { IModConfig } from "@Core/lib/ModConfig";
import { Module } from "@Core/lib/Module";
import { Info } from "@Mods/jewguessr/jewguessr.json";
import Toolkit from "@Toolkit";

/***** Interfaces *****/
interface JewguessrConfig extends IModConfig {}

/***** Setup *****/
let Logger = Toolkit.Logger.Mods.scope("Mod/Jewguessr");
Logger.start("Initializing");

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
