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
const tk_module_json_1 = require("./tk-module.json");
const DiscordCommandManager_1 = __importDefault(require("./DiscordCommandManager"));
//import TwitchCommandManager from "./TwitchCommandManager";
const Module_1 = require("../../../src/core/lib/Module");
/***** Setup *****/
class CommandManager extends Module_1.Module {
    config = this._config.getConfig();
    logger = this.Logger.scope("Mods.CommandManager");
    constructor() {
        super(tk_module_json_1.meta.name, tk_module_json_1.meta.id, tk_module_json_1.meta.version);
        this.logger.start(`Initializing ${tk_module_json_1.meta.name}`);
        this.logger.info(`Module Version: ${tk_module_json_1.meta.version}`);
        this.logger.info(`Module ID: ${tk_module_json_1.meta.id}`);
        this.logger.disable();
        this.logger.debug(this.config);
        this.logger.enable();
        new DiscordCommandManager_1.default();
        //new TwitchCommandManager();
    }
}
new CommandManager();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kdWxlcy9jb21tYW5kLW1hbmFnZXIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7Ozs7O0FBRUgscUJBQXFCO0FBQ3JCLHFEQUF3QztBQUN4QyxvRkFBNEQ7QUFDNUQsNERBQTREO0FBQzVELHlEQUFrRTtBQUtsRSxtQkFBbUI7QUFDbkIsTUFBTSxjQUFlLFNBQVEsZUFBTTtJQUN4QixNQUFNLEdBQXlCLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDMUQsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFFMUQ7UUFDQyxLQUFLLENBQUMscUJBQUksQ0FBQyxJQUFJLEVBQUUscUJBQUksQ0FBQyxFQUFFLEVBQUUscUJBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUV4QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IscUJBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixxQkFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxxQkFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFMUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUVyQixJQUFJLCtCQUFxQixFQUFFLENBQUM7UUFDNUIsNkJBQTZCO0lBQzlCLENBQUM7Q0FDRDtBQUVELElBQUksY0FBYyxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogTW9kdWxlcyBFbnRyeSBGaWxlXHJcbiAqXHJcbiAqIEBmb3JtYXRcclxuICovXHJcblxyXG4vKioqKiogSW1wb3J0cyAqKioqKi9cclxuaW1wb3J0IHsgbWV0YSB9IGZyb20gXCIuL3RrLW1vZHVsZS5qc29uXCI7XHJcbmltcG9ydCBEaXNjb3JkQ29tbWFuZE1hbmFnZXIgZnJvbSBcIi4vRGlzY29yZENvbW1hbmRNYW5hZ2VyXCI7XHJcbi8vaW1wb3J0IFR3aXRjaENvbW1hbmRNYW5hZ2VyIGZyb20gXCIuL1R3aXRjaENvbW1hbmRNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IElNb2RDb25maWcsIE1vZHVsZSB9IGZyb20gXCIuLi8uLi8uLi9zcmMvY29yZS9saWIvTW9kdWxlXCI7XHJcblxyXG4vKioqKiogSW50ZXJmYWNlcyAqKioqKi9cclxuaW50ZXJmYWNlIENvbW1hbmRNYW5hZ2VyQ29uZmlnIGV4dGVuZHMgSU1vZENvbmZpZyB7fVxyXG5cclxuLyoqKioqIFNldHVwICoqKioqL1xyXG5jbGFzcyBDb21tYW5kTWFuYWdlciBleHRlbmRzIE1vZHVsZSB7XHJcblx0cHJvdGVjdGVkIGNvbmZpZyA9IDxDb21tYW5kTWFuYWdlckNvbmZpZz50aGlzLl9jb25maWcuZ2V0Q29uZmlnKCk7XHJcblx0cHJpdmF0ZSBsb2dnZXIgPSB0aGlzLkxvZ2dlci5zY29wZShcIk1vZHMuQ29tbWFuZE1hbmFnZXJcIik7XHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0c3VwZXIobWV0YS5uYW1lLCBtZXRhLmlkLCBtZXRhLnZlcnNpb24pO1xyXG5cclxuXHRcdHRoaXMubG9nZ2VyLnN0YXJ0KGBJbml0aWFsaXppbmcgJHttZXRhLm5hbWV9YCk7XHJcblx0XHR0aGlzLmxvZ2dlci5pbmZvKGBNb2R1bGUgVmVyc2lvbjogJHttZXRhLnZlcnNpb259YCk7XHJcblx0XHR0aGlzLmxvZ2dlci5pbmZvKGBNb2R1bGUgSUQ6ICR7bWV0YS5pZH1gKTtcclxuXHJcblx0XHR0aGlzLmxvZ2dlci5kaXNhYmxlKCk7XHJcblx0XHR0aGlzLmxvZ2dlci5kZWJ1Zyh0aGlzLmNvbmZpZyk7XHJcblx0XHR0aGlzLmxvZ2dlci5lbmFibGUoKTtcclxuXHJcblx0XHRuZXcgRGlzY29yZENvbW1hbmRNYW5hZ2VyKCk7XHJcblx0XHQvL25ldyBUd2l0Y2hDb21tYW5kTWFuYWdlcigpO1xyXG5cdH1cclxufVxyXG5cclxubmV3IENvbW1hbmRNYW5hZ2VyKCk7XHJcbiJdfQ==