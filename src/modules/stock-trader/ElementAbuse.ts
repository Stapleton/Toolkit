/** @format */
import Sleep from "@Core/lib/Sleep";
import Puppeteer from "puppeteer";

export async function typeEl(query: string, page: Puppeteer.Page, text: string): Promise<void> {
	await page.type(query, text);
	Sleep(500);
}

export async function tapEl(query: string, page: Puppeteer.Page): Promise<void> {
	let t = page.touchscreen;
	await t.tap(...(await getElPos(query, page)));
	Sleep(500);
}

// * This is a fucking godsend
export async function getElPos(query: string, page: Puppeteer.Page): Promise<[number, number]> {
	let e = await (await page.$(query)).clickablePoint();
	return [e.x, e.y];
}
