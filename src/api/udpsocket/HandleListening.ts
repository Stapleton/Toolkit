/** @format */

import Toolkit from "@Toolkit";
import { Server } from "../index";

export function HandleListening() {
	const address = Server.address();
	Toolkit.Logger.Api.scope("Api/UDP Server").info(`server listening ${address.address}:${address.port}`);
}
