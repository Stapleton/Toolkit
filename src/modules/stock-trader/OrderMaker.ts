/**
 * OrderMaker
 *
 * @format
 */

/***** Imports *****/
import { Page } from "puppeteer";
import { OrderMaker as QS } from "../../../src/modules/stock-trader/QueryStrings.json";
import { typeOneEl, clickEl, tapOneEl } from "../../../src/modules/stock-trader/ElementAbuse";

/***** Interfaces *****/
type OrderType = "market" | "limit" | "stop" | "stoplimit";

/*
enum TPKeys {
	ticks = 1,
	price,
	cad,
	percent,
}

enum SLKeys {
	ticks = 7,
	price,
	cad,
	percent,
}
*/
/***** Errors *****/
class OrderMakerError extends Error {
	constructor(why: string) {
		super(why);
	}
}

/***** Setup *****/ // ! Big Brain Builder Class Comin Thru
export default class OrderMaker {
	private page: Page;
	private type: OrderType;
	//private risk = false;
	private logger;

	constructor(page: Page, logger: any) {
		this.logger = logger.scope("Mods.StockTrader.OrderMaker");
		this.page = page;
		this.logger.start("Initializing");
	}

	private panic(why: string) {
		throw new OrderMakerError(why);
	}

	public buy() {
		clickEl(QS.button.Buy, this.page);
		return this;
	}

	public sell() {
		clickEl(QS.button.Sell, this.page);
		return this;
	}

	public order(type: "market" | "limit" | "stop" | "stoplimit") {
		let self = this; /*
		function clickTab(dv: number, name: string) {
			self.page.$(`div[data-type='tab-item' data-value='${dv}']`).then((elm) => {
				if (!elm.toString().includes(name)) return self.panic(`${name} tab isn't the ${name} tab anymore`);
				elm.click();
			});
		}*/
		this.type = type;

		this.page.waitForNavigation().then((_) => {});

		switch (type) {
			case "market":
				clickEl(QS.button.Market, this.page);
				break;

			case "limit":
				clickEl(QS.button.Limit, this.page);
				break;

			case "stop":
				clickEl(QS.button.Stop, this.page);
				break;

			case "stoplimit":
				clickEl(QS.button.StopLimit, this.page);
				break;

			default:
				self.panic(`'${type}' isn't a valid order type`);
		}

		return this;
	}

	public lots(count: number) {
		if (this.type == "market") typeOneEl(QS.input, 0, this.page, String(count));
		if (this.type == "limit" || "stop") typeOneEl(QS.input, 2, this.page, String(count));
		if (this.type == "stoplimit") typeOneEl(QS.input, 4, this.page, String(count));
		return this;
	}

	public setValue(index: number, amt: number) {
		typeOneEl(QS.input, index, this.page, String(amt));
		return this;
	}

	public stopLoss(CADRisk: number, PercentRisk: number) {
		tapOneEl(QS.checkbox, 1, this.page);
		//this.risk = true;

		if (this.type == "market") {
			typeOneEl(QS.input, 1, this.page, String(CADRisk));
			typeOneEl(QS.input, 2, this.page, String(PercentRisk));
		}

		if (this.type == "limit" || "stop") {
			typeOneEl(QS.input, 3, this.page, String(CADRisk));
			typeOneEl(QS.input, 4, this.page, String(PercentRisk));
		}

		if (this.type == "stoplimit") {
			typeOneEl(QS.input, 5, this.page, String(CADRisk));
			typeOneEl(QS.input, 6, this.page, String(PercentRisk));
		}

		return this;
	}

	public submit() {
		clickEl(QS.button.Submit, this.page);
		return this;
	}
}
