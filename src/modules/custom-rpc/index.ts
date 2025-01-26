/**
 * Modules Entry File
 *
 * @format
 */

/***** Imports *****/
import Toolkit from "../../../src/Toolkit";
import { IModConfig, Module } from "../../../src/core/lib/Module";
import { Info } from "../../../src/modules/custom-rpc/custom-rpc.json";

/***** Interfaces *****/
interface CustomRPCConfig extends IModConfig {}

/***** Setup *****/
let Logger = Toolkit.Logger.Mods.scope("Mods.Custom RPC");
Logger.start(`Initializing ${Info.name}`);
Logger.info(`Module Version: ${Info.version}`);
Logger.info(`Module ID: ${Info.id}`);

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
