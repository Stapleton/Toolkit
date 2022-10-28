/**
 * OrderMaker
 *
 * @format
 */

import Toolkit from "@Toolkit";
import { Page } from "puppeteer";

/***** Imports *****/

/***** Interfaces *****/

/***** Errors *****/
class OrderMakerPanicError extends Error {
	constructor(why: string) {
		super(why);
	}
}

/***** Setup *****/ // ! Big Brain Builder Class Comin Thru
const Logger = Toolkit.Logger.Mods.scope("StockTrader/OrderMaker");
Logger.start("Initializing");

export default class OrderMaker {
	private page: Page;
	constructor(page: Page) {
		this.page = page;
		this.buy();
	}

	private panic(why: string) {
		throw new OrderMakerPanicError(why);
	}

	public buy() {
		this.page.click("div[data-name='side-control-buy']");
		return this;
	}

	public sell() {
		this.page.click("div[data-name='side-control-buy']");
		return this;
	}

	public type(order: "market" | "limit" | "stop" | "stoplimit") {
		let self = this;
		function clickTab(dv: number, name: string) {
			self.page.$(`div[data-type='tab-item' data-value='${dv}']`).then((elm) => {
				if (!elm.toString().includes(name)) return self.panic(`${name} tab isn't the ${name} tab anymore`);
				elm.click();
			});
		}

		this.page.waitForNavigation().then((_) => {});

		switch (order) {
			case "market":
				clickTab(2, "Market");
				break;

			case "limit":
				clickTab(1, "Limit");
				break;

			case "stop":
				clickTab(3, "Stop");
				break;

			case "stoplimit":
				clickTab(4, "Stop Limit");
				break;

			default:
				self.panic(`'${order}' isn't a valid order type`);
		}
	}

	public submit() {
		this.page.click("div[data-name='side-control-buy']");
		return this;
	}
}
