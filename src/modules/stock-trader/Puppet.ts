/** @format */

import Puppeteer from "puppeteer";
import { Signale } from "signale";
import Config from "./Config";
import Sleep from "../../core/lib/Sleep";

const name = [`Puppet`, `#${process.argv0}`];
let Logger = new Signale({
	interactive: false,
	scope: name[1],
	types: {
		spawn: {
			label: "SPAWN",
			badge: "",
			color: "redBright",
		},
	},
});

// +--------------------------------------------------------+
// | Functions                                              |
// +--------------------------------------------------------+

function startTime(label: string): void {
	Logger.disable();
	Logger.time(label);
	Logger.enable();
}

function stopTime(): { label: string; span?: number } {
	let time;

	Logger.disable();
	time = Logger.timeEnd();
	Logger.enable();

	return time;
}

/*function openOrders(Page: Puppeteer.Page) {
	let touch = Page.touchscreen;
	touch.tap(640, 810);
}*/

async function getCookiesForAutoLogin(Page: Puppeteer.Page) {
	let touch = Page.touchscreen;
	await touch.tap(662, 472);
	Sleep(500);
	await touch.tap(430, 330);
	// ! Google Signin opens a new tab, i have no clue how to handle this at 3am
	// ! The text box is autoselected tho so thats nice but idk if the page object will change or
	// ! if I have to start passing through the entire array of Pages
	// * 20% of the progress takes 80% of the effort. You can get through this
	// * Just dedicate yourself. This is one of the last times you will have to work in your life.
	// * Git 'er done bud, you can do it you unstoppable chad!

	// ? Could I make a function that when given a dom element will calculate and return
	// ? its pixel placement on the page in x and y
	//openOrders(Page);
}

async function Puppet() {
	Logger.spawn(`${name.join(" ")}`);
	startTime(name[1]); // Start logger timer without timer auto log

	const Browser = await Puppeteer.launch({ headless: Config.Puppet.headless });
	let Pages = await Browser.pages(),
		Page = Pages[0];

	Logger.info(`Changing Viewport Size to 1000x850...`);
	await Page.setViewport({
		width: 1000,
		height: 850,
	});

	Logger.pending(`Heading to ${Config.Puppet.initLink}`);
	await Page.goto(Config.Puppet.initLink);

	Logger.await(`Doing thing.`);
	getCookiesForAutoLogin(Page);
	//openOrders(Page);

	Logger.complete(`Spawned. Took ${stopTime().span}ms. Closing Puppet...`);
	//Browser.close();
}

export default Puppet;

Puppet();
