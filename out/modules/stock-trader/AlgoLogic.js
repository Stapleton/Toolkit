"use strict";
/**
 * Modules Entry File
 *
 * @format
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/***** Imports *****/
const toml = __importStar(require("toml"));
const signale_1 = require("signale");
const fs_1 = require("fs");
const Module_1 = require("../../../src/core/lib/Module");
/***** Setup *****/
const sleep = (ms) => {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
};
const Config = toml.parse((0, fs_1.readFileSync)(`GETTHECONFIGPATHHERE\\stock-trader.toml`, "utf8"));
class StockTrader extends Module_1.Module {
    AlgoStatusTicker = new signale_1.Signale({ interactive: true, scope: "Mod/Stock Trader" });
    price = [];
    median;
    upper;
    lower;
    stepUp;
    stepDown;
    spread;
    logger = this.Logger.scope("Mod/Stock Trader");
    delta = () => {
        return this.price[this.price.length - 1] - this.median;
    };
    stepCount = () => {
        return this.delta().toString().includes("-") ? this.delta() / this.stepDown : this.delta() / this.stepUp;
    };
    constructor() {
        super(Config.module.name, Config.module.id, Config.module.version, Config.module.type, Config.module.requires);
        this.logger.start("Initializing");
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
    runSim() {
        this.price[this.price.length] = this.getRandomPrice(this.lower.bound, this.upper.bound);
        this.stepDown = Number(((this.median - this.lower.bound) / this.lower.steps).toFixed(2));
        this.stepUp = Number(((this.upper.bound - this.median) / this.upper.steps).toFixed(2));
        if (Config.algo.spread == "even")
            this.evenlySpread();
        if (Config.algo.spread == "exp")
            this.exponentialSpread();
        this.AlgoStatusTicker.info("\nUpper Bound: " +
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
            this.price.join(", "));
        this.makeMoves();
    }
    makeMoves() {
        let delta = this.delta(), steps = delta.toString().includes("-") ? delta / this.stepDown : delta / this.stepUp;
        this.logger.note(`\nStock Price/Median Delta: $${delta.toFixed(2)}`);
        this.logger.note(`${Math.floor(Math.abs(steps))}`);
    }
    exponentialSpread() {
        let delta = this.delta(), exp = [Number((delta * 0.01).toFixed(2)), Number((delta * 0.5).toFixed(2)), Number(delta.toFixed(2))];
        this.logger.info(`Spread, Exponential: ${exp}`);
        return exp;
    }
    evenlySpread() {
        let delta = this.delta(), spread = delta / this.stepCount();
        this.logger.info(`Spread, Even: ${this.spread}`);
        return spread;
    }
    setTestBounds() {
        if (!Config.test.enabled)
            return;
        this.upper.bound = Config.algo.bound.supply;
        this.upper.steps = Config.test.stepsMax;
        this.lower.bound = Config.algo.bound.demand;
        this.lower.steps = Config.test.stepsMin;
    }
    getRandomPrice(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        let num = `${Math.floor(Math.random() * (max - min) + min)}`;
        num = `${num}.${Math.floor(Math.random() * (100 - 0) + 0)}`;
        return Number(num);
    }
    setGradient(bound, steps) {
        return {
            bound: bound,
            steps: steps,
        };
    }
}
exports.default = StockTrader;
new StockTrader();
// ! MY BRAIN IS FUCKING HUGE
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWxnb0xvZ2ljLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZXMvc3RvY2stdHJhZGVyL0FsZ29Mb2dpYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFSCxxQkFBcUI7QUFDckIsMkNBQTZCO0FBQzdCLHFDQUFrQztBQUNsQywyQkFBa0M7QUFDbEMseURBQXNEO0FBMkJ0RCxtQkFBbUI7QUFDbkIsTUFBTSxLQUFLLEdBQUcsQ0FBQyxFQUFVLEVBQUUsRUFBRTtJQUM1QixPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksVUFBVSxDQUFDLElBQUksaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ2xFLENBQUMsQ0FBQztBQUNGLE1BQU0sTUFBTSxHQUFzQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUEsaUJBQVksRUFBQyx5Q0FBeUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBRTlHLE1BQXFCLFdBQVksU0FBUSxlQUFNO0lBQ3RDLGdCQUFnQixHQUFZLElBQUksaUJBQU8sQ0FBQyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLGtCQUFrQixFQUFFLENBQUMsQ0FBQztJQUMxRixLQUFLLEdBQWtCLEVBQUUsQ0FBQztJQUMxQixNQUFNLENBQVM7SUFDZixLQUFLLENBQVc7SUFDaEIsS0FBSyxDQUFXO0lBQ2hCLE1BQU0sQ0FBUztJQUNmLFFBQVEsQ0FBUztJQUNqQixNQUFNLENBQXlCO0lBQy9CLE1BQU0sR0FBcUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUVqRSxLQUFLLEdBQWlCLEdBQUcsRUFBRTtRQUNsQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FB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QUMsR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDO1FBQzdELEdBQUcsR0FBRyxHQUFHLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQzVELE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3BCLENBQUM7SUFFTyxXQUFXLENBQUMsS0FBYSxFQUFFLEtBQWE7UUFDL0MsT0FBTztZQUNOLEtBQUssRUFBRSxLQUFLO1lBQ1osS0FBSyxFQUFFLEtBQUs7U0FDWixDQUFDO0lBQ0gsQ0FBQztDQUNEO0FBM0dELDhCQTJHQztBQUVELElBQUksV0FBVyxFQUFFLENBQUM7QUFFbEIsNkJBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIE1vZHVsZXMgRW50cnkgRmlsZVxyXG4gKlxyXG4gKiBAZm9ybWF0XHJcbiAqL1xyXG5cclxuLyoqKioqIEltcG9ydHMgKioqKiovXHJcbmltcG9ydCAqIGFzIHRvbWwgZnJvbSBcInRvbWxcIjtcclxuaW1wb3J0IHsgU2lnbmFsZSB9IGZyb20gXCJzaWduYWxlXCI7XHJcbmltcG9ydCB7IHJlYWRGaWxlU3luYyB9IGZyb20gXCJmc1wiO1xyXG5pbXBvcnQgeyBNb2R1bGUgfSBmcm9tIFwiLi4vLi4vLi4vc3JjL2NvcmUvbGliL01vZHVsZVwiO1xyXG5pbXBvcnQgeyBJTW9kQ29uZmlnIH0gZnJvbSBcIi4uLy4uLy4uL3NyYy9jb3JlL2xpYi9Nb2R1bGVcIjtcclxuXHJcbi8qKioqKiBUeXBlcyAqKioqKi9cclxudHlwZSBHcmFkaWVudCA9IHtcclxuXHRib3VuZDogbnVtYmVyO1xyXG5cdHN0ZXBzOiBudW1iZXI7XHJcbn07XHJcblxyXG4vKioqKiogSW50ZXJmYWNlcyAqKioqKi9cclxuXHJcbmludGVyZmFjZSBTdG9ja1RyYWRlckNvbmZpZyBleHRlbmRzIElNb2RDb25maWcge1xyXG5cdGFsZ286IHtcclxuXHRcdHNwcmVhZDogXCJldmVuXCIgfCBcImV4cFwiO1xyXG5cdFx0bWV0cmljOiBcInBvaW50c1wiIHwgXCJkb2xsYXJzXCI7XHJcblx0XHRib3VuZDoge1xyXG5cdFx0XHRzdXBwbHk6IG51bWJlcjtcclxuXHRcdFx0ZGVtYW5kOiBudW1iZXI7XHJcblx0XHR9O1xyXG5cdH07XHJcblx0dGVzdDoge1xyXG5cdFx0ZW5hYmxlZDogYm9vbGVhbjtcclxuXHRcdHN0ZXBzTWF4OiBudW1iZXI7XHJcblx0XHRzdGVwc01pbjogbnVtYmVyO1xyXG5cdH07XHJcbn1cclxuXHJcbi8qKioqKiBTZXR1cCAqKioqKi9cclxuY29uc3Qgc2xlZXAgPSAobXM6IG51bWJlcikgPT4ge1xyXG5cdEF0b21pY3Mud2FpdChuZXcgSW50MzJBcnJheShuZXcgU2hhcmVkQXJyYXlCdWZmZXIoNCkpLCAwLCAwLCBtcyk7XHJcbn07XHJcbmNvbnN0IENvbmZpZzogU3RvY2tUcmFkZXJDb25maWcgPSB0b21sLnBhcnNlKHJlYWRGaWxlU3luYyhgR0VUVEhFQ09ORklHUEFUSEhFUkVcXFxcc3RvY2stdHJhZGVyLnRvbWxgLCBcInV0ZjhcIikpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RvY2tUcmFkZXIgZXh0ZW5kcyBNb2R1bGUge1xyXG5cdHByaXZhdGUgQWxnb1N0YXR1c1RpY2tlcjogU2lnbmFsZSA9IG5ldyBTaWduYWxlKHsgaW50ZXJhY3RpdmU6IHRydWUsIHNjb3BlOiBcIk1vZC9TdG9jayBUcmFkZXJcIiB9KTtcclxuXHRwcml2YXRlIHByaWNlOiBBcnJheTxudW1iZXI+ID0gW107XHJcblx0cHJpdmF0ZSBtZWRpYW46IG51bWJlcjtcclxuXHRwcml2YXRlIHVwcGVyOiBHcmFkaWVudDtcclxuXHRwcml2YXRlIGxvd2VyOiBHcmFkaWVudDtcclxuXHRwcml2YXRlIHN0ZXBVcDogbnVtYmVyO1xyXG5cdHByaXZhdGUgc3RlcERvd246IG51bWJlcjtcclxuXHRwcml2YXRlIHNwcmVhZDogQXJyYXk8bnVtYmVyPiB8IG51bWJlcjtcclxuXHRwcml2YXRlIGxvZ2dlcjogTW9kdWxlW1wiTG9nZ2VyXCJdID0gdGhpcy5Mb2dnZXIuc2NvcGUoXCJNb2QvU3RvY2sgVHJhZGVyXCIpO1xyXG5cclxuXHRwcml2YXRlIGRlbHRhOiAoKSA9PiBudW1iZXIgPSAoKSA9PiB7XHJcblx0XHRyZXR1cm4gdGhpcy5wcmljZVt0aGlzLnByaWNlLmxlbmd0aCAtIDFdIC0gdGhpcy5tZWRpYW47XHJcblx0fTtcclxuXHJcblx0cHJpdmF0ZSBzdGVwQ291bnQ6ICgpID0+IG51bWJlciA9ICgpID0+IHtcclxuXHRcdHJldHVybiB0aGlzLmRlbHRhKCkudG9TdHJpbmcoKS5pbmNsdWRlcyhcIi1cIikgPyB0aGlzLmRlbHRhKCkgLyB0aGlzLnN0ZXBEb3duIDogdGhpcy5kZWx0YSgpIC8gdGhpcy5zdGVwVXA7XHJcblx0fTtcclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRzdXBlcihDb25maWcubW9kdWxlLm5hbWUsIENvbmZpZy5tb2R1bGUuaWQsIENvbmZpZy5tb2R1bGUudmVyc2lvbiwgQ29uZmlnLm1vZHVsZS50eXBlLCBDb25maWcubW9kdWxlLnJlcXVpcmVzKTtcclxuXHRcdHRoaXMubG9nZ2VyLnN0YXJ0KFwiSW5pdGlhbGl6aW5nXCIpO1xyXG5cclxuXHRcdC8vIFRPRE86IEZlZWQgaW4gcmVhbCBzdG9jayB0aWNrZXIgZGF0YVxyXG5cdFx0dGhpcy51cHBlciA9IHRoaXMuc2V0R3JhZGllbnQoMTUwLCA1KTtcclxuXHRcdHRoaXMubG93ZXIgPSB0aGlzLnNldEdyYWRpZW50KDUwLCAzKTtcclxuXHRcdHRoaXMuc2V0VGVzdEJvdW5kcygpO1xyXG5cdFx0dGhpcy5tZWRpYW4gPSAodGhpcy51cHBlci5ib3VuZCArIHRoaXMubG93ZXIuYm91bmQpIC8gMjtcclxuXHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8PSA0OyBpKyspIHtcclxuXHRcdFx0c2xlZXAoMTAwMCk7XHJcblx0XHRcdHRoaXMucnVuU2ltKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHJ1blNpbSgpOiB2b2lkIHtcclxuXHRcdHRoaXMucHJpY2VbdGhpcy5wcmljZS5sZW5ndGhdID0gdGhpcy5nZXRSYW5kb21QcmljZSh0aGlzLmxvd2VyLmJvdW5kLCB0aGlzLnVwcGVyLmJvdW5kKTtcclxuXHRcdHRoaXMuc3RlcERvd24gPSBOdW1iZXIoKCh0aGlzLm1lZGlhbiAtIHRoaXMubG93ZXIuYm91bmQpIC8gdGhpcy5sb3dlci5zdGVwcykudG9GaXhlZCgyKSk7XHJcblx0XHR0aGlzLnN0ZXBVcCA9IE51bWJlcigoKHRoaXMudXBwZXIuYm91bmQgLSB0aGlzLm1lZGlhbikgLyB0aGlzLnVwcGVyLnN0ZXBzKS50b0ZpeGVkKDIpKTtcclxuXHJcblx0XHRpZiAoQ29uZmlnLmFsZ28uc3ByZWFkID09IFwiZXZlblwiKSB0aGlzLmV2ZW5seVNwcmVhZCgpO1xyXG5cdFx0aWYgKENvbmZpZy5hbGdvLnNwcmVhZCA9PSBcImV4cFwiKSB0aGlzLmV4cG9uZW50aWFsU3ByZWFkKCk7XHJcblxyXG5cdFx0dGhpcy5BbGdvU3RhdHVzVGlja2VyLmluZm8oXHJcblx0XHRcdFwiXFxuVXBwZXIgQm91bmQ6IFwiICtcclxuXHRcdFx0XHR0aGlzLnVwcGVyLmJvdW5kICtcclxuXHRcdFx0XHRcIlxcbkxvd2VyIEJvdW5kOiBcIiArXHJcblx0XHRcdFx0dGhpcy5sb3dlci5ib3VuZCArXHJcblx0XHRcdFx0XCJcXG5DdXJyZW50IE1lZGlhbjogXCIgK1xyXG5cdFx0XHRcdHRoaXMubWVkaWFuLnRvRml4ZWQoMikgK1xyXG5cdFx0XHRcdFwiXFxuQ3VycmVudCBTdG9jayBQcmljZTogXCIgK1xyXG5cdFx0XHRcdHRoaXMucHJpY2VbdGhpcy5wcmljZS5sZW5ndGggLSAxXSArXHJcblx0XHRcdFx0XCJcXG5TdGVwIERvd24gQW1vdW50OiBcIiArXHJcblx0XHRcdFx0dGhpcy5zdGVwRG93biArXHJcblx0XHRcdFx0XCJcXG5TdGVwIFVwIEFtb3VudDogXCIgK1xyXG5cdFx0XHRcdHRoaXMuc3RlcFVwICtcclxuXHRcdFx0XHRcIlxcblByaWNlIEhpc3Rvcnk6IFwiICtcclxuXHRcdFx0XHR0aGlzLnByaWNlLmpvaW4oXCIsIFwiKVxyXG5cdFx0KTtcclxuXHRcdHRoaXMubWFrZU1vdmVzKCk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIG1ha2VNb3ZlcygpOiB2b2lkIHtcclxuXHRcdGxldCBkZWx0YSA9IHRoaXMuZGVsdGEoKSxcclxuXHRcdFx0c3RlcHMgPSBkZWx0YS50b1N0cmluZygpLmluY2x1ZGVzKFwiLVwiKSA/IGRlbHRhIC8gdGhpcy5zdGVwRG93biA6IGRlbHRhIC8gdGhpcy5zdGVwVXA7XHJcblxyXG5cdFx0dGhpcy5sb2dnZXIubm90ZShgXFxuU3RvY2sgUHJpY2UvTWVkaWFuIERlbHRhOiAkJHtkZWx0YS50b0ZpeGVkKDIpfWApO1xyXG5cdFx0dGhpcy5sb2dnZXIubm90ZShgJHtNYXRoLmZsb29yKE1hdGguYWJzKHN0ZXBzKSl9YCk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGV4cG9uZW50aWFsU3ByZWFkKCk6IEFycmF5PG51bWJlcj4ge1xyXG5cdFx0bGV0IGRlbHRhID0gdGhpcy5kZWx0YSgpLFxyXG5cdFx0XHRleHAgPSBbTnVtYmVyKChkZWx0YSAqIDAuMDEpLnRvRml4ZWQoMikpLCBOdW1iZXIoKGRlbHRhICogMC41KS50b0ZpeGVkKDIpKSwgTnVtYmVyKGRlbHRhLnRvRml4ZWQoMikpXTtcclxuXHJcblx0XHR0aGlzLmxvZ2dlci5pbmZvKGBTcHJlYWQsIEV4cG9uZW50aWFsOiAke2V4cH1gKTtcclxuXHRcdHJldHVybiBleHA7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGV2ZW5seVNwcmVhZCgpOiBudW1iZXIge1xyXG5cdFx0bGV0IGRlbHRhID0gdGhpcy5kZWx0YSgpLFxyXG5cdFx0XHRzcHJlYWQgPSBkZWx0YSAvIHRoaXMuc3RlcENvdW50KCk7XHJcblx0XHR0aGlzLmxvZ2dlci5pbmZvKGBTcHJlYWQsIEV2ZW46ICR7dGhpcy5zcHJlYWR9YCk7XHJcblx0XHRyZXR1cm4gc3ByZWFkO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBzZXRUZXN0Qm91bmRzKCk6IHZvaWQge1xyXG5cdFx0aWYgKCFDb25maWcudGVzdC5lbmFibGVkKSByZXR1cm47XHJcblx0XHR0aGlzLnVwcGVyLmJvdW5kID0gQ29uZmlnLmFsZ28uYm91bmQuc3VwcGx5O1xyXG5cdFx0dGhpcy51cHBlci5zdGVwcyA9IENvbmZpZy50ZXN0LnN0ZXBzTWF4O1xyXG5cdFx0dGhpcy5sb3dlci5ib3VuZCA9IENvbmZpZy5hbGdvLmJvdW5kLmRlbWFuZDtcclxuXHRcdHRoaXMubG93ZXIuc3RlcHMgPSBDb25maWcudGVzdC5zdGVwc01pbjtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgZ2V0UmFuZG9tUHJpY2UobWluOiBudW1iZXIsIG1heDogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdG1pbiA9IE1hdGguY2VpbChtaW4pO1xyXG5cdFx0bWF4ID0gTWF0aC5mbG9vcihtYXgpO1xyXG5cdFx0bGV0IG51bSA9IGAke01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluKX1gO1xyXG5cdFx0bnVtID0gYCR7bnVtfS4ke01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxMDAgLSAwKSArIDApfWA7XHJcblx0XHRyZXR1cm4gTnVtYmVyKG51bSk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHNldEdyYWRpZW50KGJvdW5kOiBudW1iZXIsIHN0ZXBzOiBudW1iZXIpOiBHcmFkaWVudCB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRib3VuZDogYm91bmQsXHJcblx0XHRcdHN0ZXBzOiBzdGVwcyxcclxuXHRcdH07XHJcblx0fVxyXG59XHJcblxyXG5uZXcgU3RvY2tUcmFkZXIoKTtcclxuXHJcbi8vICEgTVkgQlJBSU4gSVMgRlVDS0lORyBIVUdFXHJcbiJdfQ==