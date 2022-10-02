/**
 * Modules Entry File
 *
 * @format
 */

/***** Imports *****/
import { IModConfig } from "@Core/lib/ModConfig";
import Toolkit from "@Toolkit";
import { Info } from "@Mods/custom-rpc/custom-rpc.json";
import { Module } from "@Core/lib/Module";

/***** Interfaces *****/
interface CustomRPCConfig extends IModConfig {}

/***** Setup *****/
let Logger = Toolkit.Logger.Mods.scope("Mod/Custom RPC");
Logger.start("Initializing");

class CustomRPC extends Module {
	protected config = <CustomRPCConfig>this._config.getConfig();

	constructor() {
		super(Info.name, Info.id, Info.version);

		Logger.disable();
		Logger.debug(this.config);
		Logger.enable();
	}
}

new CustomRPC();
