/**
 * /*
 * Core Entry Point
 *
 * @format
 */

/***** Imports *****/
import { Signale } from "signale";

/***** Setup *****/
export const Logger = new Signale({ scope: "Core" });

Logger.start("Initializing");
