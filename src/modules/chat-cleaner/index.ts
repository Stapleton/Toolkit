/**
 * Modules Entry File
 *
 * @format
 */

/***** Imports *****/
import { IModConfig } from "@Core/lib/ModConfig";
import { Module } from "@Core/lib/Module";
import { Info } from "@Mods/chat-cleaner/chat-cleaner.json";
import Toolkit from "@Toolkit";

/***** Interfaces *****/
interface ChatCleanerConfig extends IModConfig {}

/***** Setup *****/
let Logger = Toolkit.Logger.Mods.scope("Mod/Chat Cleaner");
Logger.start("Initializing");

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
