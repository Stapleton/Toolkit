"use strict";
/**
 * Modules Entry File
 *
 * @format
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/***** Imports *****/
const Client_1 = __importDefault(require("./Client"));
const tk_module_json_1 = require("./tk-module.json");
const Module_1 = require("../../../src/core/lib/Module");
/***** Setup *****/
class Discord extends Module_1.Module {
    config = this._config.getConfig();
    logger = this.Logger.scope("Mods.Discord");
    constructor() {
        super(tk_module_json_1.meta.name, tk_module_json_1.meta.id, tk_module_json_1.meta.version, "lib", "none");
        this.logger.start(`Initializing ${tk_module_json_1.meta.name}`);
        this.logger.info(`Module Version: ${tk_module_json_1.meta.version}`);
        this.logger.info(`Module ID: ${tk_module_json_1.meta.id}`);
        this.logger.disable();
        this.logger.debug(this.config);
        this.logger.enable();
        Client_1.default.getInstance();
    }
}
new Discord();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kdWxlcy9kaXNjb3JkL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHOzs7OztBQUVILHFCQUFxQjtBQUNyQixzREFBOEI7QUFDOUIscURBQXdDO0FBQ3hDLHlEQUFrRTtBQUtsRSxtQkFBbUI7QUFDbkIsTUFBTSxPQUFRLFNBQVEsZUFBTTtJQUNqQixNQUFNLEdBQWtCLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDbkQsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBRW5EO1FBQ0MsS0FBSyxDQUFDLHFCQUFJLENBQUMsSUFBSSxFQUFFLHFCQUFJLENBQUMsRUFBRSxFQUFFLHFCQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztRQUV2RCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IscUJBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixxQkFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxxQkFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFMUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUVyQixnQkFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3RCLENBQUM7Q0FDRDtBQUVELElBQUksT0FBTyxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogTW9kdWxlcyBFbnRyeSBGaWxlXHJcbiAqXHJcbiAqIEBmb3JtYXRcclxuICovXHJcblxyXG4vKioqKiogSW1wb3J0cyAqKioqKi9cclxuaW1wb3J0IENsaWVudCBmcm9tIFwiLi9DbGllbnRcIjtcclxuaW1wb3J0IHsgbWV0YSB9IGZyb20gXCIuL3RrLW1vZHVsZS5qc29uXCI7XHJcbmltcG9ydCB7IElNb2RDb25maWcsIE1vZHVsZSB9IGZyb20gXCIuLi8uLi8uLi9zcmMvY29yZS9saWIvTW9kdWxlXCI7XHJcblxyXG4vKioqKiogSW50ZXJmYWNlcyAqKioqKi9cclxuaW50ZXJmYWNlIERpc2NvcmRDb25maWcgZXh0ZW5kcyBJTW9kQ29uZmlnIHt9XHJcblxyXG4vKioqKiogU2V0dXAgKioqKiovXHJcbmNsYXNzIERpc2NvcmQgZXh0ZW5kcyBNb2R1bGUge1xyXG5cdHByb3RlY3RlZCBjb25maWcgPSA8RGlzY29yZENvbmZpZz50aGlzLl9jb25maWcuZ2V0Q29uZmlnKCk7XHJcblx0cHJpdmF0ZSBsb2dnZXIgPSB0aGlzLkxvZ2dlci5zY29wZShcIk1vZHMuRGlzY29yZFwiKTtcclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRzdXBlcihtZXRhLm5hbWUsIG1ldGEuaWQsIG1ldGEudmVyc2lvbiwgXCJsaWJcIiwgXCJub25lXCIpO1xyXG5cclxuXHRcdHRoaXMubG9nZ2VyLnN0YXJ0KGBJbml0aWFsaXppbmcgJHttZXRhLm5hbWV9YCk7XHJcblx0XHR0aGlzLmxvZ2dlci5pbmZvKGBNb2R1bGUgVmVyc2lvbjogJHttZXRhLnZlcnNpb259YCk7XHJcblx0XHR0aGlzLmxvZ2dlci5pbmZvKGBNb2R1bGUgSUQ6ICR7bWV0YS5pZH1gKTtcclxuXHJcblx0XHR0aGlzLmxvZ2dlci5kaXNhYmxlKCk7XHJcblx0XHR0aGlzLmxvZ2dlci5kZWJ1Zyh0aGlzLmNvbmZpZyk7XHJcblx0XHR0aGlzLmxvZ2dlci5lbmFibGUoKTtcclxuXHJcblx0XHRDbGllbnQuZ2V0SW5zdGFuY2UoKTtcclxuXHR9XHJcbn1cclxuXHJcbm5ldyBEaXNjb3JkKCk7XHJcbiJdfQ==