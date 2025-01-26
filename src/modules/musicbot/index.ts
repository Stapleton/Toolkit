/**
 * Modules Entry File
 *
 * @format
 */

/***** Imports *****/
import Toolkit from "../../../src/Toolkit";
import { IModConfig, Module } from "../../../src/core/lib/Module";
import { Info } from "../../../src/modules/musicbot/musicbot.json";

/***** Interfaces *****/
interface MusicbotConfig extends IModConfig {}

/***** Setup *****/
let Logger = Toolkit.Logger.Mods.scope("Mods.Musicbot");
Logger.start(`Initializing ${Info.name}`);
Logger.info(`Module Version: ${Info.version}`);
Logger.info(`Module ID: ${Info.id}`);

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
