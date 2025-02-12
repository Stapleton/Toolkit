/**
 * /*
 * Core Entry Point
 *
 * @format
 */

/***** Imports *****/
import TK from "..";
import { Module, IModConfig } from "../../src/core/lib/Module";
import UDPSocketServer, { UDPSocketServerConfig } from "../../src/core/net/UDPSocketServer";
import WebSocketServer, { WebSocketServerConfig } from "../../src/core/net/WebSocketServer";

/***** Interfaces *****/
interface TKCoreConfig extends IModConfig {
	UDPSocketServer: UDPSocketServerConfig;
	WebSocketServer: WebSocketServerConfig;
}

/***** Setup TKCore Servers *****/
class TKCore extends Module {
	public Toolkit: TK;

	private readonly Config = <TKCoreConfig>this._config.getConfig();

	constructor(toolkit: TK) {
		super("Toolkit Core", "tk-core", "0.0.1", "lib", ["toolkit"]);
		this.Toolkit = toolkit;
		this.Logger = toolkit.Logger.Core;
		this.Logger.start("Initializing");

		if (!this.Config.UDPSocketServer.disabled) this.startUDPSocketServer();
		if (!this.Config.WebSocketServer.disabled) this.startWebSocketServer();
	}

	private startUDPSocketServer() {
		UDPSocketServer.getInstance(this.Config.UDPSocketServer, this);
	}

	private startWebSocketServer() {
		WebSocketServer.getInstance(this.Config.WebSocketServer, this);
	}
}

export default TKCore;
