/** @format */

import TK from "../..";
import { IncomingMessage } from "http";
import { RawData, WebSocketServer as _WebSocketServer, WebSocket } from "ws";
import WebSocketServerError from "../../../src/core/error/WebSocketServerError";

export interface WebSocketServerConfig {
	disabled: boolean;
	port: number;
	host: string;
}

class WebSocketServer extends _WebSocketServer {
	private static INSTANCE: WebSocketServer;
	private Logger: TK["TKCore"]["Logger"];

	private constructor(config: WebSocketServerConfig, tkcore: TK["TKCore"]) {
		super({
			port: config.port,
			host: config.host,
		});
		this.Logger = tkcore.Logger.scope("Core.Net.UDPSocketServer");
		this.Logger.await(`Starting...`);

		this.on("close", this.onClose);
		this.on("error", this.onError);
		this.on("headers", this.onHeaders);
		this.on("connection", this.onConnection);
		this.on("listening", () => {
			this.Logger.listen(`WebSocketServer on ${config.host}:${config.port}`);
		});
	}

	public static getInstance(config: WebSocketServerConfig, tkcore: TK["TKCore"]) {
		if (!this.INSTANCE) this.INSTANCE = new WebSocketServer(config, tkcore);
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
