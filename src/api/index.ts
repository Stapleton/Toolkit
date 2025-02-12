/**
 * /*
 * API Entry File
 *
 * @format
 */

// TODO: Create various API endpoints for internal and external tool usage

/***** Imports *****/
import TK from "../index";
import { Module, IModConfig } from "../../src/core/lib/Module";

/***** Interfaces *****/
interface TKApiConfig extends IModConfig {}

/***** Setup TKApi *****/
class TKApi extends Module {
	private Toolkit: TK;

	private readonly Config = <TKApiConfig>this._config.getConfig();

	constructor(toolkit: TK) {
		super("Toolkit API", "tk-api", "0.0.1", "lib", ["toolkit"]);
		this.Toolkit = toolkit;
		this.Logger = toolkit.Logger.Api;
		this.Logger.start("Initializing");
	}
}

export default TKApi;
