/**
 * Modules Entry File
 *
 * @format
 */

// TODO: Start each module as its own child process
// TODO: All of my old bot modules will be rewritten into personal use tools for use within Toolkit

// ?: Will this have 3rd-party service connections? Yes. Notably Discord.

// ?: The old musicbot will be built into its own module and hosted from the Toolkit

/***** Imports *****/
import Toolkit from "../../src/Toolkit";
import { join } from "path";
import { ChildProcess, fork } from "child_process";
import { IModule } from "../../src/core/lib/Module";
import { lstat, PathLike, readdirSync, readFileSync } from "fs";

/***** Setup *****/
let Logger = Toolkit.Logger.Mods;
Logger.start("Forking all enabled modules!");

export let Forks: Map<IModule.ModID, ChildProcess> = new Map();

/*function disabled(id: ModID) {
	let path = join(Toolkit.Paths.Config, `${id}.toml`);
	if (!existsSync(path)) return false;
	let text = readFileSync(path, "utf8");
	let config: IModConfig = parse(text);
	return config._disabled;
}*/

function ModuleLoader(directory: PathLike) {
	// Get "direcory" stats
	lstat(directory, function (error, stats) {
		if (error) Logger.error(error);
		if (stats.isDirectory()) {
			// Get all files in "directory"
			let directoryList = readdirSync(directory),
				f,
				d;
			for (let file in directoryList) {
				f = directoryList[file];
				d = join(directory.toString(), f);

				if (f.includes(".")) continue;
				//if (disabled(f)) continue;
				Forks.set(f, fork(join(d, "index.ts"), { serialization: "advanced" }));
			}
		}
	});
}

ModuleLoader(Toolkit.Paths.Mods);
