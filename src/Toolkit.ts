/** @format */

import { Signale } from "signale";

/*type Toolkit = {
	Paths: {
		Config: String;
		Api: String;
		App: String;
		Core: String;
		Mods: String;
	};
	Logger: {
		Global: Signale;
		Api: Signale;
		App: Signale;
		Core: Signale;
		Mods: Signale;
	};
};*/

class Toolkit {
	public Paths = {
		Config: `${process.cwd()}\\config`,
		Api: `${process.cwd()}\\src\\api`,
		App: `${process.cwd()}\\src\\app`,
		Core: `${process.cwd()}\\src\\core`,
		Mods: `${process.cwd()}\\src\\mods`,
	};

	public Logger = {
		Global: new Signale({ scope: "Global" }),
		Api: new Signale({ scope: "Api" }),
		App: new Signale({ scope: "App" }),
		Core: new Signale({ scope: "Core" }),
		Mods: new Signale({ scope: "Mods" }),
	};
}

//Loggers.Global.info(Toolkit.Paths.Config);

export default new Toolkit();
