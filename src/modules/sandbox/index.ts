/**
 * Modules Entry File
 *
 * @format
 */

/***** Imports *****/
import { IModConfig } from "@Core/lib/ModConfig";
import { Module } from "@Core/lib/Module";
import { Info } from "@Mods/sandbox/sandbox.json";
import Toolkit from "@Toolkit";

/***** Interfaces *****/
interface SandboxConfig extends IModConfig {}

/***** Setup *****/
let Logger = Toolkit.Logger.Mods.scope("Mod/Sandbox");
Logger.start("Initializing");

class Sandbox extends Module {
	protected config = <SandboxConfig>this._config.getConfig();

	constructor() {
		super(Info.name, Info.id, Info.version);

		Logger.disable();
		Logger.debug(this.config);
		Logger.enable();
	}
}

new Sandbox();
