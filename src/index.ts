/**
 * ** Imports ****
 *
 * @format
 */

import { fork, exec } from "child_process";
import Toolkit from "./Toolkit";
import Sleep from "./core/utils/Sleep";

/***** Setup *****/
/*if (!Toolkit.Config.Api.disabled)*/ Toolkit.Workers.set(
	"api",
	fork("./src/api/index.ts", { serialization: "advanced" })
);
Sleep(200);
/*if (!Toolkit.Config.App.disabled)*/ //Toolkit.Workers.set("app", exec("electron ./src/app/main.js"));
Sleep(200);
/*if (!Toolkit.Config.Core.disabled)*/
Toolkit.Workers.set("core", fork("./src/core/index.ts", { serialization: "advanced" }));
Sleep(200);
/*if (!Toolkit.Config.Module.disabled)*/
Toolkit.Workers.set("module", fork("./src/modules/index.ts", { serialization: "advanced" }));
Sleep(100);

Toolkit.Logger.Global.start("Starting Toolkit!");
