/** @format */

/***** Imports *****/
import { meta } from "./tk-module.json";
import { IModConfig, Module } from "../../../src/core/lib/Module";

/***** Interfaces *****/
interface PositivityGeneratorConfig extends IModConfig {}

/***** Setup *****/
class PositivityGenerator extends Module {
	protected config = <PositivityGeneratorConfig>this._config.getConfig();
	private logger = this.Logger.scope(`Mods.${meta.id}`);

	constructor() {
		super(meta.name, meta.id, meta.version);

		this.logger.start(`Initializing ${meta.name}`);
		this.logger.info(`Module Version: ${meta.version}`);
		this.logger.info(`Module ID: ${meta.id}`);
	}
}

new PositivityGenerator();
