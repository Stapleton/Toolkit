/**
 * Modules Entry File
 *
 * @format
 */

/***** Imports *****/
import Toolkit from "../../../src/Toolkit";
import { IModConfig, Module } from "../../../src/core/lib/Module";
import { meta } from "./tk-module.json";

/***** Interfaces *****/
interface RoleManagerConfig extends IModConfig {}

/***** Setup *****/
let Logger = Toolkit.Logger.Mods.scope("Mods.Role Manager");
Logger.start(`Initializing ${meta.name}`);
Logger.info(`Module Version: ${meta.version}`);
Logger.info(`Module ID: ${meta.id}`);

class RoleManager extends Module {
	protected config = <RoleManagerConfig>this._config.getConfig();

	constructor() {
		super(meta.name, meta.id, meta.version, "mod", ["discord"]);

		Logger.disable();
		Logger.debug(this.config);
		Logger.enable();
	}
}

new RoleManager();
