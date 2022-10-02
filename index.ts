/** @format */

import { readFileSync } from "fs";
import { join } from "path";
import { parse } from "toml";
import Toolkit, { ToolkitConfig } from "@Toolkit";
import { fork } from "child_process";

let config = <ToolkitConfig>parse(readFileSync(join(Toolkit.Paths.Config, "toolkit.toml"), "utf8"));

if (!config.disabled.includes("api"))
	Toolkit.Workers.set("api", fork("./src/api/index.ts", { serialization: "advanced" }));
if (!config.disabled.includes("app"))
	Toolkit.Workers.set("app", fork("./src/app/index.ts", { serialization: "advanced" }));
if (!config.disabled.includes("core"))
	Toolkit.Workers.set("core", fork("./src/core/index.ts", { serialization: "advanced" }));
if (!config.disabled.includes("module"))
	Toolkit.Workers.set("module", fork("./src/modules/index.ts", { serialization: "advanced" }));
