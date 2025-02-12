/**
 * Modules Entry File
 *
 * @format
 */

/***** Imports *****/
import Client from "./Client";
import { meta } from "./tk-module.json";
import { IModConfig, Module } from "../../../src/core/lib/Module";

/***** Interfaces *****/
interface DiscordConfig extends IModConfig {}

/***** Setup *****/
class Discord extends Module {
	protected config = <DiscordConfig>this._config.getConfig();
	private logger = this.Logger.scope("Mods.Discord");

	constructor() {
		super(meta.name, meta.id, meta.version, "lib", "none");

		this.logger.start(`Initializing ${meta.name}`);
		this.logger.info(`Module Version: ${meta.version}`);
		this.logger.info(`Module ID: ${meta.id}`);

		this.logger.disable();
		this.logger.debug(this.config);
		this.logger.enable();

		Client.getInstance();
	}
}

new Discord();
