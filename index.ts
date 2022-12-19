/** @format */

import Toolkit from "@Toolkit";
import { fork } from "child_process";

if (!Toolkit.Config.Api.disabled) Toolkit.Workers.set("api", fork("./src/api/index.ts", { serialization: "advanced" }));
if (!Toolkit.Config.App.disabled) Toolkit.Workers.set("app", fork("./src/app/index.ts", { serialization: "advanced" }));
if (!Toolkit.Config.Core.disabled)
	Toolkit.Workers.set("core", fork("./src/core/index.ts", { serialization: "advanced" }));
if (!Toolkit.Config.Module.disabled)
	Toolkit.Workers.set("module", fork("./src/modules/index.ts", { serialization: "advanced" }));

Toolkit.Logger.Global.start("Starting Toolkit!");
