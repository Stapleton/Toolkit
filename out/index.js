"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const Logger_1 = __importDefault(require("./core/lib/Logger"));
const fs_1 = require("fs");
const Module_1 = require("./core/lib/Module");
const child_process_1 = require("child_process");
const api_1 = __importDefault(require("./api"));
const core_1 = __importDefault(require("./core"));
const modules_1 = __importDefault(require("./modules"));
/***** Setup Toolkit *****/
class Toolkit {
    static INSTANCE;
    Modules = Module_1.__TKConfigs;
    Configs = Module_1.__TKConfigs;
    TKApi;
    TKApp;
    TKCore;
    TKModules;
    Paths = {
        Config: `${process.cwd()}\\config`,
        Api: `${process.cwd()}\\src\\api`,
        App: `${process.cwd()}\\src\\app`,
        Core: `${process.cwd()}\\src\\core`,
        Mods: `${process.cwd()}\\src\\modules`,
    };
    Logger = Logger_1.default;
    static getInstance() {
        if (!this.INSTANCE) {
            this.INSTANCE = new Toolkit();
        }
        return this.INSTANCE;
    }
    constructor() {
        this.Logger.Global.start("Starting Toolkit!");
        this.checkAuth();
        this.TKApi = new api_1.default(this);
        this.TKApp = (0, child_process_1.exec)("electron ./src/app/app.js");
        this.TKCore = new core_1.default(this);
        this.TKModules = new modules_1.default(this);
    }
    checkAuth() {
        let p = (0, path_1.join)(this.Paths.Config, "auth.json");
        if (!(0, fs_1.existsSync)(p)) {
            (0, fs_1.writeFileSync)(p, "{}", "utf-8");
            this.Logger.Core.star(`Created new auth.json in config folder!`);
        }
    }
}
Toolkit.getInstance();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsK0JBQTRCO0FBQzVCLCtEQUF1QztBQUN2QywyQkFBK0M7QUFDL0MsOENBQWdEO0FBQ2hELGlEQUFtRDtBQUVuRCxnREFBMEI7QUFDMUIsa0RBQTRCO0FBQzVCLHdEQUFrQztBQUlsQywyQkFBMkI7QUFDM0IsTUFBTSxPQUFPO0lBQ0osTUFBTSxDQUFDLFFBQVEsQ0FBVTtJQUUxQixPQUFPLEdBQUcsb0JBQVcsQ0FBQztJQUN0QixPQUFPLEdBQUcsb0JBQVcsQ0FBQztJQUV0QixLQUFLLENBQVE7SUFDYixLQUFLLENBQWU7SUFDcEIsTUFBTSxDQUFTO0lBQ2YsU0FBUyxDQUFZO0lBRXJCLEtBQUssR0FBRztRQUNkLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsVUFBVTtRQUNsQyxHQUFHLEVBQUUsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLFlBQVk7UUFDakMsR0FBRyxFQUFFLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxZQUFZO1FBQ2pDLElBQUksRUFBRSxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsYUFBYTtRQUNuQyxJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLGdCQUFnQjtLQUN0QyxDQUFDO0lBRUssTUFBTSxHQUFrQixnQkFBTSxDQUFDO0lBRS9CLE1BQU0sQ0FBQyxXQUFXO1FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDcEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQy9CLENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdEIsQ0FBQztJQUVEO1FBQ0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFFOUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRWpCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxhQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFBLG9CQUFJLEVBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksY0FBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxpQkFBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFTyxTQUFTO1FBQ2hCLElBQUksQ0FBQyxHQUFHLElBQUEsV0FBSSxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBRTdDLElBQUksQ0FBQyxJQUFBLGVBQVUsRUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ3BCLElBQUEsa0JBQWEsRUFBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO1FBQ2xFLENBQUM7SUFDRixDQUFDO0NBQ0Q7QUFFRCxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGZvcm1hdCAqL1xyXG5cclxuaW1wb3J0IHsgam9pbiB9IGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4vY29yZS9saWIvTG9nZ2VyXCI7XHJcbmltcG9ydCB7IGV4aXN0c1N5bmMsIHdyaXRlRmlsZVN5bmMgfSBmcm9tIFwiZnNcIjtcclxuaW1wb3J0IHsgX19US0NvbmZpZ3MgfSBmcm9tIFwiLi9jb3JlL2xpYi9Nb2R1bGVcIjtcclxuaW1wb3J0IHsgQ2hpbGRQcm9jZXNzLCBleGVjIH0gZnJvbSBcImNoaWxkX3Byb2Nlc3NcIjtcclxuXHJcbmltcG9ydCBUS0FwaSBmcm9tIFwiLi9hcGlcIjtcclxuaW1wb3J0IFRLQ29yZSBmcm9tIFwiLi9jb3JlXCI7XHJcbmltcG9ydCBUS01vZHVsZXMgZnJvbSBcIi4vbW9kdWxlc1wiO1xyXG5cclxuZXhwb3J0IHR5cGUgVG9vbGtpdERvbWFpbiA9IFwiYXBpXCIgfCBcImFwcFwiIHwgXCJjb3JlXCIgfCBcIm1vZHVsZVwiO1xyXG5cclxuLyoqKioqIFNldHVwIFRvb2xraXQgKioqKiovXHJcbmNsYXNzIFRvb2xraXQge1xyXG5cdHByaXZhdGUgc3RhdGljIElOU1RBTkNFOiBUb29sa2l0O1xyXG5cclxuXHRwdWJsaWMgTW9kdWxlcyA9IF9fVEtDb25maWdzO1xyXG5cdHB1YmxpYyBDb25maWdzID0gX19US0NvbmZpZ3M7XHJcblxyXG5cdHB1YmxpYyBUS0FwaTogVEtBcGk7XHJcblx0cHVibGljIFRLQXBwOiBDaGlsZFByb2Nlc3M7XHJcblx0cHVibGljIFRLQ29yZTogVEtDb3JlO1xyXG5cdHB1YmxpYyBUS01vZHVsZXM6IFRLTW9kdWxlcztcclxuXHJcblx0cHVibGljIFBhdGhzID0ge1xyXG5cdFx0Q29uZmlnOiBgJHtwcm9jZXNzLmN3ZCgpfVxcXFxjb25maWdgLFxyXG5cdFx0QXBpOiBgJHtwcm9jZXNzLmN3ZCgpfVxcXFxzcmNcXFxcYXBpYCxcclxuXHRcdEFwcDogYCR7cHJvY2Vzcy5jd2QoKX1cXFxcc3JjXFxcXGFwcGAsXHJcblx0XHRDb3JlOiBgJHtwcm9jZXNzLmN3ZCgpfVxcXFxzcmNcXFxcY29yZWAsXHJcblx0XHRNb2RzOiBgJHtwcm9jZXNzLmN3ZCgpfVxcXFxzcmNcXFxcbW9kdWxlc2AsXHJcblx0fTtcclxuXHJcblx0cHVibGljIExvZ2dlcjogdHlwZW9mIExvZ2dlciA9IExvZ2dlcjtcclxuXHJcblx0cHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcclxuXHRcdGlmICghdGhpcy5JTlNUQU5DRSkge1xyXG5cdFx0XHR0aGlzLklOU1RBTkNFID0gbmV3IFRvb2xraXQoKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzLklOU1RBTkNFO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHRoaXMuTG9nZ2VyLkdsb2JhbC5zdGFydChcIlN0YXJ0aW5nIFRvb2xraXQhXCIpO1xyXG5cclxuXHRcdHRoaXMuY2hlY2tBdXRoKCk7XHJcblxyXG5cdFx0dGhpcy5US0FwaSA9IG5ldyBUS0FwaSh0aGlzKTtcclxuXHRcdHRoaXMuVEtBcHAgPSBleGVjKFwiZWxlY3Ryb24gLi9zcmMvYXBwL2FwcC5qc1wiKTtcclxuXHRcdHRoaXMuVEtDb3JlID0gbmV3IFRLQ29yZSh0aGlzKTtcclxuXHRcdHRoaXMuVEtNb2R1bGVzID0gbmV3IFRLTW9kdWxlcyh0aGlzKTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgY2hlY2tBdXRoKCkge1xyXG5cdFx0bGV0IHAgPSBqb2luKHRoaXMuUGF0aHMuQ29uZmlnLCBcImF1dGguanNvblwiKTtcclxuXHJcblx0XHRpZiAoIWV4aXN0c1N5bmMocCkpIHtcclxuXHRcdFx0d3JpdGVGaWxlU3luYyhwLCBcInt9XCIsIFwidXRmLThcIik7XHJcblx0XHRcdHRoaXMuTG9nZ2VyLkNvcmUuc3RhcihgQ3JlYXRlZCBuZXcgYXV0aC5qc29uIGluIGNvbmZpZyBmb2xkZXIhYCk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5Ub29sa2l0LmdldEluc3RhbmNlKCk7XHJcblxyXG50eXBlIFRLID0gVG9vbGtpdDtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRLO1xyXG4iXX0=