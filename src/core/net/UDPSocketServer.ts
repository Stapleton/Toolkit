/** @format */

import dgram from "node:dgram";
import Toolkit from "@Toolkit";
import UDPSocketServerError from "@Core/error/UDPSocketServerError";

interface UDPSSConfig {
	port: number;
	host: string;
}

class UDPSocketServer {
	private static INSTANCE: UDPSocketServer;
	private Logger = Toolkit.Logger.Core.scope("Core.Net.UDPSS");
	private Server = dgram.createSocket("udp4");

	private constructor(config: UDPSSConfig) {
		this.Logger.await(`Starting...`);

		this.Server.bind(config.port, config.host);

		this.Server.on("error", this.onError);
		this.Server.on("close", this.onClose);
		this.Server.on("connect", this.onConnect);
		this.Server.on("message", this.onMessage);
		this.Server.on("listening", () => {
			this.Logger.listen(`UDPSS on ${config.host}:${config.port}`);
		});
	}

	public static getInstance(config: UDPSSConfig) {
		if (!this.INSTANCE) this.INSTANCE = new UDPSocketServer(config);
		return this.INSTANCE;
	}

	public connect(port: number, address: string) {
		this.Server.connect(port, address, () => this.Logger.connect(`to Socket at ${address}:${port}`));
	}

	public disconnect() {
		this.Server.disconnect();
	}

	public close() {
		this.Server.close();
	}

	private onError(error: UDPSocketServerError) {
		this.Logger.error(`Server Error: ${error.stack}`);
	}

	private onClose() {
		this.Logger.close("UDP Socket Closed");
	}

	private onConnect() {
		this.Logger.connect(`from Socket`);
	}

	private onMessage(msg: Buffer, rinfo: dgram.RemoteInfo) {
		this.Logger.message(`from ${rinfo.address}:${rinfo.port}`);
		this.Logger.message(msg);
	}
}

export default UDPSocketServer;
