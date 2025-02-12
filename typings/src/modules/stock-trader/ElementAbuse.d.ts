import Puppeteer from "puppeteer";
export declare function typeEl(query: string, page: Puppeteer.Page, text: string): Promise<void>;
export declare function typeOneEl(queryAll: string, el: number, page: Puppeteer.Page, text: string): void;
export declare function clickEl(query: string, page: Puppeteer.Page): Promise<void>;
export declare function tapOneEl(queryAll: string, el: number, page: Puppeteer.Page): void;
export declare function getElPos(query: string, page: Puppeteer.Page): Promise<[number, number]>;
//# sourceMappingURL=ElementAbuse.d.ts.map