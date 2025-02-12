"use strict";
/**
 * OrderMaker
 *
 * @format
 */
Object.defineProperty(exports, "__esModule", { value: true });
const QueryStrings_json_1 = require("../../../src/modules/stock-trader/QueryStrings.json");
const ElementAbuse_1 = require("../../../src/modules/stock-trader/ElementAbuse");
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
    constructor(why) {
        super(why);
    }
}
/***** Setup *****/ // ! Big Brain Builder Class Comin Thru
class OrderMaker {
    page;
    type;
    //private risk = false;
    logger;
    constructor(page, logger) {
        this.logger = logger.scope("Mods.StockTrader.OrderMaker");
        this.page = page;
        this.logger.start("Initializing");
    }
    panic(why) {
        throw new OrderMakerError(why);
    }
    buy() {
        (0, ElementAbuse_1.clickEl)(QueryStrings_json_1.OrderMaker.button.Buy, this.page);
        return this;
    }
    sell() {
        (0, ElementAbuse_1.clickEl)(QueryStrings_json_1.OrderMaker.button.Sell, this.page);
        return this;
    }
    order(type) {
        let self = this; /*
        function clickTab(dv: number, name: string) {
            self.page.$(`div[data-type='tab-item' data-value='${dv}']`).then((elm) => {
                if (!elm.toString().includes(name)) return self.panic(`${name} tab isn't the ${name} tab anymore`);
                elm.click();
            });
        }*/
        this.type = type;
        this.page.waitForNavigation().then((_) => { });
        switch (type) {
            case "market":
                (0, ElementAbuse_1.clickEl)(QueryStrings_json_1.OrderMaker.button.Market, this.page);
                break;
            case "limit":
                (0, ElementAbuse_1.clickEl)(QueryStrings_json_1.OrderMaker.button.Limit, this.page);
                break;
            case "stop":
                (0, ElementAbuse_1.clickEl)(QueryStrings_json_1.OrderMaker.button.Stop, this.page);
                break;
            case "stoplimit":
                (0, ElementAbuse_1.clickEl)(QueryStrings_json_1.OrderMaker.button.StopLimit, this.page);
                break;
            default:
                self.panic(`'${type}' isn't a valid order type`);
        }
        return this;
    }
    lots(count) {
        if (this.type == "market")
            (0, ElementAbuse_1.typeOneEl)(QueryStrings_json_1.OrderMaker.input, 0, this.page, String(count));
        if (this.type == "limit" || "stop")
            (0, ElementAbuse_1.typeOneEl)(QueryStrings_json_1.OrderMaker.input, 2, this.page, String(count));
        if (this.type == "stoplimit")
            (0, ElementAbuse_1.typeOneEl)(QueryStrings_json_1.OrderMaker.input, 4, this.page, String(count));
        return this;
    }
    setValue(index, amt) {
        (0, ElementAbuse_1.typeOneEl)(QueryStrings_json_1.OrderMaker.input, index, this.page, String(amt));
        return this;
    }
    stopLoss(CADRisk, PercentRisk) {
        (0, ElementAbuse_1.tapOneEl)(QueryStrings_json_1.OrderMaker.checkbox, 1, this.page);
        //this.risk = true;
        if (this.type == "market") {
            (0, ElementAbuse_1.typeOneEl)(QueryStrings_json_1.OrderMaker.input, 1, this.page, String(CADRisk));
            (0, ElementAbuse_1.typeOneEl)(QueryStrings_json_1.OrderMaker.input, 2, this.page, String(PercentRisk));
        }
        if (this.type == "limit" || "stop") {
            (0, ElementAbuse_1.typeOneEl)(QueryStrings_json_1.OrderMaker.input, 3, this.page, String(CADRisk));
            (0, ElementAbuse_1.typeOneEl)(QueryStrings_json_1.OrderMaker.input, 4, this.page, String(PercentRisk));
        }
        if (this.type == "stoplimit") {
            (0, ElementAbuse_1.typeOneEl)(QueryStrings_json_1.OrderMaker.input, 5, this.page, String(CADRisk));
            (0, ElementAbuse_1.typeOneEl)(QueryStrings_json_1.OrderMaker.input, 6, this.page, String(PercentRisk));
        }
        return this;
    }
    submit() {
        (0, ElementAbuse_1.clickEl)(QueryStrings_json_1.OrderMaker.button.Submit, this.page);
        return this;
    }
}
exports.default = OrderMaker;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3JkZXJNYWtlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2R1bGVzL3N0b2NrLXRyYWRlci9PcmRlck1ha2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHOztBQUlILDJGQUF1RjtBQUN2RixpRkFBOEY7QUFLOUY7Ozs7Ozs7Ozs7Ozs7O0VBY0U7QUFDRixvQkFBb0I7QUFDcEIsTUFBTSxlQUFnQixTQUFRLEtBQUs7SUFDbEMsWUFBWSxHQUFXO1FBQ3RCLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNaLENBQUM7Q0FDRDtBQUVELG1CQUFtQixDQUFDLHVDQUF1QztBQUMzRCxNQUFxQixVQUFVO0lBQ3RCLElBQUksQ0FBTztJQUNYLElBQUksQ0FBWTtJQUN4Qix1QkFBdUI7SUFDZixNQUFNLENBQUM7SUFFZixZQUFZLElBQVUsRUFBRSxNQUFXO1FBQ2xDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFTyxLQUFLLENBQUMsR0FBVztRQUN4QixNQUFNLElBQUksZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFTSxHQUFHO1FBQ1QsSUFBQSxzQkFBTyxFQUFDLDhCQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEMsT0FBTyxJQUFJLENBQUM7SUFDYixDQUFDO0lBRU0sSUFBSTtRQUNWLElBQUEsc0JBQU8sRUFBQyw4QkFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25DLE9BQU8sSUFBSSxDQUFDO0lBQ2IsQ0FBQztJQUVN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TUFBTSxFQUFFLENBQUM7WUFDcEMsSUFBQSx3QkFBUyxFQUFDLDhCQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ25ELElBQUEsd0JBQVMsRUFBQyw4QkFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUN4RCxDQUFDO1FBRUQsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO1lBQzlCLElBQUEsd0JBQVMsRUFBQyw4QkFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNuRCxJQUFBLHdCQUFTLEVBQUMsOEJBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDeEQsQ0FBQztRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2IsQ0FBQztJQUVNLE1BQU07UUFDWixJQUFBLHNCQUFPLEVBQUMsOEJBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQyxPQUFPLElBQUksQ0FBQztJQUNiLENBQUM7Q0FDRDtBQXBHRCw2QkFvR0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogT3JkZXJNYWtlclxyXG4gKlxyXG4gKiBAZm9ybWF0XHJcbiAqL1xyXG5cclxuLyoqKioqIEltcG9ydHMgKioqKiovXHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwicHVwcGV0ZWVyXCI7XHJcbmltcG9ydCB7IE9yZGVyTWFrZXIgYXMgUVMgfSBmcm9tIFwiLi4vLi4vLi4vc3JjL21vZHVsZXMvc3RvY2stdHJhZGVyL1F1ZXJ5U3RyaW5ncy5qc29uXCI7XHJcbmltcG9ydCB7IHR5cGVPbmVFbCwgY2xpY2tFbCwgdGFwT25lRWwgfSBmcm9tIFwiLi4vLi4vLi4vc3JjL21vZHVsZXMvc3RvY2stdHJhZGVyL0VsZW1lbnRBYnVzZVwiO1xyXG5cclxuLyoqKioqIEludGVyZmFjZXMgKioqKiovXHJcbnR5cGUgT3JkZXJUeXBlID0gXCJtYXJrZXRcIiB8IFwibGltaXRcIiB8IFwic3RvcFwiIHwgXCJzdG9wbGltaXRcIjtcclxuXHJcbi8qXHJcbmVudW0gVFBLZXlzIHtcclxuXHR0aWNrcyA9IDEsXHJcblx0cHJpY2UsXHJcblx0Y2FkLFxyXG5cdHBlcmNlbnQsXHJcbn1cclxuXHJcbmVudW0gU0xLZXlzIHtcclxuXHR0aWNrcyA9IDcsXHJcblx0cHJpY2UsXHJcblx0Y2FkLFxyXG5cdHBlcmNlbnQsXHJcbn1cclxuKi9cclxuLyoqKioqIEVycm9ycyAqKioqKi9cclxuY2xhc3MgT3JkZXJNYWtlckVycm9yIGV4dGVuZHMgRXJyb3Ige1xyXG5cdGNvbnN0cnVjdG9yKHdoeTogc3RyaW5nKSB7XHJcblx0XHRzdXBlcih3aHkpO1xyXG5cdH1cclxufVxyXG5cclxuLyoqKioqIFNldHVwICoqKioqLyAvLyAhIEJpZyBCcmFpbiBCdWlsZGVyIENsYXNzIENvbWluIFRocnVcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3JkZXJNYWtlciB7XHJcblx0cHJpdmF0ZSBwYWdlOiBQYWdlO1xyXG5cdHByaXZhdGUgdHlwZTogT3JkZXJUeXBlO1xyXG5cdC8vcHJpdmF0ZSByaXNrID0gZmFsc2U7XHJcblx0cHJpdmF0ZSBsb2dnZXI7XHJcblxyXG5cdGNvbnN0cnVjdG9yKHBhZ2U6IFBhZ2UsIGxvZ2dlcjogYW55KSB7XHJcblx0XHR0aGlzLmxvZ2dlciA9IGxvZ2dlci5zY29wZShcIk1vZHMuU3RvY2tUcmFkZXIuT3JkZXJNYWtlclwiKTtcclxuXHRcdHRoaXMucGFnZSA9IHBhZ2U7XHJcblx0XHR0aGlzLmxvZ2dlci5zdGFydChcIkluaXRpYWxpemluZ1wiKTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgcGFuaWMod2h5OiBzdHJpbmcpIHtcclxuXHRcdHRocm93IG5ldyBPcmRlck1ha2VyRXJyb3Iod2h5KTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBidXkoKSB7XHJcblx0XHRjbGlja0VsKFFTLmJ1dHRvbi5CdXksIHRoaXMucGFnZSk7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZWxsKCkge1xyXG5cdFx0Y2xpY2tFbChRUy5idXR0b24uU2VsbCwgdGhpcy5wYWdlKTtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH1cclxuXHJcblx0cHVibGljIG9yZGVyKHR5cGU6IFwibWFya2V0XCIgfCBcImxpbWl0XCIgfCBcInN0b3BcIiB8IFwic3RvcGxpbWl0XCIpIHtcclxuXHRcdGxldCBzZWxmID0gdGhpczsgLypcclxuXHRcdGZ1bmN0aW9uIGNsaWNrVGFiKGR2OiBudW1iZXIsIG5hbWU6IHN0cmluZykge1xyXG5cdFx0XHRzZWxmLnBhZ2UuJChgZGl2W2RhdGEtdHlwZT0ndGFiLWl0ZW0nIGRhdGEtdmFsdWU9JyR7ZHZ9J11gKS50aGVuKChlbG0pID0+IHtcclxuXHRcdFx0XHRpZiAoIWVsbS50b1N0cmluZygpLmluY2x1ZGVzKG5hbWUpKSByZXR1cm4gc2VsZi5wYW5pYyhgJHtuYW1lfSB0YWIgaXNuJ3QgdGhlICR7bmFtZX0gdGFiIGFueW1vcmVgKTtcclxuXHRcdFx0XHRlbG0uY2xpY2soKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9Ki9cclxuXHRcdHRoaXMudHlwZSA9IHR5cGU7XHJcblxyXG5cdFx0dGhpcy5wYWdlLndhaXRGb3JOYXZpZ2F0aW9uKCkudGhlbigoXykgPT4ge30pO1xyXG5cclxuXHRcdHN3aXRjaCAodHlwZSkge1xyXG5cdFx0XHRjYXNlIFwibWFya2V0XCI6XHJcblx0XHRcdFx0Y2xpY2tFbChRUy5idXR0b24uTWFya2V0LCB0aGlzLnBhZ2UpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSBcImxpbWl0XCI6XHJcblx0XHRcdFx0Y2xpY2tFbChRUy5idXR0b24uTGltaXQsIHRoaXMucGFnZSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIFwic3RvcFwiOlxyXG5cdFx0XHRcdGNsaWNrRWwoUVMuYnV0dG9uLlN0b3AsIHRoaXMucGFnZSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIFwic3RvcGxpbWl0XCI6XHJcblx0XHRcdFx0Y2xpY2tFbChRUy5idXR0b24uU3RvcExpbWl0LCB0aGlzLnBhZ2UpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRzZWxmLnBhbmljKGAnJHt0eXBlfScgaXNuJ3QgYSB2YWxpZCBvcmRlciB0eXBlYCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgbG90cyhjb3VudDogbnVtYmVyKSB7XHJcblx0XHRpZiAodGhpcy50eXBlID09IFwibWFya2V0XCIpIHR5cGVPbmVFbChRUy5pbnB1dCwgMCwgdGhpcy5wYWdlLCBTdHJpbmcoY291bnQpKTtcclxuXHRcdGlmICh0aGlzLnR5cGUgPT0gXCJsaW1pdFwiIHx8IFwic3RvcFwiKSB0eXBlT25lRWwoUVMuaW5wdXQsIDIsIHRoaXMucGFnZSwgU3RyaW5nKGNvdW50KSk7XHJcblx0XHRpZiAodGhpcy50eXBlID09IFwic3RvcGxpbWl0XCIpIHR5cGVPbmVFbChRUy5pbnB1dCwgNCwgdGhpcy5wYWdlLCBTdHJpbmcoY291bnQpKTtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldFZhbHVlKGluZGV4OiBudW1iZXIsIGFtdDogbnVtYmVyKSB7XHJcblx0XHR0eXBlT25lRWwoUVMuaW5wdXQsIGluZGV4LCB0aGlzLnBhZ2UsIFN0cmluZyhhbXQpKTtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHN0b3BMb3NzKENBRFJpc2s6IG51bWJlciwgUGVyY2VudFJpc2s6IG51bWJlcikge1xyXG5cdFx0dGFwT25lRWwoUVMuY2hlY2tib3gsIDEsIHRoaXMucGFnZSk7XHJcblx0XHQvL3RoaXMucmlzayA9IHRydWU7XHJcblxyXG5cdFx0aWYgKHRoaXMudHlwZSA9PSBcIm1hcmtldFwiKSB7XHJcblx0XHRcdHR5cGVPbmVFbChRUy5pbnB1dCwgMSwgdGhpcy5wYWdlLCBTdHJpbmcoQ0FEUmlzaykpO1xyXG5cdFx0XHR0eXBlT25lRWwoUVMuaW5wdXQsIDIsIHRoaXMucGFnZSwgU3RyaW5nKFBlcmNlbnRSaXNrKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMudHlwZSA9PSBcImxpbWl0XCIgfHwgXCJzdG9wXCIpIHtcclxuXHRcdFx0dHlwZU9uZUVsKFFTLmlucHV0LCAzLCB0aGlzLnBhZ2UsIFN0cmluZyhDQURSaXNrKSk7XHJcblx0XHRcdHR5cGVPbmVFbChRUy5pbnB1dCwgNCwgdGhpcy5wYWdlLCBTdHJpbmcoUGVyY2VudFJpc2spKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy50eXBlID09IFwic3RvcGxpbWl0XCIpIHtcclxuXHRcdFx0dHlwZU9uZUVsKFFTLmlucHV0LCA1LCB0aGlzLnBhZ2UsIFN0cmluZyhDQURSaXNrKSk7XHJcblx0XHRcdHR5cGVPbmVFbChRUy5pbnB1dCwgNiwgdGhpcy5wYWdlLCBTdHJpbmcoUGVyY2VudFJpc2spKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzdWJtaXQoKSB7XHJcblx0XHRjbGlja0VsKFFTLmJ1dHRvbi5TdWJtaXQsIHRoaXMucGFnZSk7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9XHJcbn1cclxuIl19