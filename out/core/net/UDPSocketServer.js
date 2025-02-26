"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
const node_dgram_1 = require("node:dgram");
class UDPSocketServer {
    static INSTANCE;
    Logger;
    Server = (0, node_dgram_1.createSocket)("udp4");
    constructor(config, tkcore) {
        this.Logger = tkcore.Logger.scope("Core.Net.UDPSocketServer");
        this.Logger.await(`Starting...`);
        this.Server.bind(config.port, config.host);
        this.Server.on("error", this.onError);
        this.Server.on("close", this.onClose);
        this.Server.on("connect", this.onConnect);
        this.Server.on("message", this.onMessage);
        this.Server.on("listening", () => {
            this.Logger.listen(`UDPSocketServer on ${config.host}:${config.port}`);
        });
    }
    static getInstance(config, tkcore) {
        if (!this.INSTANCE)
            this.INSTANCE = new UDPSocketServer(config, tkcore);
        return this.INSTANCE;
    }
    connect(port, address) {
        this.Server.connect(port, address, () => this.Logger.connect(`to Socket at ${address}:${port}`));
    }
    disconnect() {
        this.Server.disconnect();
    }
    close() {
        this.Server.close();
    }
    onError(error) {
        this.Logger.error(`Server Error: ${error.stack}`);
    }
    onClose() {
        this.Logger.close("UDP Socket Closed");
    }
    onConnect() {
        this.Logger.connect(`from Socket`);
    }
    onMessage(msg, rinfo) {
        this.Logger.message(`from ${rinfo.address}:${rinfo.port}`);
        this.Logger.message(msg);
    }
}
exports.default = UDPSocketServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVURQU29ja2V0U2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmUvbmV0L1VEUFNvY2tldFNlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7QUFHZCwyQ0FBc0Q7QUFTdEQsTUFBTSxlQUFlO0lBQ1osTUFBTSxDQUFDLFFBQVEsQ0FBa0I7SUFDakMsTUFBTSxDQUF5QjtJQUMvQixNQUFNLEdBQUcsSUFBQSx5QkFBWSxFQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRXRDLFlBQW9CLE1BQTZCLEVBQUUsTUFBb0I7UUFDdEUsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRWpDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTNDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRTtZQUNoQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsTUFBTSxDQUFDLElBQUksSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUN4RSxDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFTSxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQTZCLEVBQUUsTUFBb0I7UUFDNUUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRO1lBQUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGVBQWUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDeEUsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3RCLENBQUM7SUFFTSxPQUFPLENBQUMsSUFBWSxFQUFFLE9BQWU7UUFDM0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsT0FBTyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNsRyxDQUFDO0lBRU0sVUFBVTtRQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFTSxLQUFLO1FBQ1gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRU8sT0FBTyxDQUFDLEtBQTJCO1FBQzFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGlCQUFpQixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRU8sT0FBTztRQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVPLFNBQVM7UUFDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVPLFNBQVMsQ0FBQyxHQUFXLEVBQUUsS0FBaUI7UUFDL0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxLQUFLLENBQUMsT0FBTyxJQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFCLENBQUM7Q0FDRDtBQUVELGtCQUFlLGVBQWUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAZm9ybWF0ICovXHJcblxyXG5pbXBvcnQgVEsgZnJvbSBcIi4uLy4uXCI7XHJcbmltcG9ydCB7IGNyZWF0ZVNvY2tldCwgUmVtb3RlSW5mbyB9IGZyb20gXCJub2RlOmRncmFtXCI7XHJcbmltcG9ydCBVRFBTb2NrZXRTZXJ2ZXJFcnJvciBmcm9tIFwiLi4vLi4vLi4vc3JjL2NvcmUvZXJyb3IvVURQU29ja2V0U2VydmVyRXJyb3JcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVURQU29ja2V0U2VydmVyQ29uZmlnIHtcclxuXHRkaXNhYmxlZDogYm9vbGVhbjtcclxuXHRwb3J0OiBudW1iZXI7XHJcblx0aG9zdDogc3RyaW5nO1xyXG59XHJcblxyXG5jbGFzcyBVRFBTb2NrZXRTZXJ2ZXIge1xyXG5cdHByaXZhdGUgc3RhdGljIElOU1RBTkNFOiBVRFBTb2NrZXRTZXJ2ZXI7XHJcblx0cHJpdmF0ZSBMb2dnZXI6IFRLW1wiVEtDb3JlXCJdW1wiTG9nZ2VyXCJdO1xyXG5cdHByaXZhdGUgU2VydmVyID0gY3JlYXRlU29ja2V0KFwidWRwNFwiKTtcclxuXHJcblx0cHJpdmF0ZSBjb25zdHJ1Y3Rvcihjb25maWc6IFVEUFNvY2tldFNlcnZlckNvbmZpZywgdGtjb3JlOiBUS1tcIlRLQ29yZVwiXSkge1xyXG5cdFx0dGhpcy5Mb2dnZXIgPSB0a2NvcmUuTG9nZ2VyLnNjb3BlKFwiQ29yZS5OZXQuVURQU29ja2V0U2VydmVyXCIpO1xyXG5cdFx0dGhpcy5Mb2dnZXIuYXdhaXQoYFN0YXJ0aW5nLi4uYCk7XHJcblxyXG5cdFx0dGhpcy5TZXJ2ZXIuYmluZChjb25maWcucG9ydCwgY29uZmlnLmhvc3QpO1xyXG5cclxuXHRcdHRoaXMuU2VydmVyLm9uKFwiZXJyb3JcIiwgdGhpcy5vbkVycm9yKTtcclxuXHRcdHRoaXMuU2VydmVyLm9uKFwiY2xvc2VcIiwgdGhpcy5vbkNsb3NlKTtcclxuXHRcdHRoaXMuU2VydmVyLm9uKFwiY29ubmVjdFwiLCB0aGlzLm9uQ29ubmVjdCk7XHJcblx0XHR0aGlzLlNlcnZlci5vbihcIm1lc3NhZ2VcIiwgdGhpcy5vbk1lc3NhZ2UpO1xyXG5cdFx0dGhpcy5TZXJ2ZXIub24oXCJsaXN0ZW5pbmdcIiwgKCkgPT4ge1xyXG5cdFx0XHR0aGlzLkxvZ2dlci5saXN0ZW4oYFVEUFNvY2tldFNlcnZlciBvbiAke2NvbmZpZy5ob3N0fToke2NvbmZpZy5wb3J0fWApO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKGNvbmZpZzogVURQU29ja2V0U2VydmVyQ29uZmlnLCB0a2NvcmU6IFRLW1wiVEtDb3JlXCJdKSB7XHJcblx0XHRpZiAoIXRoaXMuSU5TVEFOQ0UpIHRoaXMuSU5TVEFOQ0UgPSBuZXcgVURQU29ja2V0U2VydmVyKGNvbmZpZywgdGtjb3JlKTtcclxuXHRcdHJldHVybiB0aGlzLklOU1RBTkNFO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGNvbm5lY3QocG9ydDogbnVtYmVyLCBhZGRyZXNzOiBzdHJpbmcpIHtcclxuXHRcdHRoaXMuU2VydmVyLmNvbm5lY3QocG9ydCwgYWRkcmVzcywgKCkgPT4gdGhpcy5Mb2dnZXIuY29ubmVjdChgdG8gU29ja2V0IGF0ICR7YWRkcmVzc306JHtwb3J0fWApKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBkaXNjb25uZWN0KCkge1xyXG5cdFx0dGhpcy5TZXJ2ZXIuZGlzY29ubmVjdCgpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGNsb3NlKCkge1xyXG5cdFx0dGhpcy5TZXJ2ZXIuY2xvc2UoKTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgb25FcnJvcihlcnJvcjogVURQU29ja2V0U2VydmVyRXJyb3IpIHtcclxuXHRcdHRoaXMuTG9nZ2VyLmVycm9yKGBTZXJ2ZXIgRXJyb3I6ICR7ZXJyb3Iuc3RhY2t9YCk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIG9uQ2xvc2UoKSB7XHJcblx0XHR0aGlzLkxvZ2dlci5jbG9zZShcIlVEUCBTb2NrZXQgQ2xvc2VkXCIpO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBvbkNvbm5lY3QoKSB7XHJcblx0XHR0aGlzLkxvZ2dlci5jb25uZWN0KGBmcm9tIFNvY2tldGApO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBvbk1lc3NhZ2UobXNnOiBCdWZmZXIsIHJpbmZvOiBSZW1vdGVJbmZvKSB7XHJcblx0XHR0aGlzLkxvZ2dlci5tZXNzYWdlKGBmcm9tICR7cmluZm8uYWRkcmVzc306JHtyaW5mby5wb3J0fWApO1xyXG5cdFx0dGhpcy5Mb2dnZXIubWVzc2FnZShtc2cpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVURQU29ja2V0U2VydmVyO1xyXG4iXX0=