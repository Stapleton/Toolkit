"use strict";
/** @format */
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrapeIMDB = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const dp = __importStar(require("dom-parser"));
class ScrapeIMDB {
    url;
    constructor(slug) {
        this.url = `https://www.imdb.com/title/${slug}/fullcredits`;
    }
    async getDOM() {
        let val = await (0, node_fetch_1.default)(this.url);
        let body = dp.prototype.parseFromString(await val.text());
        return body;
    }
    getTitle(dom) {
        let title = dom.getElementsByTagName("title");
        return `${title[0].textContent.replace("&amp;", "&")}`;
    }
    getCast(dom) {
        let nodes = dom.getElementsByClassName("name");
        let cast = [];
        nodes.forEach((node) => {
            let n = node.childNodes[1].innerHTML;
            cast.push(n.substring(1, n.length - 2));
        });
        return [...new Set(cast)];
    }
}
exports.ScrapeIMDB = ScrapeIMDB;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2NyYXBlSU1EQi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2R1bGVzL2pld2d1ZXNzci9TY3JhcGVJTURCLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFZCw0REFBK0I7QUFDL0IsK0NBQWlDO0FBRWpDLE1BQWEsVUFBVTtJQUNkLEdBQUcsQ0FBUztJQUVwQixZQUFZLElBQVk7UUFDdkIsSUFBSSxDQUFDLEdBQUcsR0FBRyw4QkFBOEIsSUFBSSxjQUFjLENBQUM7SUFDN0QsQ0FBQztJQUVNLEtBQUssQ0FBQyxNQUFNO1FBQ2xCLElBQUksR0FBRyxHQUFHLE1BQU0sSUFBQSxvQkFBSyxFQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQyxJQUFJLElBQUksR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBRTFELE9BQU8sSUFBSSxDQUFDO0lBQ2IsQ0FBQztJQUVNLFFBQVEsQ0FBQyxHQUFXO1FBQzFCLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM5QyxPQUFPLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUM7SUFDeEQsQ0FBQztJQUVNLE9BQU8sQ0FBQyxHQUFXO1FBQ3pCLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvQyxJQUFJLElBQUksR0FBYSxFQUFFLENBQUM7UUFFeEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMzQixDQUFDO0NBQ0Q7QUE5QkQsZ0NBOEJDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBmb3JtYXQgKi9cclxuXHJcbmltcG9ydCBmZXRjaCBmcm9tIFwibm9kZS1mZXRjaFwiO1xyXG5pbXBvcnQgKiBhcyBkcCBmcm9tIFwiZG9tLXBhcnNlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNjcmFwZUlNREIge1xyXG5cdHByaXZhdGUgdXJsOiBzdHJpbmc7XHJcblxyXG5cdGNvbnN0cnVjdG9yKHNsdWc6IHN0cmluZykge1xyXG5cdFx0dGhpcy51cmwgPSBgaHR0cHM6Ly93d3cuaW1kYi5jb20vdGl0bGUvJHtzbHVnfS9mdWxsY3JlZGl0c2A7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgYXN5bmMgZ2V0RE9NKCkge1xyXG5cdFx0bGV0IHZhbCA9IGF3YWl0IGZldGNoKHRoaXMudXJsKTtcclxuXHRcdGxldCBib2R5ID0gZHAucHJvdG90eXBlLnBhcnNlRnJvbVN0cmluZyhhd2FpdCB2YWwudGV4dCgpKTtcclxuXHJcblx0XHRyZXR1cm4gYm9keTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXRUaXRsZShkb206IGRwLkRvbSkge1xyXG5cdFx0bGV0IHRpdGxlID0gZG9tLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwidGl0bGVcIik7XHJcblx0XHRyZXR1cm4gYCR7dGl0bGVbMF0udGV4dENvbnRlbnQucmVwbGFjZShcIiZhbXA7XCIsIFwiJlwiKX1gO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGdldENhc3QoZG9tOiBkcC5Eb20pIHtcclxuXHRcdGxldCBub2RlcyA9IGRvbS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibmFtZVwiKTtcclxuXHRcdGxldCBjYXN0OiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuXHRcdG5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcclxuXHRcdFx0bGV0IG4gPSBub2RlLmNoaWxkTm9kZXNbMV0uaW5uZXJIVE1MO1xyXG5cdFx0XHRjYXN0LnB1c2gobi5zdWJzdHJpbmcoMSwgbi5sZW5ndGggLSAyKSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gWy4uLm5ldyBTZXQoY2FzdCldO1xyXG5cdH1cclxufVxyXG4iXX0=