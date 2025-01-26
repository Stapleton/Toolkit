/**
 * Modules Entry File
 *
 * @format
 */

/***** Imports *****/
import Toolkit from "../../../src/Toolkit";
import { IModConfig, Module } from "../../../src/core/lib/Module";
import { Info } from "../../../src/modules/role-manager/role-manager.json";

/***** Interfaces *****/
interface RoleManagerConfig extends IModConfig {}

/***** Setup *****/
let Logger = Toolkit.Logger.Mods.scope("Mods.Role Manager");
Logger.start(`Initializing ${Info.name}`);
Logger.info(`Module Version: ${Info.version}`);
Logger.info(`Module ID: ${Info.id}`);

class RoleManager extends Module {
	protected config = <RoleManagerConfig>this._config.getConfig();

	constructor() {
		super(Info.name, Info.id, Info.version, "mod", ["discord"]);

		Logger.disable();
		Logger.debug(this.config);
		Logger.enable();
	}
}

new RoleManager();
