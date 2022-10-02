/**
 * Modules Entry File
 *
 * @format
 */

/***** Imports *****/
import { IModConfig } from "@Core/lib/ModConfig";
import { Module } from "@Core/lib/Module";
import { Info } from "@Mods/role-manager/role-manager.json";
import Toolkit from "@Toolkit";

/***** Interfaces *****/
interface RoleManagerConfig extends IModConfig {}

/***** Setup *****/
let Logger = Toolkit.Logger.Mods.scope("Mod/Role Manager");
Logger.start("Initializing");

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
