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
interface TKCoreConfig extends IModConfig {
	UDPSocketServer: {
		port: number;
		host: string;
	};
	WebSocketServer: {
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

/***** Setup TKCore Servers *****/
class TKCore extends Module {
	private static INSTANCE: TKCore;
	private readonly Logger = Toolkit.Logger.Core.scope("Core");
	private readonly Config = <TKCoreConfig>this._config.getConfig();

	private constructor() {
		super("Toolkit Core", "tk-core", "0.0.1", "lib", ["toolkit"]);
		this.Logger.start("Initializing");

		this.startUDPSocketServer();
		this.startWebSocketServer();
	}

	public static getInstance() {
		if (!this.INSTANCE) this.INSTANCE = new TKCore();
		return this.INSTANCE;
	}

	private startUDPSocketServer() {
		UDPSocketServer.getInstance(this.Config.UDPSocketServer);
	}

	private startWebSocketServer() {
		WebSocketServer.getInstance(this.Config.WebSocketServer);
	}
}

TKCore.getInstance();
