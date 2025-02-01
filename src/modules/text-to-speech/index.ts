/**
 * Modules Entry File
 *
 * @format
 */

/***** Imports *****/
import { IModConfig } from "../../../src/core/lib/Module";
import { Module } from "../../../src/core/lib/Module";
import { meta } from "./tk-module.json";
import Toolkit from "../../../src/Toolkit";

/***** Interfaces *****/
interface TextToSpeechConfig extends IModConfig {}

/***** Setup *****/
let Logger = Toolkit.Logger.Mods.scope("Mods.Text to Speech");
Logger.start(`Initializing ${meta.name}`);
Logger.info(`Module Version: ${meta.version}`);
Logger.info(`Module ID: ${meta.id}`);

class TextToSpeech extends Module {
	protected config = <TextToSpeechConfig>this._config.getConfig();

	constructor() {
		super(meta.name, meta.id, meta.version);

		Logger.disable();
		Logger.debug(this.config);
		Logger.enable();
	}
}

new TextToSpeech();
