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
class ChatCleaner extends Module_1.Module {
    config = this._config.getConfig();
    logger = this.Logger.scope("Mods.ChatCleaner");
    constructor() {
        super(tk_module_json_1.meta.name, tk_module_json_1.meta.id, tk_module_json_1.meta.version);
        this.logger.start(`Initializing ${tk_module_json_1.meta.name}`);
        this.logger.info(`Module Version: ${tk_module_json_1.meta.version}`);
        this.logger.info(`Module ID: ${tk_module_json_1.meta.id}`);
        this.logger.disable();
        this.logger.debug(this.config);
        this.logger.enable();
    }
}
new ChatCleaner();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kdWxlcy9jaGF0LWNsZWFuZXIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7O0FBRUgscUJBQXFCO0FBQ3JCLHFEQUF3QztBQUN4Qyx5REFBa0U7QUFLbEUsbUJBQW1CO0FBRW5CLE1BQU0sV0FBWSxTQUFRLGVBQU07SUFDckIsTUFBTSxHQUFzQixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3ZELE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBRXZEO1FBQ0MsS0FBSyxDQUFDLHFCQUFJLENBQUMsSUFBSSxFQUFFLHFCQUFJLENBQUMsRUFBRSxFQUFFLHFCQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFeEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLHFCQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIscUJBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMscUJBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRTFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDdEIsQ0FBQztDQUNEO0FBRUQsSUFBSSxXQUFXLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBNb2R1bGVzIEVudHJ5IEZpbGVcclxuICpcclxuICogQGZvcm1hdFxyXG4gKi9cclxuXHJcbi8qKioqKiBJbXBvcnRzICoqKioqL1xyXG5pbXBvcnQgeyBtZXRhIH0gZnJvbSBcIi4vdGstbW9kdWxlLmpzb25cIjtcclxuaW1wb3J0IHsgTW9kdWxlLCBJTW9kQ29uZmlnIH0gZnJvbSBcIi4uLy4uLy4uL3NyYy9jb3JlL2xpYi9Nb2R1bGVcIjtcclxuXHJcbi8qKioqKiBJbnRlcmZhY2VzICoqKioqL1xyXG5pbnRlcmZhY2UgQ2hhdENsZWFuZXJDb25maWcgZXh0ZW5kcyBJTW9kQ29uZmlnIHt9XHJcblxyXG4vKioqKiogU2V0dXAgKioqKiovXHJcblxyXG5jbGFzcyBDaGF0Q2xlYW5lciBleHRlbmRzIE1vZHVsZSB7XHJcblx0cHJvdGVjdGVkIGNvbmZpZyA9IDxDaGF0Q2xlYW5lckNvbmZpZz50aGlzLl9jb25maWcuZ2V0Q29uZmlnKCk7XHJcblx0cHJpdmF0ZSBsb2dnZXIgPSB0aGlzLkxvZ2dlci5zY29wZShcIk1vZHMuQ2hhdENsZWFuZXJcIik7XHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0c3VwZXIobWV0YS5uYW1lLCBtZXRhLmlkLCBtZXRhLnZlcnNpb24pO1xyXG5cclxuXHRcdHRoaXMubG9nZ2VyLnN0YXJ0KGBJbml0aWFsaXppbmcgJHttZXRhLm5hbWV9YCk7XHJcblx0XHR0aGlzLmxvZ2dlci5pbmZvKGBNb2R1bGUgVmVyc2lvbjogJHttZXRhLnZlcnNpb259YCk7XHJcblx0XHR0aGlzLmxvZ2dlci5pbmZvKGBNb2R1bGUgSUQ6ICR7bWV0YS5pZH1gKTtcclxuXHJcblx0XHR0aGlzLmxvZ2dlci5kaXNhYmxlKCk7XHJcblx0XHR0aGlzLmxvZ2dlci5kZWJ1Zyh0aGlzLmNvbmZpZyk7XHJcblx0XHR0aGlzLmxvZ2dlci5lbmFibGUoKTtcclxuXHR9XHJcbn1cclxuXHJcbm5ldyBDaGF0Q2xlYW5lcigpO1xyXG4iXX0=