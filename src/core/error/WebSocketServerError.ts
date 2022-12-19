/** @format */

export default class WebSocketServerError extends Error {
	constructor() {
		super(`Web Socket Server has Errored.`);
	}
}
