/**
 * Modules Entry File
 *
 * @format
 */

/***** Imports *****/
import Toolkit from "../../../src/Toolkit";
import { Module, IModConfig } from "../../../src/core/lib/Module";
import { Info } from "../../../src/modules/chat-cleaner/chat-cleaner.json";

/***** Interfaces *****/
interface ChatCleanerConfig extends IModConfig {}

/***** Setup *****/
let Logger = Toolkit.Logger.Mods.scope("Mods.Chat Cleaner");
Logger.start(`Initializing ${Info.name}`);
Logger.info(`Module Version: ${Info.version}`);
Logger.info(`Module ID: ${Info.id}`);

class ChatCleaner extends Module {
	protected config = <ChatCleanerConfig>this._config.getConfig();

	constructor() {
		super(Info.name, Info.id, Info.version);

		Logger.disable();
		Logger.debug(this.config);
		Logger.enable();
	}
}

new ChatCleaner();
