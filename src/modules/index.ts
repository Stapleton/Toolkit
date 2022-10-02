/**
 * Modules Entry File
 *
 * @format
 */

// TODO: Start each module as its own child process
// TODO: All of my old bot modules will be rewritten into personal use tools for use within Toolkit

// ?: Will this have 3rd-party service connections? Yes. Notably Discord.

// ?: The old musicbot will be built into its own module and hosted from the Toolkit

// ?: A better Discord permisison manager will be added at some point.
// ?: Something that will kinda mimic discord's manager but has channel permission info and a permission hierarchy
// ?: laid out as part of the UI so you can see in a tree who can do what

/***** Imports *****/
import { ChildProcess, fork } from "child_process";
import Toolkit from "@Toolkit";
import { join } from "path";
import { lstat, PathLike, readdirSync, readFileSync } from "fs";
import { ModID, IModConfig } from "@Core/lib/ModConfig";
import { parse } from "toml";

/***** Setup *****/
let Logger = Toolkit.Logger.Mods;
Logger.start("Forking all modules!");

export let Forks: Map<ModID, ChildProcess> = new Map();

function disabled(id: ModID) {
	let config: IModConfig = parse(readFileSync(join(Toolkit.Paths.Config, `${id}.toml`), "utf8"));
	return config.disabled;
}

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
				if (disabled(f)) continue;
				Forks.set(f, fork(join(d, "index.ts"), { serialization: "advanced" }));
			}
		}
	});
}

ModuleLoader(Toolkit.Paths.Mods);
