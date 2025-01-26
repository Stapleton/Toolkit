/**
 * Modules Entry File
 *
 * @format
 */

/***** Imports *****/
import { IModConfig } from "../../../src/core/lib/Module";
import { Module } from "../../../src/core/lib/Module";
import { Info } from "../../../src/modules/text-to-speech/text-to-speech.json";
import Toolkit from "../../../src/Toolkit";

/***** Interfaces *****/
interface TextToSpeechConfig extends IModConfig {}

/***** Setup *****/
let Logger = Toolkit.Logger.Mods.scope("Mods.Text to Speech");
Logger.start(`Initializing ${Info.name}`);
Logger.info(`Module Version: ${Info.version}`);
Logger.info(`Module ID: ${Info.id}`);

class TextToSpeech extends Module {
	protected config = <TextToSpeechConfig>this._config.getConfig();

	constructor() {
		super(Info.name, Info.id, Info.version);

		Logger.disable();
		Logger.debug(this.config);
		Logger.enable();
	}
}

new TextToSpeech();
