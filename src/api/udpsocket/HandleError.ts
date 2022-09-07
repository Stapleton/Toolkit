/** @format */

import { Logger } from "./index";
import UDPSocketServerError from "@Core/error/UDPSocketServerError";

export function HandleError(error: UDPSocketServerError) {
  Logger.error(`Server Error: ${error.stack}`);
}
