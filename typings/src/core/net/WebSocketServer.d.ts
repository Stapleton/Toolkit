/** @format */
import TK from "../..";
import { WebSocketServer as _WebSocketServer } from "ws";
export interface WebSocketServerConfig {
    disabled: boolean;
    port: number;
    host: string;
}
declare class WebSocketServer extends _WebSocketServer {
    private static INSTANCE;
    private Logger;
    private constructor();
    static getInstance(config: WebSocketServerConfig, tkcore: TK["TKCore"]): WebSocketServer;
    private onClose;
    private onError;
    private onHeaders;
    private onConnection;
    private onMessage;
}
export default WebSocketServer;
/**
 * TODO: Implement Socket.io for Websocket Server
 * make a class that contructs with a room name
 *
 */
//# sourceMappingURL=WebSocketServer.d.ts.map