/**
 * /*
 * Core Entry Point
 *
 * @format
 */

/***** Imports *****/
import { join } from "path";
import Toolkit from "../../src/Toolkit";
import { Signale } from "signale";
import { Module } from "../../src/core/lib/Module";
import { existsSync, writeFileSync } from "fs";
import UDPSocketServer from "../../src/core/net/UDPSocketServer";
import WebSocketServer from "../../src/core/net/WebSocketServer";
import { IModConfig } from "../../src/core/lib/Module";

/***** Interfaces *****/
interface CoreNetConfig extends IModConfig {
	UDPSS: {
		port: number;
		host: string;
	};
	WSS: {
		port: number;
		host: string;
	};
}

/***** Setup *****/
export const Logger = new Signale({ scope: "Core" });

Logger.start("Initializing");

/***** Check/Make Authentication Storage JSON *****/
function checkAuth() {
	let p = join(Toolkit.Paths.Config, "auth.json");

	function makeAuth() {
		writeFileSync(p, "{}", "utf-8");
		Logger.star(`Created new auth.json in config folder!`);
	}

	if (!existsSync(p)) makeAuth();
}

checkAuth();

/***** Setup CoreNet Servers *****/
class CoreNet extends Module {
	private static INSTANCE: CoreNet;
	private readonly Logger = Toolkit.Logger.Core.scope("Core.Net");
	private readonly Config = <CoreNetConfig>this._config.getConfig();

	private constructor() {
		super("Core.Net", "core.net", "0.0.1", "lib", ["toolkit"]);
		this.Logger.start("Initializing");

		this.startUDPSS();
		this.startWSS();
	}

	public static getInstance() {
		if (!this.INSTANCE) this.INSTANCE = new CoreNet();
		return this.INSTANCE;
	}

	private startUDPSS() {
		UDPSocketServer.getInstance(this.Config.UDPSS);
	}

	private startWSS() {
		WebSocketServer.getInstance(this.Config.WSS);
	}
}

CoreNet.getInstance();
