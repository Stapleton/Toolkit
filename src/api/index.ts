/**
 * /*
 * API Entry File
 *
 * @format
 */

// TODO: Create various API endpoints for internal and external tool usage

/***** Imports *****/
import Toolkit from "../../src/Toolkit";
import { Signale } from "signale";
import { Module } from "../../src/core/lib/Module";
import { IModConfig } from "../../src/core/lib/Module";

/***** Setup *****/
/**
 * /*
 * Core Entry Point
 *
 * @format
 */

/***** Interfaces *****/
interface TKApiConfig extends IModConfig {}

/***** Setup *****/
export const Logger = new Signale({ scope: "Api" });

Logger.start("Initializing");

/***** Setup TKCore Servers *****/
class TKApi extends Module {
	private static INSTANCE: TKApi;
	private readonly Logger = Toolkit.Logger.Core.scope("Core.Net");
	private readonly Config = <TKApiConfig>this._config.getConfig();

	private constructor() {
		super("Toolkit API", "tk-api", "0.0.1", "lib", ["toolkit"]);
		this.Logger.start("Initializing");
	}

	public static getInstance() {
		if (!this.INSTANCE) this.INSTANCE = new TKApi();
		return this.INSTANCE;
	}
}

TKApi.getInstance();
