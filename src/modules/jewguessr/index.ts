/**
 * Modules Entry File
 *
 * @format
 */

/***** Imports *****/
import { meta } from "./tk-module.json";
import { Module, IModConfig } from "../../../src/core/lib/Module";

/***** Interfaces *****/
interface JewguessrConfig extends IModConfig {}

/***** Setup *****/
class Jewguessr extends Module {
	protected config = <JewguessrConfig>this._config.getConfig();
	private logger = this.Logger.scope("Mods.Jewguessr");

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

new Jewguessr();
