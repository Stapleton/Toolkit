/**
 * /*
 * Core Entry Point
 *
 * @format
 */

/***** Imports *****/
import { join } from "path";
import Toolkit from "@Toolkit";
import { existsSync, writeFileSync } from "fs";
import { Signale } from "signale";

/***** Setup *****/
export const Logger = new Signale({ scope: "Core" });

Logger.start("Initializing");

function makeAuth() {
	let p = join(Toolkit.Paths.Config, "auth.json");
	if (existsSync(p)) return;

	writeFileSync(p, "{}", "utf-8");
	Logger.star(`Created new auth.json in config folder!`);
}

makeAuth();
