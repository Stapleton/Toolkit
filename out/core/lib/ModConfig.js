"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModConfig = void 0;
const toml_1 = require("toml");
const signale_1 = require("signale");
const path_1 = require("path");
const Module_1 = require("./Module");
const node_fs_1 = require("node:fs");
const Logger = new signale_1.Signale({
    types: {
        disabled: {
            label: "Disabled",
            color: "grey",
            badge: "❌",
        },
        create: {
            label: "Create",
            color: "yellow",
            badge: "✨",
        },
    },
});
class ModConfig {
    Config;
    Path;
    /**
     * An array of ModuleIDs that gets updated at startup during scan/init of all modules
     * Any Module found in the mods folder that doesnt have a matching Config
     * will show up in this list and will automatically have a default config generated for it.
     */
    NotInit = [];
    constructor(mod) {
        this.Path = (0, path_1.join)(process.cwd(), "config", `${mod.getID()}.toml`);
        //Toolkit.Logger.Core.debug(this.Path);
        if ((0, node_fs_1.existsSync)(this.Path)) {
            this.setConfig(mod.getID());
        }
        else {
            Logger.create(`New Config for ${mod.getName()}`);
            this.makeConfig();
            this.NotInit.push(mod.getID());
        }
        //mod.getName(), mod.getID(), mod.getVersion(), mod.getType(), mod.getRequires()
        //this.Config = this.parseConfig(this.readFile(path));
    }
    makeConfig() {
        try {
            (0, node_fs_1.mkdirSync)((0, path_1.parse)(this.Path.toString()).dir, { recursive: true });
        }
        catch (e) {
            if (e.code != "EEXIST")
                Logger.error(`Failed to create config directory.\n${e.message}`);
        }
        finally {
            return (0, node_fs_1.writeFileSync)(this.Path, "", "utf8");
        }
    }
    readFile(path) {
        return (0, node_fs_1.readFileSync)(path, "utf8");
    }
    parseConfig(text) {
        let config = (0, toml_1.parse)(text);
        return {
            ...config,
        };
    }
    setConfig(id) {
        let data = this.readFile(this.Path);
        this.Config = this.parseConfig(data);
        Module_1.__TKConfigs.set(id, this);
    }
    getConfig() {
        return this.Config;
    }
    notInit(id) {
        return this.NotInit.includes(id);
    }
    init(name, id, version = "0.0.0", type = "mod", requires = "none") {
        let data = `[module]
name = "${name}"
id = "${id}"
version = "${version}"
type = "${type}"
requires = "${requires}"
disabled = false`;
        (0, node_fs_1.writeFileSync)(this.Path, data, "utf8");
        let a = this.NotInit.indexOf(id);
        delete this.NotInit[a];
        this.setConfig(id);
        Logger.create(`Initialized Config for ${name}`);
    }
}
exports.ModConfig = ModConfig;
exports.default = ModConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9kQ29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmUvbGliL01vZENvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7O0FBRWQsK0JBQTZCO0FBQzdCLHFDQUFrQztBQUNsQywrQkFBZ0Q7QUFDaEQscUNBQW9EO0FBRXBELHFDQUF1RjtBQUV2RixNQUFNLE1BQU0sR0FBRyxJQUFJLGlCQUFPLENBQUM7SUFDMUIsS0FBSyxFQUFFO1FBQ04sUUFBUSxFQUFFO1lBQ1QsS0FBSyxFQUFFLFVBQVU7WUFDakIsS0FBSyxFQUFFLE1BQU07WUFDYixLQUFLLEVBQUUsR0FBRztTQUNWO1FBQ0QsTUFBTSxFQUFFO1lBQ1AsS0FBSyxFQUFFLFFBQVE7WUFDZixLQUFLLEVBQUUsUUFBUTtZQUNmLEtBQUssRUFBRSxHQUFHO1NBQ1Y7S0FDRDtDQUNELENBQUMsQ0FBQztBQUVILE1BQWEsU0FBUztJQUNiLE1BQU0sQ0FBYTtJQUNuQixJQUFJLENBQVc7SUFFdkI7Ozs7T0FJRztJQUNLLE9BQU8sR0FBb0IsRUFBRSxDQUFDO0lBRXRDLFlBQVksR0FBVztRQUN0QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUEsV0FBSSxFQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxRQUFRLEVBQUUsR0FBRyxHQUFHLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRWpFLHVDQUF1QztRQUV2QyxJQUFJLElBQUEsb0JBQVUsRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUMzQixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQzdCLENBQUM7YUFBTSxDQUFDO1lBQ1AsTUFBTSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDaEMsQ0FBQztRQUNELGdGQUFnRjtRQUVoRixzREFBc0Q7SUFDdkQsQ0FBQztJQUVPLFVBQVU7UUFDakIsSUFBSSxDQUFDO1lBQ0osSUFBQSxtQkFBUyxFQUFDLElBQUEsWUFBUyxFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNyRSxDQUFDO1FBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUNaLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxRQUFRO2dCQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsdUNBQXVDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQzFGLENBQUM7Z0JBQVMsQ0FBQztZQUNWLE9BQU8sSUFBQSx1QkFBYSxFQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLENBQUM7SUFDRixDQUFDO0lBRU8sUUFBUSxDQUFDLElBQWM7UUFDOUIsT0FBTyxJQUFBLHNCQUFZLEVBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFTyxXQUFXLENBQUMsSUFBWTtRQUMvQixJQUFJLE1BQU0sR0FBRyxJQUFBLFlBQUssRUFBQyxJQUFJLENBQUMsQ0FBQztRQUN6QixPQUFPO1lBQ04sR0FBRyxNQUFNO1NBQ1QsQ0FBQztJQUNILENBQUM7SUFFTyxTQUFTLENBQUMsRUFBaUI7UUFDbEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JDLG9CQUFXLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRU0sU0FBUztRQUNmLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNwQixDQUFDO0lBRU0sT0FBTyxDQUFDLEVBQWlCO1FBQy9CLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVNLElBQUksQ0FDVixJQUFxQixFQUNyQixFQUFpQixFQUNqQixVQUE4QixPQUFPLEVBQ3JDLE9BQXdCLEtBQUssRUFDN0IsV0FBZ0MsTUFBTTtRQUV0QyxJQUFJLElBQUksR0FBRztVQUNILElBQUk7UUFDTixFQUFFO2FBQ0csT0FBTztVQUNWLElBQUk7Y0FDQSxRQUFRO2lCQUNMLENBQUM7UUFFaEIsSUFBQSx1QkFBYSxFQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRXZDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2pDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRW5CLE1BQU0sQ0FBQyxNQUFNLENBQUMsMEJBQTBCLElBQUksRUFBRSxDQUFDLENBQUM7SUFDakQsQ0FBQztDQUNEO0FBdEZELDhCQXNGQztBQUVELGtCQUFlLFNBQVMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAZm9ybWF0ICovXHJcblxyXG5pbXBvcnQgeyBwYXJzZSB9IGZyb20gXCJ0b21sXCI7XHJcbmltcG9ydCB7IFNpZ25hbGUgfSBmcm9tIFwic2lnbmFsZVwiO1xyXG5pbXBvcnQgeyBqb2luLCBwYXJzZSBhcyBwYXJzZVBhdGggfSBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgeyBfX1RLQ29uZmlncywgX19US01vZHVsZXMgfSBmcm9tIFwiLi9Nb2R1bGVcIjtcclxuaW1wb3J0IHsgSU1vZENvbmZpZywgSU1vZHVsZSwgTW9kdWxlIH0gZnJvbSBcIi4vTW9kdWxlXCI7XHJcbmltcG9ydCB7IGV4aXN0c1N5bmMsIFBhdGhMaWtlLCByZWFkRmlsZVN5bmMsIHdyaXRlRmlsZVN5bmMsIG1rZGlyU3luYyB9IGZyb20gXCJub2RlOmZzXCI7XHJcblxyXG5jb25zdCBMb2dnZXIgPSBuZXcgU2lnbmFsZSh7XHJcblx0dHlwZXM6IHtcclxuXHRcdGRpc2FibGVkOiB7XHJcblx0XHRcdGxhYmVsOiBcIkRpc2FibGVkXCIsXHJcblx0XHRcdGNvbG9yOiBcImdyZXlcIixcclxuXHRcdFx0YmFkZ2U6IFwi4p2MXCIsXHJcblx0XHR9LFxyXG5cdFx0Y3JlYXRlOiB7XHJcblx0XHRcdGxhYmVsOiBcIkNyZWF0ZVwiLFxyXG5cdFx0XHRjb2xvcjogXCJ5ZWxsb3dcIixcclxuXHRcdFx0YmFkZ2U6IFwi4pyoXCIsXHJcblx0XHR9LFxyXG5cdH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1vZENvbmZpZyB7XHJcblx0cHJpdmF0ZSBDb25maWc6IElNb2RDb25maWc7XHJcblx0cHJpdmF0ZSBQYXRoOiBQYXRoTGlrZTtcclxuXHJcblx0LyoqXHJcblx0ICogQW4gYXJyYXkgb2YgTW9kdWxlSURzIHRoYXQgZ2V0cyB1cGRhdGVkIGF0IHN0YXJ0dXAgZHVyaW5nIHNjYW4vaW5pdCBvZiBhbGwgbW9kdWxlc1xyXG5cdCAqIEFueSBNb2R1bGUgZm91bmQgaW4gdGhlIG1vZHMgZm9sZGVyIHRoYXQgZG9lc250IGhhdmUgYSBtYXRjaGluZyBDb25maWdcclxuXHQgKiB3aWxsIHNob3cgdXAgaW4gdGhpcyBsaXN0IGFuZCB3aWxsIGF1dG9tYXRpY2FsbHkgaGF2ZSBhIGRlZmF1bHQgY29uZmlnIGdlbmVyYXRlZCBmb3IgaXQuXHJcblx0ICovXHJcblx0cHJpdmF0ZSBOb3RJbml0OiBJTW9kdWxlLk1vZElEW10gPSBbXTtcclxuXHJcblx0Y29uc3RydWN0b3IobW9kOiBNb2R1bGUpIHtcclxuXHRcdHRoaXMuUGF0aCA9IGpvaW4ocHJvY2Vzcy5jd2QoKSwgXCJjb25maWdcIiwgYCR7bW9kLmdldElEKCl9LnRvbWxgKTtcclxuXHJcblx0XHQvL1Rvb2xraXQuTG9nZ2VyLkNvcmUuZGVidWcodGhpcy5QYXRoKTtcclxuXHJcblx0XHRpZiAoZXhpc3RzU3luYyh0aGlzLlBhdGgpKSB7XHJcblx0XHRcdHRoaXMuc2V0Q29uZmlnKG1vZC5nZXRJRCgpKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdExvZ2dlci5jcmVhdGUoYE5ldyBDb25maWcgZm9yICR7bW9kLmdldE5hbWUoKX1gKTtcclxuXHRcdFx0dGhpcy5tYWtlQ29uZmlnKCk7XHJcblx0XHRcdHRoaXMuTm90SW5pdC5wdXNoKG1vZC5nZXRJRCgpKTtcclxuXHRcdH1cclxuXHRcdC8vbW9kLmdldE5hbWUoKSwgbW9kLmdldElEKCksIG1vZC5nZXRWZXJzaW9uKCksIG1vZC5nZXRUeXBlKCksIG1vZC5nZXRSZXF1aXJlcygpXHJcblxyXG5cdFx0Ly90aGlzLkNvbmZpZyA9IHRoaXMucGFyc2VDb25maWcodGhpcy5yZWFkRmlsZShwYXRoKSk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIG1ha2VDb25maWcoKSB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRta2RpclN5bmMocGFyc2VQYXRoKHRoaXMuUGF0aC50b1N0cmluZygpKS5kaXIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRpZiAoZS5jb2RlICE9IFwiRUVYSVNUXCIpIExvZ2dlci5lcnJvcihgRmFpbGVkIHRvIGNyZWF0ZSBjb25maWcgZGlyZWN0b3J5LlxcbiR7ZS5tZXNzYWdlfWApO1xyXG5cdFx0fSBmaW5hbGx5IHtcclxuXHRcdFx0cmV0dXJuIHdyaXRlRmlsZVN5bmModGhpcy5QYXRoLCBcIlwiLCBcInV0ZjhcIik7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHJlYWRGaWxlKHBhdGg6IFBhdGhMaWtlKTogc3RyaW5nIHtcclxuXHRcdHJldHVybiByZWFkRmlsZVN5bmMocGF0aCwgXCJ1dGY4XCIpO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBwYXJzZUNvbmZpZyh0ZXh0OiBzdHJpbmcpOiBJTW9kQ29uZmlnIHtcclxuXHRcdGxldCBjb25maWcgPSBwYXJzZSh0ZXh0KTtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdC4uLmNvbmZpZyxcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHNldENvbmZpZyhpZDogSU1vZHVsZS5Nb2RJRCkge1xyXG5cdFx0bGV0IGRhdGEgPSB0aGlzLnJlYWRGaWxlKHRoaXMuUGF0aCk7XHJcblx0XHR0aGlzLkNvbmZpZyA9IHRoaXMucGFyc2VDb25maWcoZGF0YSk7XHJcblx0XHRfX1RLQ29uZmlncy5zZXQoaWQsIHRoaXMpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGdldENvbmZpZygpIHtcclxuXHRcdHJldHVybiB0aGlzLkNvbmZpZztcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBub3RJbml0KGlkOiBJTW9kdWxlLk1vZElEKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5Ob3RJbml0LmluY2x1ZGVzKGlkKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBpbml0KFxyXG5cdFx0bmFtZTogSU1vZHVsZS5Nb2ROYW1lLFxyXG5cdFx0aWQ6IElNb2R1bGUuTW9kSUQsXHJcblx0XHR2ZXJzaW9uOiBJTW9kdWxlLk1vZFZlcnNpb24gPSBcIjAuMC4wXCIsXHJcblx0XHR0eXBlOiBJTW9kdWxlLk1vZFR5cGUgPSBcIm1vZFwiLFxyXG5cdFx0cmVxdWlyZXM6IElNb2R1bGUuTW9kUmVxdWlyZXMgPSBcIm5vbmVcIlxyXG5cdCkge1xyXG5cdFx0bGV0IGRhdGEgPSBgW21vZHVsZV1cclxubmFtZSA9IFwiJHtuYW1lfVwiXHJcbmlkID0gXCIke2lkfVwiXHJcbnZlcnNpb24gPSBcIiR7dmVyc2lvbn1cIlxyXG50eXBlID0gXCIke3R5cGV9XCJcclxucmVxdWlyZXMgPSBcIiR7cmVxdWlyZXN9XCJcclxuZGlzYWJsZWQgPSBmYWxzZWA7XHJcblxyXG5cdFx0d3JpdGVGaWxlU3luYyh0aGlzLlBhdGgsIGRhdGEsIFwidXRmOFwiKTtcclxuXHJcblx0XHRsZXQgYSA9IHRoaXMuTm90SW5pdC5pbmRleE9mKGlkKTtcclxuXHRcdGRlbGV0ZSB0aGlzLk5vdEluaXRbYV07XHJcblx0XHR0aGlzLnNldENvbmZpZyhpZCk7XHJcblxyXG5cdFx0TG9nZ2VyLmNyZWF0ZShgSW5pdGlhbGl6ZWQgQ29uZmlnIGZvciAke25hbWV9YCk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNb2RDb25maWc7XHJcbiJdfQ==