/** @format */

import Puppeteer from "puppeteer";
import { Signale } from "signale";
import Config from "./Config";

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

function doThing(Page: Puppeteer.Page) {
	Logger.disable();
	Logger.info(Page); // Use `Page` variable so TSC stops being angy
	Logger.enable();

	Logger.error(`Not Yet Implemented.`);
	// Traverse through each necessary step for a Puppet to make a stock order
}

async function Puppet() {
	Logger.spawn(`${name.join(" ")}`);
	startTime(name[1]); // Start logger timer without timer auto log

	const Browser = await Puppeteer.launch({ headless: Config.Puppet.headless });
	let Pages = await Browser.pages(),
		Page = Pages[0];

	Logger.info(`Changing Viewport Size to ${Config.Puppet.View.width}x${Config.Puppet.View.height}...`);
	await Page.setViewport({
		width: Config.Puppet.View.width,
		height: Config.Puppet.View.height,
	});

	Logger.pending(`Heading to ${Config.Puppet.initLink}`);
	await Page.goto(Config.Puppet.initLink);

	Logger.await(`Doing thing.`);
	doThing(Page);

	Logger.complete(`Spawned. Took ${stopTime().span}ms. Closing Puppet...`);
	Browser.close();
}

export default Puppet;

Puppet();
