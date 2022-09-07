/**
 * /*
 * Toolkit Entry File
 *
 * @format
 */

// TODO: Spawn one worker for each domain (API, APP, CORE, MODS)

/***** Imports *****/
import { ChildProcess, fork } from "child_process";

/***** Setup *****/
export const DOMAIN_WORKERS: { [key: string]: ChildProcess } = {
  API: fork("./src/api/index.ts", { serialization: "advanced" }),
  APP: fork("./src/app/index.ts", { serialization: "advanced" }),
  CORE: fork("./src/core/index.ts", { serialization: "advanced" }),
  MODS: fork("./src/modules/index.ts", { serialization: "advanced" }),
};
