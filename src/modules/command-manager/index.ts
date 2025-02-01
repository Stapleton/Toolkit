/**
 * Modules Entry File
 *
 * @format
 */

/***** Imports *****/
import Toolkit from "../../../src/Toolkit";
import { IModConfig, Module } from "../../../src/core/lib/Module";
import { meta } from "./tk-module.json";
import DiscordCommandManager from "./DiscordCommandManager";
//import TwitchCommandManager from "./TwitchCommandManager";

/***** Interfaces *****/
interface CommandManagerConfig extends IModConfig {}

/***** Setup *****/
let Logger = Toolkit.Logger.Mods.scope("Mods.Command Manager");
Logger.start(`Initializing ${meta.name}`);
Logger.info(`Module Version: ${meta.version}`);
Logger.info(`Module ID: ${meta.id}`);

class CommandManager extends Module {
	protected config = <CommandManagerConfig>this._config.getConfig();

	constructor() {
		super(meta.name, meta.id, meta.version);

		Logger.disable();
		Logger.debug(this.config);
		Logger.enable();

		new DiscordCommandManager();
		//new TwitchCommandManager();
	}
}

new CommandManager();
