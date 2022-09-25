/**
 * Modules Entry File
 *
 * @format
 */

/***** Imports *****/
import Module, { ModConfig } from "@Core/lib/Module";
import { Spawner } from "@Mods/stock-trader/Spawner";
import Toolkit from "@Toolkit";
import { readFileSync } from "fs";
import * as toml from "toml";

/***** Interfaces *****/
interface StockTraderConfig extends ModConfig {
	Spawner: {
		limit: number;
	};
	Puppet: {
		headless: boolean;
		initLink: string;

		View: {
			width: number;
			height: number;
		};
	};
}

/***** Setup *****/
const Config: StockTraderConfig = toml.parse(readFileSync(`${Toolkit.Paths.Config}\\stock-trader.toml`, "utf8"));
const Logger = Toolkit.Logger.Mods.scope("Mod/Stock Trader");
Logger.start("Initializing");

class StockTrader extends Module {
	constructor() {
		super(Config.name, Config.id, Config.version, Config.type, Config.requires);

		Logger.pending(`Spawning Puppets...`);

		try {
			new Spawner(Config.Spawner.limit);
		} catch (error) {
			Logger.fatal(error);
		}
	}
}

new StockTrader();
