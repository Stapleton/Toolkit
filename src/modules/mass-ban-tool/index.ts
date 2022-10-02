/**
 * Modules Entry File
 *
 * @format
 */

/***** Imports *****/
import { IModConfig } from "@Core/lib/ModConfig";
import { Info } from "@Mods/mass-ban-tool/mass-ban-tool.json";
import { Module } from "@Core/lib/Module";
import Toolkit from "@Toolkit";

/***** Interfaces *****/
interface MassBanToolConfig extends IModConfig {}

/***** Setup *****/
let Logger = Toolkit.Logger.Mods.scope("Mod/Mass Ban Tool");
Logger.start("Initializing");

class MassBanTool extends Module {
	protected config = <MassBanToolConfig>this._config.getConfig();

	constructor() {
		super(Info.name, Info.id, Info.version);

		Logger.disable();
		Logger.debug(this.config);
		Logger.enable();
	}
}

new MassBanTool();
