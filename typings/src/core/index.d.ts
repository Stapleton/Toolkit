/**
 * /*
 * Core Entry Point
 *
 * @format
 */
/***** Imports *****/
import TK from "..";
import { Module } from "../../src/core/lib/Module";
/***** Setup TKCore Servers *****/
declare class TKCore extends Module {
    Toolkit: TK;
    private readonly Config;
    constructor(toolkit: TK);
    private startUDPSocketServer;
    private startWebSocketServer;
}
export default TKCore;
//# sourceMappingURL=index.d.ts.map