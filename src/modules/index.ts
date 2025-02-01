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
import { IModConfig, IModule } from "../../src/core/lib/Module";
import { existsSync, lstat, lstatSync, PathLike, readdirSync, Stats } from "fs";
import Sleep from "../core/utils/Sleep";

/* Interfaces */
interface Discovery {
	modulePath: string;
	entryPath: string;
	metaPath: string;
}

interface Candidate extends Discovery {
	name: IModule.ModName;
	id: IModule.ModID;
	version: IModule.ModVersion;
	type: IModule.ModType;
	requires: IModule.ModRequires[];
}

interface Fork extends Candidate {
	fork: ChildProcess;
}

/* Setup ModuleLoader */
export class ModuleLoader {
	private readonly Logger = Toolkit.Logger.Mods;
	private discoveries: Discovery[] = [];
	private candidates: Candidate[] = [];
	private errored: Candidate[] = [];
	private forks: Fork[] = [];

	constructor() {
		this.discover(Toolkit.Paths.Mods).then((_) => {
			this.Logger.complete(`Discovered ${this.discoveries.length} Modules`);
			this.resolveAndSortCandidates().then((_) => {
				this.Logger.complete(
					`Resolved ${this.candidates.flat().length} Modules. Sorted into ${
						this.candidates.length
					} dependency groups.`
				);
				this.forkCandidates().then((_) => {
					//this.Logger.info(this.candidates);
					this.Logger.success(`Forked ${this.forks.length} Modules Successfully`);
					if (this.errored.length > 0) this.Logger.warn(`${this.errored.length} Modules failed to load`);
				});
			});
		});
	}

	private async discover(directory: PathLike) {
		this.Logger.await("Discovering Modules");
		// Get "direcory" stats
		let stats = lstatSync(directory);
		//if (error) this.Logger.error(error);
		if (stats.isDirectory()) {
			// Get all files in "directory"
			let directoryList = readdirSync(directory),
				fileName,
				dirString;
			for (let fileIdx in directoryList) {
				fileName = directoryList[fileIdx];
				dirString = join(directory.toString(), fileName);

				if (fileName.includes(".")) continue;
				//if (disabled(f)) continue;
				if (existsSync(join(dirString, "tk-module.json")) == true)
					this.discoveries.push({
						modulePath: dirString,
						entryPath: join(dirString, "index.ts"),
						metaPath: join(dirString, "tk-module.json"),
					});
				//fork(join(dirString, "index.ts"), { serialization: "advanced" })
				else continue;
			}
		}
	}

	private async resolveAndSortCandidates() {
		this.Logger.await("Resolving and Sorting Modules");
		let groupedCandidates: Candidate[][] = [];

		for (let discovery of this.discoveries) {
			let candidate: Candidate = {
				...discovery,
				...require(discovery.metaPath).meta,
			};

			let groupIdx = candidate.requires.length - 1;

			if (!groupedCandidates[groupIdx]) groupedCandidates[groupIdx] = [];
			groupedCandidates[groupIdx].push(candidate);
		}

		this.candidates = groupedCandidates.flat();
	}

	private async forkCandidates() {
		this.Logger.await("Forking Modules");
		for (let idx = this.candidates.length - 1; idx != -1; idx--) {
			let candidate: Candidate = this.candidates[idx];
			try {
				this.forks[idx] = {
					...candidate,
					fork: fork(candidate.entryPath, { serialization: "advanced" }),
				};
				Sleep(200);
			} catch (error) {
				this.Logger.error(
					`Failed to fork module: ${candidate.id}\n\t\tModule Path: ${
						candidate.modulePath
					}\n\t\tModule Version: ${candidate.version}\n\t\tModule Dependencies: ${candidate.requires.join(
						", "
					)}`
				);
				this.errored.push(candidate);
			}
		}
	}

	public getModuleForks() {
		return this.forks;
	}
}

new ModuleLoader();
