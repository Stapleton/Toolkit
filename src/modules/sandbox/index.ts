/**
 * Modules Entry File
 *
 * @format
 */

/***** Imports *****/
import { Signale } from "signale";

/***** Setup *****/
export const Logger = new Signale({ scope: "[Mod][Sandbox]" });

Logger.start("Initializing");
