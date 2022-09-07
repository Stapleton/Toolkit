/**
 * @format
 */

/***** Imports *****/
import { Signale } from "signale";
import { Server } from "@Api/index";

/***** Setup *****/
export const Logger = new Signale({ scope: "UDP Socket" });

/***** Event Handling *****/

Server.on("error", (err) => {
  console.log(`server error:\n${err.stack}`);
  Server.close();
});

Server.on("message", (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

Server.on("listening", () => {
  const address = Server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});
