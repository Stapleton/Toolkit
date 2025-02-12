"use strict";
/** @format */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// TODO: Write a webserver to serve the webpanel and also feed it
// TODO: into the WebSocketServer options so theres not 2 http servers going at once
const http = __importStar(require("node:http"));
// Create an HTTP server
const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("okay");
});
server.on("upgrade", (req, socket, head) => {
    socket.write("HTTP/1.1 101 Web Socket Protocol Handshake\r\n" + "Upgrade: WebSocket\r\n" + "Connection: Upgrade\r\n" + "\r\n");
    //socket.pipe(); // echo back
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2ViU2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmUvbmV0L1dlYlNlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFZCxpRUFBaUU7QUFDakUsb0ZBQW9GO0FBRXBGLGdEQUFrQztBQUVsQyx3QkFBd0I7QUFDeEIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtJQUM3QyxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDO0lBQ3JELEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDakIsQ0FBQyxDQUFDLENBQUM7QUFDSCxNQUFNLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUU7SUFDMUMsTUFBTSxDQUFDLEtBQUssQ0FDWCxnREFBZ0QsR0FBRyx3QkFBd0IsR0FBRyx5QkFBeUIsR0FBRyxNQUFNLENBQ2hILENBQUM7SUFFRiw2QkFBNkI7QUFDOUIsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGZvcm1hdCAqL1xyXG5cclxuLy8gVE9ETzogV3JpdGUgYSB3ZWJzZXJ2ZXIgdG8gc2VydmUgdGhlIHdlYnBhbmVsIGFuZCBhbHNvIGZlZWQgaXRcclxuLy8gVE9ETzogaW50byB0aGUgV2ViU29ja2V0U2VydmVyIG9wdGlvbnMgc28gdGhlcmVzIG5vdCAyIGh0dHAgc2VydmVycyBnb2luZyBhdCBvbmNlXHJcblxyXG5pbXBvcnQgKiBhcyBodHRwIGZyb20gXCJub2RlOmh0dHBcIjtcclxuXHJcbi8vIENyZWF0ZSBhbiBIVFRQIHNlcnZlclxyXG5jb25zdCBzZXJ2ZXIgPSBodHRwLmNyZWF0ZVNlcnZlcigocmVxLCByZXMpID0+IHtcclxuXHRyZXMud3JpdGVIZWFkKDIwMCwgeyBcIkNvbnRlbnQtVHlwZVwiOiBcInRleHQvcGxhaW5cIiB9KTtcclxuXHRyZXMuZW5kKFwib2theVwiKTtcclxufSk7XHJcbnNlcnZlci5vbihcInVwZ3JhZGVcIiwgKHJlcSwgc29ja2V0LCBoZWFkKSA9PiB7XHJcblx0c29ja2V0LndyaXRlKFxyXG5cdFx0XCJIVFRQLzEuMSAxMDEgV2ViIFNvY2tldCBQcm90b2NvbCBIYW5kc2hha2VcXHJcXG5cIiArIFwiVXBncmFkZTogV2ViU29ja2V0XFxyXFxuXCIgKyBcIkNvbm5lY3Rpb246IFVwZ3JhZGVcXHJcXG5cIiArIFwiXFxyXFxuXCJcclxuXHQpO1xyXG5cclxuXHQvL3NvY2tldC5waXBlKCk7IC8vIGVjaG8gYmFja1xyXG59KTtcclxuIl19