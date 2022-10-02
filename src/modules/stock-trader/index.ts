/**
 * Modules Entry File
 *
 * @format
 */

/***** Imports *****/
import { Module } from "@Core/lib/Module";
import Toolkit from "@Toolkit";
import { Auth } from "@Mods/stock-trader/auth.json";
import { Info } from "@Mods/stock-trader/stock-trader.json";
import Sleep from "@Core/lib/Sleep";
import Puppeteer from "puppeteer";
import { IModConfig, ModRequires, ModType } from "@Core/lib/ModConfig";

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
const Logger = Toolkit.Logger.Mods.scope("Mod/Stock Trader");
Logger.start("Initializing");

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

	private async typeEl(query: string, page: Puppeteer.Page, text: string): Promise<void> {
		await page.type(query, text);
		Sleep(500);
	}

	private async tapEl(query: string, page: Puppeteer.Page): Promise<void> {
		let t = page.touchscreen;
		await t.tap(...(await this.getElPos(query, page)));
		Sleep(500);
	}

	// * This is a fucking godsend
	private async getElPos(query: string, page: Puppeteer.Page): Promise<[number, number]> {
		let e = await (await page.$(query)).clickablePoint();
		return [e.x, e.y];
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

		Logger.await(`Logging into TradingView...`);
		this.loginToTradingView(Browser);
	}

	private async loginToTradingView(browser: Puppeteer.Browser) {
		let self = this,
			page = await browser.pages();

		Logger.pending(`Heading to ${this.config.Puppet.initLink}`);
		await page[0].goto(this.config.Puppet.initLink);

		page[0].once("load", await execute);

		async function execute() {
			await self.tapEl("button[aria-label='Open user menu']", page[0]);
			await self.tapEl("button[data-name='header-user-menu-sign-in']", page[0]);
			await self.tapEl(".js-show-email", page[0]);
			await self.typeEl("input[name='username']", page[0], Auth.TradingView.user);
			await self.typeEl("input[name='password']", page[0], Auth.TradingView.pass);
			await self.tapEl("button[type='submit']", page[0]);
			//Sleep(2000);

			Logger.await(`Opening Orders...`);
			await self.openOrders(browser);
		}

		execute.name;
	}

	private async openOrders(browser: Puppeteer.Browser) {
		let self = this,
			page = await browser.pages();

		Logger.pending(`Heading to ${this.config.Puppet.chartLink}`);
		page[0].goto(this.config.Puppet.chartLink);

		//page[0].once("load", execute);

		async function execute() {
			try {
				page[0].$("div[data-name='order-panel']");
			} catch (e) {
				await self.tapEl("div[data-name='order-panel-button']", page[0]);
			} finally {
				Sleep(3000);
				await (await page[0].$("div[data-broker='EIGHTCAP']")).hover();
				Sleep(500);
				await self.tapEl("div[data-broker='EIGHTCAP'] button span[class^='content']", page[0]);
				await self.typeEl(
					"div[data-name='broker-login-dialog'] input[id='username']",
					page[0],
					Auth.EightCap.user
				);
				await self.typeEl(
					"div[data-name='broker-login-dialog'] input[id='password']",
					page[0],
					Auth.EightCap.pass
				);
				await self.tapEl("button[name='broker-login-submit-button']", page[0]);
			}
		}

		execute.name;
	}
}

new StockTrader();
