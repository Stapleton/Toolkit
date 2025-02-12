/**
 * Modules Entry File
 *
 * @format
 */

/***** Imports *****/
import { meta } from "./tk-module.json";
import DiscordCommandManager from "./DiscordCommandManager";
//import TwitchCommandManager from "./TwitchCommandManager";
import { IModConfig, Module } from "../../../src/core/lib/Module";

/***** Interfaces *****/
interface CommandManagerConfig extends IModConfig {}

/***** Setup *****/
class CommandManager extends Module {
	protected config = <CommandManagerConfig>this._config.getConfig();
	private logger = this.Logger.scope("Mods.CommandManager");

	constructor() {
		super(meta.name, meta.id, meta.version);

		this.logger.start(`Initializing ${meta.name}`);
		this.logger.info(`Module Version: ${meta.version}`);
		this.logger.info(`Module ID: ${meta.id}`);

		this.logger.disable();
		this.logger.debug(this.config);
		this.logger.enable();

		new DiscordCommandManager();
		//new TwitchCommandManager();
	}
}

new CommandManager();
