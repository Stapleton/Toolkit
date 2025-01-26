/**
 * Modules Entry File
 *
 * @format
 */

/***** Imports *****/
import * as toml from "toml";
import Toolkit from "../../../src/Toolkit";
import { Signale } from "signale";
import { readFileSync } from "fs";
import { Module } from "../../../src/core/lib/Module";
import { IModConfig } from "../../../src/core/lib/Module";

/***** Types *****/
type Gradient = {
	bound: number;
	steps: number;
};

/***** Interfaces *****/

interface StockTraderConfig extends IModConfig {
	algo: {
		spread: "even" | "exp";
		metric: "points" | "dollars";
		bound: {
			supply: number;
			demand: number;
		};
	};
	test: {
		enabled: boolean;
		stepsMax: number;
		stepsMin: number;
	};
}

/***** Setup *****/
const sleep = (ms: number) => {
	Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
};
const Config: StockTraderConfig = toml.parse(readFileSync(`${Toolkit.Paths.Config}\\stock-trader.toml`, "utf8"));
const Logger = Toolkit.Logger.Mods.scope("Mod/Stock Trader");
Logger.start("Initializing");

export default class StockTrader extends Module {
	private AlgoStatusTicker: Signale = new Signale({ interactive: true, scope: "Mod/Stock Trader" });
	private price: Array<number> = [];
	private median: number;
	private upper: Gradient;
	private lower: Gradient;
	private stepUp: number;
	private stepDown: number;
	private spread: Array<number> | number;

	private delta: () => number = () => {
		return this.price[this.price.length - 1] - this.median;
	};

	private stepCount: () => number = () => {
		return this.delta().toString().includes("-") ? this.delta() / this.stepDown : this.delta() / this.stepUp;
	};

	constructor() {
		super(Config.name, Config.id, Config.version, Config.type, Config.requires);

		// TODO: Feed in real stock ticker data
		this.upper = this.setGradient(150, 5);
		this.lower = this.setGradient(50, 3);
		this.setTestBounds();
		this.median = (this.upper.bound + this.lower.bound) / 2;

		for (let i = 0; i <= 4; i++) {
			sleep(1000);
			this.runSim();
		}
	}

	private runSim(): void {
		this.price[this.price.length] = this.getRandomPrice(this.lower.bound, this.upper.bound);
		this.stepDown = Number(((this.median - this.lower.bound) / this.lower.steps).toFixed(2));
		this.stepUp = Number(((this.upper.bound - this.median) / this.upper.steps).toFixed(2));

		if (Config.algo.spread == "even") this.evenlySpread();
		if (Config.algo.spread == "exp") this.exponentialSpread();

		this.AlgoStatusTicker.info(
			"\nUpper Bound: " +
				this.upper.bound +
				"\nLower Bound: " +
				this.lower.bound +
				"\nCurrent Median: " +
				this.median.toFixed(2) +
				"\nCurrent Stock Price: " +
				this.price[this.price.length - 1] +
				"\nStep Down Amount: " +
				this.stepDown +
				"\nStep Up Amount: " +
				this.stepUp +
				"\nPrice History: " +
				this.price.join(", ")
		);
		this.makeMoves();
	}

	private makeMoves(): void {
		let delta = this.delta(),
			steps = delta.toString().includes("-") ? delta / this.stepDown : delta / this.stepUp;

		Logger.note(`\nStock Price/Median Delta: $${delta.toFixed(2)}`);
		Logger.note(`${Math.floor(Math.abs(steps))}`);
	}

	private exponentialSpread(): Array<number> {
		let delta = this.delta(),
			exp = [Number((delta * 0.01).toFixed(2)), Number((delta * 0.5).toFixed(2)), Number(delta.toFixed(2))];

		Logger.info(`Spread, Exponential: ${exp}`);
		return exp;
	}

	private evenlySpread(): number {
		let delta = this.delta(),
			spread = delta / this.stepCount();
		Logger.info(`Spread, Even: ${this.spread}`);
		return spread;
	}

	private setTestBounds(): void {
		if (!Config.test.enabled) return;
		this.upper.bound = Config.algo.bound.supply;
		this.upper.steps = Config.test.stepsMax;
		this.lower.bound = Config.algo.bound.demand;
		this.lower.steps = Config.test.stepsMin;
	}

	private getRandomPrice(min: number, max: number): number {
		min = Math.ceil(min);
		max = Math.floor(max);
		let num = `${Math.floor(Math.random() * (max - min) + min)}`;
		num = `${num}.${Math.floor(Math.random() * (100 - 0) + 0)}`;
		return Number(num);
	}

	private setGradient(bound: number, steps: number): Gradient {
		return {
			bound: bound,
			steps: steps,
		};
	}
}

new StockTrader();

// ! MY BRAIN IS FUCKING HUGE
