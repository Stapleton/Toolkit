/**
 * /*
 * API Entry File
 *
 * @format
 */

// TODO: Create various API endpoints for internal and external tool usage

/***** Imports *****/
import Toolkit from "../../src/Toolkit";
import { Module, IModConfig } from "../../src/core/lib/Module";

/***** Interfaces *****/
interface TKApiConfig extends IModConfig {}

/***** Setup TKApi *****/
class TKApi extends Module {
	private static INSTANCE: TKApi;
	private readonly Logger = Toolkit.Logger.Api;
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
