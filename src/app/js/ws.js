/** @format */

let host, port, stat, mesg, hist, WS;

function setup(callback) {
	host = document.querySelector("#WSHost");
	port = document.querySelector("#WSPort");
	stat = document.querySelector("#WSStatus");
	mesg = document.querySelector("#WSMsg");
	hist = document.querySelector("#WSHistory");
}

setup();

function connect() {
	WS = new WebSocket(`ws://${host.value}:${port.value}`);
	WS.addEventListener("open", update);

	function update() {
		stat.innerHTML = "Connected.";
		stat.className = "green";
	}
}

function sendMsg() {
	let msg = mesg.value;
	WS.send(msg);
	hist?.appendChild((document.createElement("p").innerHTML = msg));
}
