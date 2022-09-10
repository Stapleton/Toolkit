/** @format */

import { fork } from "child_process";

export const Workers = {
  //Api: fork("./src/api/index.ts", { serialization: "advanced" }),
  //App: fork("./src/app/index.ts", { serialization: "advanced" }),
  //Core: fork("./src/core/index.ts", { serialization: "advanced" }),
  Mods: fork("./src/modules/index.ts", { serialization: "advanced" }),
};
