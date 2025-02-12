/**
 * Modules Entry File
 *
 * @format
 */

/***** Imports *****/
import { meta } from "./tk-module.json";
import { IModConfig, Module } from "../../../src/core/lib/Module";

/***** Interfaces *****/
interface ExampleModConfig extends IModConfig {}

/***** Setup *****/
class ExampleMod extends Module {
	protected config = <ExampleModConfig>this._config.getConfig();
	private logger = this.Logger.scope("Mods.Example Mod");

	constructor() {
		super(meta.name, meta.id, meta.version);

		this.logger.start(`Initializing ${meta.name}`);
		this.logger.info(`Module Version: ${meta.version}`);
		this.logger.info(`Module ID: ${meta.id}`);

		this.logger.disable();
		this.logger.debug(this.config);
		this.logger.enable();
	}
}

new ExampleMod();
