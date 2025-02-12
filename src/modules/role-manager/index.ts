/**
 * Modules Entry File
 *
 * @format
 */

/***** Imports *****/
import { meta } from "./tk-module.json";
import { IModConfig, Module } from "../../../src/core/lib/Module";

/***** Interfaces *****/
interface RoleManagerConfig extends IModConfig {}

/***** Setup *****/
class RoleManager extends Module {
	protected config = <RoleManagerConfig>this._config.getConfig();
	private logger = this.Logger.scope("Mods.RoleManager");

	constructor() {
		super(meta.name, meta.id, meta.version, "mod", ["discord"]);

		this.logger.start(`Initializing ${meta.name}`);
		this.logger.info(`Module Version: ${meta.version}`);
		this.logger.info(`Module ID: ${meta.id}`);

		this.logger.disable();
		this.logger.debug(this.config);
		this.logger.enable();
	}
}

new RoleManager();
