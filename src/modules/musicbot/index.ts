/**
 * Modules Entry File
 *
 * @format
 */

/***** Imports *****/
import { IModConfig } from "@Core/lib/ModConfig";
import { Module } from "@Core/lib/Module";
import { Info } from "@Mods/musicbot/musicbot.json";
import Toolkit from "@Toolkit";

/***** Interfaces *****/
interface MusicbotConfig extends IModConfig {}

/***** Setup *****/
let Logger = Toolkit.Logger.Mods.scope("Mod/Musicbot");
Logger.start("Initializing");

class Musicbot extends Module {
	protected config = <MusicbotConfig>this._config.getConfig();

	constructor() {
		super(Info.name, Info.id, Info.version);

		Logger.disable();
		Logger.debug(this.config);
		Logger.enable();
	}
}

new Musicbot();
