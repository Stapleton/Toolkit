/** @format */

import { PathLike, readFileSync } from "fs";
import Toolkit from "../../Toolkit";
import { join } from "path";
import { parse } from "toml";

export interface AppConfig {
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

class Config {
	public Config: AppConfig;

	constructor(path: PathLike) {
		this.Config = this.parseConfig(this.readFile(path));
	}

	private readFile(path: PathLike): string {
		return readFileSync(path, "utf8");
	}

	private parseConfig(config: string): AppConfig {
		return parse(config);
	}
}

let Conf = new Config(join(Toolkit.Paths.Config, "./stock-trader.toml"));

export default Conf.Config;
