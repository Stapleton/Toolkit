/** @format */

/***** Imports *****/
import Toolkit from "../../../src/Toolkit";
import { IModConfig, Module } from "../../../src/core/lib/Module";
import { Info } from "../../../src/modules/sandbox/sandbox.json";

/***** Interfaces *****/
interface SandboxConfig extends IModConfig {}

/***** Setup *****/
let Logger = Toolkit.Logger.Mods.scope("Mods.Sandbox");
Logger.start(`Initializing ${Info.name}`);
Logger.info(`Module Version: ${Info.version}`);
Logger.info(`Module ID: ${Info.id}`);

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
