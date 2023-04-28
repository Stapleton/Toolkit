/**
 * Modules Entry File
 *
 * @format
 */

/***** Imports *****/
import Toolkit from "@Toolkit";
import { Module, IModConfig } from "@Core/lib/Module";
import { Info } from "@Mods/chat-cleaner/chat-cleaner.json";

/***** Interfaces *****/
interface ChatCleanerConfig extends IModConfig {}

/***** Setup *****/
let Logger = Toolkit.Logger.Mods.scope("Mods.Chat Cleaner");
Logger.start(`Initializing ${Info.name}
Module Version: ${Info.version}
Module ID: ${Info.id}`);

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
