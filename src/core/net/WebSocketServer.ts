/** @format */

import WebSocketServerError from "../../../src/core/error/WebSocketServerError";
import Toolkit from "../../../src/Toolkit";
import { IncomingMessage } from "http";
import { RawData, WebSocketServer as _WebSocketServer, WebSocket } from "ws";

interface WebSocketServerConfig {
	port: number;
	host: string;
}

class WebSocketServer extends _WebSocketServer {
	private static INSTANCE: WebSocketServer;
	private Logger = Toolkit.Logger.Core.scope("Core.Net.WebSocketServer");

	private constructor(config: WebSocketServerConfig) {
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
			this.Logger.listen(`WebSocketServer on ${config.host}:${config.port}`);
		});
	}

	public static getInstance(config: WebSocketServerConfig) {
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
		this.Logger.debug(`WebSocketServer Headers: ${headers}`);
	}

	private onConnection(websocket: WebSocket, request: IncomingMessage) {
		websocket.on("message", (data, bin) => this.onMessage(data, bin));
	}

	private onMessage(data: RawData, isBinary: boolean) {
		this.Logger.message(data.toString());
	}
}

export default WebSocketServer;

class Socket {}

/**
 * TODO: Implement Socket.io for Websocket Server
 * make a class that contructs with a room name
 *
 */
