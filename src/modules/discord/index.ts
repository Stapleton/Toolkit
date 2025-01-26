/**
 * Modules Entry File
 *
 * @format
 */

/***** Imports *****/
import Toolkit from "../../../src/Toolkit";
import { IModConfig, Module } from "../../../src/core/lib/Module";
import { Info } from "../../../src/modules/discord/discord.json";

/***** Interfaces *****/
interface DiscordConfig extends IModConfig {}

/***** Setup *****/
let Logger = Toolkit.Logger.Mods.scope("Mods.Discord");
Logger.start(`Initializing ${Info.name}
Module Version: ${Info.version}
Module ID: ${Info.id}`);

class Discord extends Module {
	protected config = <DiscordConfig>this._config.getConfig();

	constructor() {
		super(Info.name, Info.id, Info.version);

		Logger.disable();
		Logger.debug(this.config);
		Logger.enable();
	}
}

new Discord();
