/** @format */

import Toolkit from "@Toolkit";
import UDPSocketServerError from "@Core/error/UDPSocketServerError";

export function HandleError(error: UDPSocketServerError) {
	Toolkit.Logger.Api.scope("Api/UDP Server").error(`Server Error: ${error.stack}`);
}
