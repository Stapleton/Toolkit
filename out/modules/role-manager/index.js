"use strict";
/**
 * Modules Entry File
 *
 * @format
 */
Object.defineProperty(exports, "__esModule", { value: true });
/***** Imports *****/
const tk_module_json_1 = require("./tk-module.json");
const Module_1 = require("../../../src/core/lib/Module");
/***** Setup *****/
class RoleManager extends Module_1.Module {
    config = this._config.getConfig();
    logger = this.Logger.scope("Mods.RoleManager");
    constructor() {
        super(tk_module_json_1.meta.name, tk_module_json_1.meta.id, tk_module_json_1.meta.version, "mod", ["discord"]);
        this.logger.start(`Initializing ${tk_module_json_1.meta.name}`);
        this.logger.info(`Module Version: ${tk_module_json_1.meta.version}`);
        this.logger.info(`Module ID: ${tk_module_json_1.meta.id}`);
        this.logger.disable();
        this.logger.debug(this.config);
        this.logger.enable();
    }
}
new RoleManager();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kdWxlcy9yb2xlLW1hbmFnZXIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7O0FBRUgscUJBQXFCO0FBQ3JCLHFEQUF3QztBQUN4Qyx5REFBa0U7QUFLbEUsbUJBQW1CO0FBQ25CLE1BQU0sV0FBWSxTQUFRLGVBQU07SUFDckIsTUFBTSxHQUFzQixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3ZELE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBRXZEO1FBQ0MsS0FBSyxDQUFDLHFCQUFJLENBQUMsSUFBSSxFQUFFLHFCQUFJLENBQUMsRUFBRSxFQUFFLHFCQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFFNUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLHFCQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIscUJBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMscUJBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRTFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDdEIsQ0FBQztDQUNEO0FBRUQsSUFBSSxXQUFXLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBNb2R1bGVzIEVudHJ5IEZpbGVcclxuICpcclxuICogQGZvcm1hdFxyXG4gKi9cclxuXHJcbi8qKioqKiBJbXBvcnRzICoqKioqL1xyXG5pbXBvcnQgeyBtZXRhIH0gZnJvbSBcIi4vdGstbW9kdWxlLmpzb25cIjtcclxuaW1wb3J0IHsgSU1vZENvbmZpZywgTW9kdWxlIH0gZnJvbSBcIi4uLy4uLy4uL3NyYy9jb3JlL2xpYi9Nb2R1bGVcIjtcclxuXHJcbi8qKioqKiBJbnRlcmZhY2VzICoqKioqL1xyXG5pbnRlcmZhY2UgUm9sZU1hbmFnZXJDb25maWcgZXh0ZW5kcyBJTW9kQ29uZmlnIHt9XHJcblxyXG4vKioqKiogU2V0dXAgKioqKiovXHJcbmNsYXNzIFJvbGVNYW5hZ2VyIGV4dGVuZHMgTW9kdWxlIHtcclxuXHRwcm90ZWN0ZWQgY29uZmlnID0gPFJvbGVNYW5hZ2VyQ29uZmlnPnRoaXMuX2NvbmZpZy5nZXRDb25maWcoKTtcclxuXHRwcml2YXRlIGxvZ2dlciA9IHRoaXMuTG9nZ2VyLnNjb3BlKFwiTW9kcy5Sb2xlTWFuYWdlclwiKTtcclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRzdXBlcihtZXRhLm5hbWUsIG1ldGEuaWQsIG1ldGEudmVyc2lvbiwgXCJtb2RcIiwgW1wiZGlzY29yZFwiXSk7XHJcblxyXG5cdFx0dGhpcy5sb2dnZXIuc3RhcnQoYEluaXRpYWxpemluZyAke21ldGEubmFtZX1gKTtcclxuXHRcdHRoaXMubG9nZ2VyLmluZm8oYE1vZHVsZSBWZXJzaW9uOiAke21ldGEudmVyc2lvbn1gKTtcclxuXHRcdHRoaXMubG9nZ2VyLmluZm8oYE1vZHVsZSBJRDogJHttZXRhLmlkfWApO1xyXG5cclxuXHRcdHRoaXMubG9nZ2VyLmRpc2FibGUoKTtcclxuXHRcdHRoaXMubG9nZ2VyLmRlYnVnKHRoaXMuY29uZmlnKTtcclxuXHRcdHRoaXMubG9nZ2VyLmVuYWJsZSgpO1xyXG5cdH1cclxufVxyXG5cclxubmV3IFJvbGVNYW5hZ2VyKCk7XHJcbiJdfQ==