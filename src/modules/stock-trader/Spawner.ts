/** @format */

import { ChildProcess, spawn } from "node:child_process";

export class Spawner {
	private Children: ChildProcess[] = [];

	constructor(limit: number) {
		let i;
		for (i = 0; i < limit; i++) {
			this.Children.push(this.spawn(i.toString()));
		}
	}

	private spawn(id: string): ChildProcess {
		return spawn("node", ["-r ts-node/register", "./src/modules/stock-trader/Puppet.ts"], {
			stdio: "inherit",
			windowsVerbatimArguments: true,
			serialization: "advanced",
			argv0: id,
		});
	}
}
