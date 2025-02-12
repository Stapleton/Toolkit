/**
 * ChartReader
 *
 * @format
 */

import { Page } from "puppeteer";

/***** Imports *****/

/***** Interfaces *****/

/***** Errors *****/
class ChartReaderError extends Error {
	constructor(why: string) {
		super(why);
	}
}

/***** Setup *****/
//const Logger = Toolkit.Logger.Mods.scope("StockTrader/ChartReader");
//Logger.start("Initializing");

export default class ChartReader {}
