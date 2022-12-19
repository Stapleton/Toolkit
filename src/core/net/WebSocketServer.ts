/** @format */

import WebSocketServerError from "@Core/error/WebSocketServerError";
import Toolkit from "@Toolkit";
import { IncomingMessage } from "http";
import { RawData, WebSocketServer as WSS, WebSocket } from "ws";

interface WSSConfig {
	port: number;
	host: string;
}

class WebSocketServer extends WSS {
	private static INSTANCE: WebSocketServer;
	private Logger = Toolkit.Logger.Core.scope("Core.Net.WSS");

	private constructor(config: WSSConfig) {
		super({
			port: config.port,
			host: config.host,
		});
		this.Logger.await(`Starting...`);

		this.on("close", this.onClose);
		this.on("error", this.onError);
		this.on("headers", this.onHeaders);
		this.on("connection", this.onConnection);
		this.on("listening", () => {
			this.Logger.listen(`WSS on ${config.host}:${config.port}`);
		});
	}

	public static getInstance(config: WSSConfig) {
		if (!this.INSTANCE) this.INSTANCE = new WebSocketServer(config);
		return this.INSTANCE;
	}

	private onClose() {
		this.close();
	}

	private onError(error: WebSocketServerError) {
		this.Logger.error(`Server Error: ${error.stack}`);
	}

	private onHeaders(headers: string[], request: IncomingMessage) {
		this.Logger.debug(`WSS Headers: ${headers}`);
	}

	private onConnection(websocket: WebSocket, request: IncomingMessage) {
		websocket.on("message", (data, bin) => this.onMessage(data, bin));
	}

	private onMessage(data: RawData, isBinary: boolean) {
		this.Logger.message(data.toString());
	}
}

export default WebSocketServer;
