/** @format */

import Toolkit from "@Toolkit";
import * as dgram from "node:dgram";

export function HandleMessage(msg: Buffer, rinfo: dgram.RemoteInfo) {
	Toolkit.Logger.Api.scope("Api/UDP Server").info(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
}
