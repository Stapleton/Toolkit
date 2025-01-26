/** @format */
import Sleep from "../../../src/core/lib/Sleep";
import Puppeteer from "puppeteer";

export async function typeEl(query: string, page: Puppeteer.Page, text: string): Promise<void> {
	await page.type(query, text);
	Sleep(500);
}

export function typeOneEl(queryAll: string, el: number, page: Puppeteer.Page, text: string) {
	page.$$(queryAll).then((_) => {
		_[el].type(text);
	});
}

export async function clickEl(query: string, page: Puppeteer.Page): Promise<void> {
	let m = page.mouse;
	await m.click(...(await getElPos(query, page)));
	Sleep(500);
}

export function tapOneEl(queryAll: string, el: number, page: Puppeteer.Page) {
	page.$$(queryAll).then((_) => {
		_[el].click();
	});
}

// * This is a fucking godsend
export async function getElPos(query: string, page: Puppeteer.Page): Promise<[number, number]> {
	let e = await (await page.$(query)).clickablePoint();
	return [e.x, e.y];
}
