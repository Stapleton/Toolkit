"use strict";
/**
 * /*
 * Core Entry Point
 *
 * @format
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Module_1 = require("../../src/core/lib/Module");
const UDPSocketServer_1 = __importDefault(require("../../src/core/net/UDPSocketServer"));
const WebSocketServer_1 = __importDefault(require("../../src/core/net/WebSocketServer"));
/***** Setup TKCore Servers *****/
class TKCore extends Module_1.Module {
    Toolkit;
    Config = this._config.getConfig();
    constructor(toolkit) {
        super("Toolkit Core", "tk-core", "0.0.1", "lib", ["toolkit"]);
        this.Toolkit = toolkit;
        this.Logger = toolkit.Logger.Core;
        this.Logger.start("Initializing");
        if (!this.Config.UDPSocketServer.disabled)
            this.startUDPSocketServer();
        if (!this.Config.WebSocketServer.disabled)
            this.startWebSocketServer();
    }
    startUDPSocketServer() {
        UDPSocketServer_1.default.getInstance(this.Config.UDPSocketServer, this);
    }
    startWebSocketServer() {
        WebSocketServer_1.default.getInstance(this.Config.WebSocketServer, this);
    }
}
exports.default = TKCore;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29yZS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7O0dBS0c7Ozs7O0FBSUgsc0RBQStEO0FBQy9ELHlGQUE0RjtBQUM1Rix5RkFBNEY7QUFRNUYsa0NBQWtDO0FBQ2xDLE1BQU0sTUFBTyxTQUFRLGVBQU07SUFDbkIsT0FBTyxDQUFLO0lBRUYsTUFBTSxHQUFpQixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBRWpFLFlBQVksT0FBVztRQUN0QixLQUFLLENBQUMsY0FBYyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRWxDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxRQUFRO1lBQUUsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDdkUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLFFBQVE7WUFBRSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztJQUN4RSxDQUFDO0lBRU8sb0JBQW9CO1FBQzNCLHlCQUFlLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFTyxvQkFBb0I7UUFDM0IseUJBQWUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDaEUsQ0FBQztDQUNEO0FBRUQsa0JBQWUsTUFBTSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIC8qXHJcbiAqIENvcmUgRW50cnkgUG9pbnRcclxuICpcclxuICogQGZvcm1hdFxyXG4gKi9cclxuXHJcbi8qKioqKiBJbXBvcnRzICoqKioqL1xyXG5pbXBvcnQgVEsgZnJvbSBcIi4uXCI7XHJcbmltcG9ydCB7IE1vZHVsZSwgSU1vZENvbmZpZyB9IGZyb20gXCIuLi8uLi9zcmMvY29yZS9saWIvTW9kdWxlXCI7XHJcbmltcG9ydCBVRFBTb2NrZXRTZXJ2ZXIsIHsgVURQU29ja2V0U2VydmVyQ29uZmlnIH0gZnJvbSBcIi4uLy4uL3NyYy9jb3JlL25ldC9VRFBTb2NrZXRTZXJ2ZXJcIjtcclxuaW1wb3J0IFdlYlNvY2tldFNlcnZlciwgeyBXZWJTb2NrZXRTZXJ2ZXJDb25maWcgfSBmcm9tIFwiLi4vLi4vc3JjL2NvcmUvbmV0L1dlYlNvY2tldFNlcnZlclwiO1xyXG5cclxuLyoqKioqIEludGVyZmFjZXMgKioqKiovXHJcbmludGVyZmFjZSBUS0NvcmVDb25maWcgZXh0ZW5kcyBJTW9kQ29uZmlnIHtcclxuXHRVRFBTb2NrZXRTZXJ2ZXI6IFVEUFNvY2tldFNlcnZlckNvbmZpZztcclxuXHRXZWJTb2NrZXRTZXJ2ZXI6IFdlYlNvY2tldFNlcnZlckNvbmZpZztcclxufVxyXG5cclxuLyoqKioqIFNldHVwIFRLQ29yZSBTZXJ2ZXJzICoqKioqL1xyXG5jbGFzcyBUS0NvcmUgZXh0ZW5kcyBNb2R1bGUge1xyXG5cdHB1YmxpYyBUb29sa2l0OiBUSztcclxuXHJcblx0cHJpdmF0ZSByZWFkb25seSBDb25maWcgPSA8VEtDb3JlQ29uZmlnPnRoaXMuX2NvbmZpZy5nZXRDb25maWcoKTtcclxuXHJcblx0Y29uc3RydWN0b3IodG9vbGtpdDogVEspIHtcclxuXHRcdHN1cGVyKFwiVG9vbGtpdCBDb3JlXCIsIFwidGstY29yZVwiLCBcIjAuMC4xXCIsIFwibGliXCIsIFtcInRvb2xraXRcIl0pO1xyXG5cdFx0dGhpcy5Ub29sa2l0ID0gdG9vbGtpdDtcclxuXHRcdHRoaXMuTG9nZ2VyID0gdG9vbGtpdC5Mb2dnZXIuQ29yZTtcclxuXHRcdHRoaXMuTG9nZ2VyLnN0YXJ0KFwiSW5pdGlhbGl6aW5nXCIpO1xyXG5cclxuXHRcdGlmICghdGhpcy5Db25maWcuVURQU29ja2V0U2VydmVyLmRpc2FibGVkKSB0aGlzLnN0YXJ0VURQU29ja2V0U2VydmVyKCk7XHJcblx0XHRpZiAoIXRoaXMuQ29uZmlnLldlYlNvY2tldFNlcnZlci5kaXNhYmxlZCkgdGhpcy5zdGFydFdlYlNvY2tldFNlcnZlcigpO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBzdGFydFVEUFNvY2tldFNlcnZlcigpIHtcclxuXHRcdFVEUFNvY2tldFNlcnZlci5nZXRJbnN0YW5jZSh0aGlzLkNvbmZpZy5VRFBTb2NrZXRTZXJ2ZXIsIHRoaXMpO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBzdGFydFdlYlNvY2tldFNlcnZlcigpIHtcclxuXHRcdFdlYlNvY2tldFNlcnZlci5nZXRJbnN0YW5jZSh0aGlzLkNvbmZpZy5XZWJTb2NrZXRTZXJ2ZXIsIHRoaXMpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVEtDb3JlO1xyXG4iXX0=