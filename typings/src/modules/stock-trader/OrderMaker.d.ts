/**
 * OrderMaker
 *
 * @format
 */
/***** Imports *****/
import { Page } from "puppeteer";
/***** Setup *****/ export default class OrderMaker {
    private page;
    private type;
    private logger;
    constructor(page: Page, logger: any);
    private panic;
    buy(): this;
    sell(): this;
    order(type: "market" | "limit" | "stop" | "stoplimit"): this;
    lots(count: number): this;
    setValue(index: number, amt: number): this;
    stopLoss(CADRisk: number, PercentRisk: number): this;
    submit(): this;
}
//# sourceMappingURL=OrderMaker.d.ts.map