/**
 * Stock Trader Entry File
 *
 * @format
 */

/***** Imports *****/
import Toolkit from "@Toolkit";
import Puppeteer from "puppeteer";
import Sleep from "@Core/lib/Sleep";
import Module from "@Core/lib/Module";
import OrderMaker from "@Mods/stock-trader/OrderMaker";
import { StockTrader as Auth } from "@Config/auth.json";
import { Info } from "@Mods/stock-trader/stock-trader.json";
import { clickEl, typeEl } from "@Mods/stock-trader/ElementAbuse";
import { IModConfig, ModRequires, ModType } from "@Core/lib/ModConfig";
import { Login as LoginFlow } from "@Mods/stock-trader/QueryStrings.json";

/***** Interfaces *****/
interface StockTraderConfig extends IModConfig {
	Puppet: {
		headless: boolean;
		initLink: string;
		chartLink: string;

		View: {
			width: number;
			height: number;
		};
	};
}

/***** Setup *****/
const Logger = Toolkit.Logger.Mods.scope("Mods.Stock Trader");
Logger.start([`Initializing ${Info.name}`, `Module Version: ${Info.version}`, `Module ID: ${Info.id}`].join("\n"));

class StockTrader extends Module {
	protected config = <StockTraderConfig>this._config.getConfig();

	constructor() {
		super(Info.name, Info.id, Info.version, <ModType>Info.type, <ModRequires>Info.requires);

		this.startTime(this._name); // Start logger timer without timer auto log

		this.setupPuppeteer().then((_) => {
			Logger.complete(`Spawned. Took ${this.stopTime().span}ms. Closing Puppet...`);
		});
	}

	private startTime(label: string): void {
		Logger.disable();
		Logger.time(label);
		Logger.enable();
	}

	private stopTime(): { label: string; span?: number } {
		let time;

		Logger.disable();
		time = Logger.timeEnd();
		Logger.enable();

		return time;
	}

	private async setupPuppeteer() {
		Logger.info(`Launching Puppet...`);
		const Browser = await Puppeteer.launch({ headless: this.config.Puppet.headless });
		let Pages = await Browser.pages();

		Logger.info(`Changing Viewport Size to 1000x850...`);
		await Pages[0].setViewport({
			width: 1000,
			height: 850,
		});

		await this.loginToTradingView(Browser);
		Logger.await(`Logging into TradingView...`);
	}

	private async loginToTradingView(browser: Puppeteer.Browser) {
		let self = this,
			page = await browser.pages(),
			QS = LoginFlow.TradingView;

		Logger.pending(`Heading to ${this.config.Puppet.initLink}`);
		page[0].goto(this.config.Puppet.initLink).then(execute);

		async function execute() {
			await clickEl(QS.button.UserMenu, page[0]);
			await clickEl(QS.button.SignIn, page[0]);
			await clickEl(QS.button.Email, page[0]);
			await typeEl(QS.input.Username, page[0], Auth.TradingView.user);
			await typeEl(QS.input.Password, page[0], Auth.TradingView.pass);
			await clickEl(QS.button.Submit, page[0]);
			Sleep(2000);

			Logger.await(`Opening Orders...`);
			await self.loginToBroker(browser);
		}

		//execute.name;
	}

	private async loginToBroker(browser: Puppeteer.Browser) {
		let page = await browser.pages(),
			QS = LoginFlow.Broker;

		Logger.pending(`Heading to ${this.config.Puppet.chartLink}`);
		page[0].goto(this.config.Puppet.chartLink).then(execute);

		async function execute() {
			try {
				page[0].$(QS.grid.OrderPanel);
			} catch (e) {
				Logger.error(`Order Button was already button somehow ???\n${e}`);
				clickEl(QS.button.OrderPanel, page[0]);
			} finally {
				Sleep(3000);
				await (await page[0].$(QS.grid.EightCap)).hover();
				Sleep(500);
				await clickEl(QS.button.EightCap, page[0]);
				await typeEl(QS.input.Username, page[0], Auth.EightCap.user);
				await typeEl(QS.input.Password, page[0], Auth.EightCap.pass);
				await clickEl(QS.button.Submit, page[0]);
			}
			Sleep(4000);
			new OrderMaker(page[0]).buy().order("stoplimit").lots(1).setValue(6, 10000).setValue(0, 12000);
			//execute.name;
		}
	}
}

new StockTrader();
