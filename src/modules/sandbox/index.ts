/** @format */

/***** Imports *****/
import Toolkit from "@Toolkit";
import Module from "@Core/lib/Module";
import { IModConfig } from "@Core/lib/ModConfig";
import { Info } from "@Mods/sandbox/sandbox.json";

/***** Interfaces *****/
interface SandboxConfig extends IModConfig {}

/***** Setup *****/
let Logger = Toolkit.Logger.Mods.scope("Mods.Sandbox");
Logger.start(`Initializing ${Info.name}
Module Version: ${Info.version}
Module ID: ${Info.id}`);

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
