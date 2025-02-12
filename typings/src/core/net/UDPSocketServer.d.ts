/** @format */
import TK from "../..";
export interface UDPSocketServerConfig {
    disabled: boolean;
    port: number;
    host: string;
}
declare class UDPSocketServer {
    private static INSTANCE;
    private Logger;
    private Server;
    private constructor();
    static getInstance(config: UDPSocketServerConfig, tkcore: TK["TKCore"]): UDPSocketServer;
    connect(port: number, address: string): void;
    disconnect(): void;
    close(): void;
    private onError;
    private onClose;
    private onConnect;
    private onMessage;
}
export default UDPSocketServer;
//# sourceMappingURL=UDPSocketServer.d.ts.map