/** @format */

/***** Imports *****/
import Toolkit from "../../../src/Toolkit";
import { IModConfig, Module } from "../../../src/core/lib/Module";
import { meta } from "./tk-module.json";

/***** Interfaces *****/
interface SandboxConfig extends IModConfig {}

/***** Setup *****/
let Logger = Toolkit.Logger.Mods.scope("Mods.Sandbox");
Logger.start(`Initializing ${meta.name}`);
Logger.info(`Module Version: ${meta.version}`);
Logger.info(`Module ID: ${meta.id}`);

class Sandbox extends Module {
	protected config = <SandboxConfig>this._config.getConfig();

	constructor() {
		super(meta.name, meta.id, meta.version);

		Logger.disable();
		Logger.debug(this.config);
		Logger.enable();
	}
}

new Sandbox();
