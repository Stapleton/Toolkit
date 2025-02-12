/** @format */

import { join } from "path";
import Logger from "./core/lib/Logger";
import { existsSync, writeFileSync } from "fs";
import { __TKConfigs } from "./core/lib/Module";
import { ChildProcess, exec } from "child_process";

import TKApi from "./api";
import TKCore from "./core";
import TKModules from "./modules";

export type ToolkitDomain = "api" | "app" | "core" | "module";

/***** Setup Toolkit *****/
class Toolkit {
	private static INSTANCE: Toolkit;

	public Modules = __TKConfigs;
	public Configs = __TKConfigs;

	public TKApi: TKApi;
	public TKApp: ChildProcess;
	public TKCore: TKCore;
	public TKModules: TKModules;

	public Paths = {
		Config: `${process.cwd()}\\config`,
		Api: `${process.cwd()}\\src\\api`,
		App: `${process.cwd()}\\src\\app`,
		Core: `${process.cwd()}\\src\\core`,
		Mods: `${process.cwd()}\\src\\modules`,
	};

	public Logger: typeof Logger = Logger;

	public static getInstance() {
		if (!this.INSTANCE) {
			this.INSTANCE = new Toolkit();
		}
		return this.INSTANCE;
	}

	private constructor() {
		this.Logger.Global.start("Starting Toolkit!");

		this.checkAuth();

		this.TKApi = new TKApi(this);
		this.TKApp = exec("electron ./src/app/app.js");
		this.TKCore = new TKCore(this);
		this.TKModules = new TKModules(this);
	}

	private checkAuth() {
		let p = join(this.Paths.Config, "auth.json");

		if (!existsSync(p)) {
			writeFileSync(p, "{}", "utf-8");
			this.Logger.Core.star(`Created new auth.json in config folder!`);
		}
	}
}

Toolkit.getInstance();

type TK = Toolkit;

export default TK;
