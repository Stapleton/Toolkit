/**
 * Modules Entry File
 *
 * @format
 */

/***** Imports *****/
import { IModConfig } from "@Core/lib/ModConfig";
import Module from "@Core/lib/Module";
import { Info } from "@Mods/text-to-speech/text-to-speech.json";
import Toolkit from "@Toolkit";

/***** Interfaces *****/
interface TextToSpeechConfig extends IModConfig {}

/***** Setup *****/
let Logger = Toolkit.Logger.Mods.scope("Mods.Text to Speech");
Logger.start(`Initializing ${Info.name}
Module Version: ${Info.version}
Module ID: ${Info.id}`);

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
