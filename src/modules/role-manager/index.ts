/**
 * Modules Entry File
 *
 * @format
 */

/***** Imports *****/
import Toolkit from "@Toolkit";
import Module from "@Core/lib/Module";
import { IModConfig } from "@Core/lib/ModConfig";
import { Info } from "@Mods/role-manager/role-manager.json";

/***** Interfaces *****/
interface RoleManagerConfig extends IModConfig {}

/***** Setup *****/
let Logger = Toolkit.Logger.Mods.scope("Mods.Role Manager");
Logger.start(`Initializing ${Info.name}
Module Version: ${Info.version}
Module ID: ${Info.id}`);

class RoleManager extends Module {
	protected config = <RoleManagerConfig>this._config.getConfig();

	constructor() {
		super(Info.name, Info.id, Info.version);

		Logger.disable();
		Logger.debug(this.config);
		Logger.enable();
	}
}

new RoleManager();
