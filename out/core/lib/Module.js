"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Module = exports.__TKConfigs = exports.__TKModules = void 0;
const Logger_1 = __importDefault(require("./Logger"));
const node_events_1 = require("node:events");
const ModConfig_1 = require("../lib/ModConfig");
exports.__TKModules = new Map();
exports.__TKConfigs = new Map();
class Module extends node_events_1.EventEmitter {
    _name;
    id;
    version;
    type;
    requires;
    _config;
    Logger = Logger_1.default.Global.scope("Toolkit.Lib.Module");
    constructor(name, id, version, type = "mod", requires = "none") {
        super();
        this._name = name;
        this.id = id;
        this.version = version;
        this.type = type;
        this.requires = requires;
        this._config = new ModConfig_1.ModConfig(this);
        if (this._config.notInit(id))
            this._config.init(name, id, version, type, requires);
        if (this._config.getConfig().module.disabled)
            this.disabledMod(5);
        exports.__TKModules.set(this.id, this);
    }
    disabledMod(exitcode) {
        this.Logger.disabled(`${this._name} is disabled.`);
        process.exit(exitcode);
    }
    getName() {
        return this._name;
    }
    getID() {
        return this.id;
    }
    getVersion() {
        return this.version;
    }
    getType() {
        return this.type;
    }
    getRequires() {
        return this.requires;
    }
}
exports.Module = Module;
// TODO: Compare config version with package version, update config version if older than package version
// TODO: Add config fields programmatically, this will then prevent needing to package a config with differences and will cause config options to be added as needed
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmUvbGliL01vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7O0FBRWQsc0RBQThCO0FBQzlCLDZDQUEyQztBQUMzQyxnREFBNkM7QUFFbEMsUUFBQSxXQUFXLEdBQStCLElBQUksR0FBRyxFQUFFLENBQUM7QUFDcEQsUUFBQSxXQUFXLEdBQWtDLElBQUksR0FBRyxFQUFFLENBQUM7QUFxQmxFLE1BQWEsTUFBTyxTQUFRLDBCQUFZO0lBQzdCLEtBQUssQ0FBa0I7SUFDdkIsRUFBRSxDQUFnQjtJQUNsQixPQUFPLENBQXFCO0lBQzVCLElBQUksQ0FBa0I7SUFDdEIsUUFBUSxDQUFzQjtJQUM5QixPQUFPLENBQVk7SUFFdEIsTUFBTSxHQUE0QixnQkFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUVuRixZQUNDLElBQXFCLEVBQ3JCLEVBQWlCLEVBQ2pCLE9BQTJCLEVBQzNCLE9BQXdCLEtBQUssRUFDN0IsV0FBZ0MsTUFBTTtRQUV0QyxLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLHFCQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFbkMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDbkYsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRO1lBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVsRSxtQkFBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFUyxXQUFXLENBQUMsUUFBZ0I7UUFDckMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxlQUFlLENBQUMsQ0FBQztRQUNuRCxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFFTSxPQUFPO1FBQ2IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ25CLENBQUM7SUFFTSxLQUFLO1FBQ1gsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFTSxVQUFVO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUNyQixDQUFDO0lBRU0sT0FBTztRQUNiLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNsQixDQUFDO0lBRU0sV0FBVztRQUNqQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdEIsQ0FBQztDQUNEO0FBdkRELHdCQXVEQztBQUVELHlHQUF5RztBQUN6RyxvS0FBb0siLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGZvcm1hdCAqL1xyXG5cclxuaW1wb3J0IGxvZ2dlciBmcm9tIFwiLi9Mb2dnZXJcIjtcclxuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSBcIm5vZGU6ZXZlbnRzXCI7XHJcbmltcG9ydCB7IE1vZENvbmZpZyB9IGZyb20gXCIuLi9saWIvTW9kQ29uZmlnXCI7XHJcblxyXG5leHBvcnQgdmFyIF9fVEtNb2R1bGVzOiBNYXA8SU1vZHVsZS5Nb2RJRCwgTW9kdWxlPiA9IG5ldyBNYXAoKTtcclxuZXhwb3J0IHZhciBfX1RLQ29uZmlnczogTWFwPElNb2R1bGUuTW9kSUQsIE1vZENvbmZpZz4gPSBuZXcgTWFwKCk7XHJcblxyXG5leHBvcnQgbmFtZXNwYWNlIElNb2R1bGUge1xyXG5cdGV4cG9ydCB0eXBlIE1vZE5hbWUgPSBzdHJpbmc7XHJcblx0ZXhwb3J0IHR5cGUgTW9kSUQgPSBzdHJpbmc7XHJcblx0ZXhwb3J0IHR5cGUgTW9kVmVyc2lvbiA9IHN0cmluZztcclxuXHRleHBvcnQgdHlwZSBNb2RUeXBlID0gXCJsaWJcIiB8IFwibW9kXCI7XHJcblx0ZXhwb3J0IHR5cGUgTW9kUmVxdWlyZXMgPSBcIm5vbmVcIiB8IEFycmF5PHN0cmluZz47XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU1vZENvbmZpZyB7XHJcblx0bW9kdWxlOiB7XHJcblx0XHRuYW1lOiBJTW9kdWxlLk1vZE5hbWU7XHJcblx0XHRpZDogSU1vZHVsZS5Nb2RJRDtcclxuXHRcdHZlcnNpb246IElNb2R1bGUuTW9kVmVyc2lvbjtcclxuXHRcdHR5cGU6IElNb2R1bGUuTW9kVHlwZTtcclxuXHRcdHJlcXVpcmVzOiBJTW9kdWxlLk1vZFJlcXVpcmVzO1xyXG5cdFx0ZGlzYWJsZWQ6IGJvb2xlYW47XHJcblx0fTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1vZHVsZSBleHRlbmRzIEV2ZW50RW1pdHRlciB7XHJcblx0cHJvdGVjdGVkIF9uYW1lOiBJTW9kdWxlLk1vZE5hbWU7XHJcblx0cHJvdGVjdGVkIGlkOiBJTW9kdWxlLk1vZElEO1xyXG5cdHByb3RlY3RlZCB2ZXJzaW9uOiBJTW9kdWxlLk1vZFZlcnNpb247XHJcblx0cHJvdGVjdGVkIHR5cGU6IElNb2R1bGUuTW9kVHlwZTtcclxuXHRwcm90ZWN0ZWQgcmVxdWlyZXM6IElNb2R1bGUuTW9kUmVxdWlyZXM7XHJcblx0cHJvdGVjdGVkIF9jb25maWc6IE1vZENvbmZpZztcclxuXHJcblx0cHVibGljIExvZ2dlcjogdHlwZW9mIGxvZ2dlcltcIkdsb2JhbFwiXSA9IGxvZ2dlci5HbG9iYWwuc2NvcGUoXCJUb29sa2l0LkxpYi5Nb2R1bGVcIik7XHJcblxyXG5cdGNvbnN0cnVjdG9yKFxyXG5cdFx0bmFtZTogSU1vZHVsZS5Nb2ROYW1lLFxyXG5cdFx0aWQ6IElNb2R1bGUuTW9kSUQsXHJcblx0XHR2ZXJzaW9uOiBJTW9kdWxlLk1vZFZlcnNpb24sXHJcblx0XHR0eXBlOiBJTW9kdWxlLk1vZFR5cGUgPSBcIm1vZFwiLFxyXG5cdFx0cmVxdWlyZXM6IElNb2R1bGUuTW9kUmVxdWlyZXMgPSBcIm5vbmVcIlxyXG5cdCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdHRoaXMuX25hbWUgPSBuYW1lO1xyXG5cdFx0dGhpcy5pZCA9IGlkO1xyXG5cdFx0dGhpcy52ZXJzaW9uID0gdmVyc2lvbjtcclxuXHRcdHRoaXMudHlwZSA9IHR5cGU7XHJcblx0XHR0aGlzLnJlcXVpcmVzID0gcmVxdWlyZXM7XHJcblx0XHR0aGlzLl9jb25maWcgPSBuZXcgTW9kQ29uZmlnKHRoaXMpO1xyXG5cclxuXHRcdGlmICh0aGlzLl9jb25maWcubm90SW5pdChpZCkpIHRoaXMuX2NvbmZpZy5pbml0KG5hbWUsIGlkLCB2ZXJzaW9uLCB0eXBlLCByZXF1aXJlcyk7XHJcblx0XHRpZiAodGhpcy5fY29uZmlnLmdldENvbmZpZygpLm1vZHVsZS5kaXNhYmxlZCkgdGhpcy5kaXNhYmxlZE1vZCg1KTtcclxuXHJcblx0XHRfX1RLTW9kdWxlcy5zZXQodGhpcy5pZCwgdGhpcyk7XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgZGlzYWJsZWRNb2QoZXhpdGNvZGU6IG51bWJlcikge1xyXG5cdFx0dGhpcy5Mb2dnZXIuZGlzYWJsZWQoYCR7dGhpcy5fbmFtZX0gaXMgZGlzYWJsZWQuYCk7XHJcblx0XHRwcm9jZXNzLmV4aXQoZXhpdGNvZGUpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGdldE5hbWUoKTogSU1vZHVsZS5Nb2ROYW1lIHtcclxuXHRcdHJldHVybiB0aGlzLl9uYW1lO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGdldElEKCk6IElNb2R1bGUuTW9kSUQge1xyXG5cdFx0cmV0dXJuIHRoaXMuaWQ7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0VmVyc2lvbigpOiBJTW9kdWxlLk1vZFZlcnNpb24ge1xyXG5cdFx0cmV0dXJuIHRoaXMudmVyc2lvbjtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXRUeXBlKCk6IElNb2R1bGUuTW9kVHlwZSB7XHJcblx0XHRyZXR1cm4gdGhpcy50eXBlO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGdldFJlcXVpcmVzKCk6IElNb2R1bGUuTW9kUmVxdWlyZXMge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVxdWlyZXM7XHJcblx0fVxyXG59XHJcblxyXG4vLyBUT0RPOiBDb21wYXJlIGNvbmZpZyB2ZXJzaW9uIHdpdGggcGFja2FnZSB2ZXJzaW9uLCB1cGRhdGUgY29uZmlnIHZlcnNpb24gaWYgb2xkZXIgdGhhbiBwYWNrYWdlIHZlcnNpb25cclxuLy8gVE9ETzogQWRkIGNvbmZpZyBmaWVsZHMgcHJvZ3JhbW1hdGljYWxseSwgdGhpcyB3aWxsIHRoZW4gcHJldmVudCBuZWVkaW5nIHRvIHBhY2thZ2UgYSBjb25maWcgd2l0aCBkaWZmZXJlbmNlcyBhbmQgd2lsbCBjYXVzZSBjb25maWcgb3B0aW9ucyB0byBiZSBhZGRlZCBhcyBuZWVkZWRcclxuIl19