/**
 * Modules Entry File
 *
 * @format
 */

/***** Imports *****/
import { readFileSync } from "fs";
import * as toml from "toml";
import Module, { ModConfig } from "@Core/lib/Module";
import Toolkit from "@Toolkit";

/***** Types *****/
type Gradient = {
  bound: number;
  steps: number;
};

/***** Setup *****/
const Config: ModConfig = toml.parse(readFileSync(`${Toolkit.Paths.Config}\\stock-trader.toml`, "utf8"));
const Logger = Toolkit.Logger.Mods.scope("Mod/Stock Trader");
Logger.start("Initializing");

export default class StockTrader extends Module {
  private median: number;
  private upper: Gradient;
  private lower: Gradient;

  constructor() {
    super(Config.name, Config.id, Config.version, Config.type, Config.requires);

    // TODO: Feed in real stock ticker data
    this.upper = this.setGradient(150, 5);
    this.lower = this.setGradient(50, 3);
    this.median = this.getRandomNumber(this.lower.bound, this.upper.bound);

    this.setTestBounds();
    Logger.info(this.median);
  }

  private setTestBounds(): void {
    if (!Config.test.enabled) return;
    this.upper.bound = Config.test.randomMax;
    this.lower.bound = Config.test.randomMin;
  }

  private getRandomNumber(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  private setGradient(bound: number, steps: number): Gradient {
    return {
      bound: bound,
      steps: steps,
    };
  }
}

new StockTrader();
