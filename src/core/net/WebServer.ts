/** @format */

// TODO: Write a webserver to serve the webpanel and also feed it
// TODO: into the WebSocketServer options so theres not 2 http servers going at once

import * as http from "node:http";

// Create an HTTP server
const server = http.createServer((req, res) => {
	res.writeHead(200, { "Content-Type": "text/plain" });
	res.end("okay");
});
server.on("upgrade", (req, socket, head) => {
	socket.write(
		"HTTP/1.1 101 Web Socket Protocol Handshake\r\n" + "Upgrade: WebSocket\r\n" + "Connection: Upgrade\r\n" + "\r\n"
	); 

	socket.pipe(socket); // echo back
});
