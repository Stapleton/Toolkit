/** @format */
import * as dp from "dom-parser";
export declare class ScrapeIMDB {
    private url;
    constructor(slug: string);
    getDOM(): Promise<dp.Dom>;
    getTitle(dom: dp.Dom): string;
    getCast(dom: dp.Dom): string[];
}
//# sourceMappingURL=ScrapeIMDB.d.ts.map