/**
 * Modules Entry File
 *
 * @format
 */

/***** Imports *****/
import { meta } from "./tk-module.json";
import { Module, IModConfig } from "../../../src/core/lib/Module";

/***** Interfaces *****/
interface TextToSpeechConfig extends IModConfig {}

/***** Setup *****/
class TextToSpeech extends Module {
	protected config = <TextToSpeechConfig>this._config.getConfig();
	private logger = this.Logger.scope("Mods.TextToSpeech");

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

new TextToSpeech();
