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
exports.TKModules = void 0;
const path_1 = require("path");
const Sleep_1 = __importDefault(require("../core/utils/Sleep"));
const child_process_1 = require("child_process");
const fs_1 = require("fs");
/* Setup ModuleLoader */
class TKModules {
    Toolkit;
    Logger;
    discoveries = [];
    candidates = [];
    errored = [];
    forks = [];
    constructor(toolkit) {
        this.Toolkit = toolkit;
        this.Logger = toolkit.Logger.Mods;
        this.discover(this.Toolkit.Paths.Mods).then((_) => {
            this.Logger.complete(`Discovered ${this.discoveries.length} Modules`);
            this.resolveAndSortCandidates().then((_) => {
                this.Logger.complete(`Resolved ${this.candidates.flat().length} Modules. Sorted into ${this.candidates.length} dependency groups.`);
                this.forkCandidates().then((_) => {
                    //this.Logger.info(this.candidates);
                    this.Logger.success(`Forked ${this.forks.length} Modules Successfully`);
                    if (this.errored.length > 0)
                        this.Logger.warn(`${this.errored.length} Modules failed to load`);
                });
            });
        });
    }
    async discover(directory) {
        this.Logger.await("Discovering Modules");
        // Get "direcory" stats
        let stats = (0, fs_1.lstatSync)(directory);
        //if (error) this.Logger.error(error);
        if (stats.isDirectory()) {
            // Get all files in "directory"
            let directoryList = (0, fs_1.readdirSync)(directory), fileName, dirString;
            for (let fileIdx in directoryList) {
                fileName = directoryList[fileIdx];
                dirString = (0, path_1.join)(directory.toString(), fileName);
                if (fileName.includes("."))
                    continue;
                //if (disabled(f)) continue;
                if ((0, fs_1.existsSync)((0, path_1.join)(dirString, "tk-module.json")) == true)
                    this.discoveries.push({
                        modulePath: dirString,
                        entryPath: (0, path_1.join)(dirString, "index.ts"),
                        metaPath: (0, path_1.join)(dirString, "tk-module.json"),
                    });
                //fork(join(dirString, "index.ts"), { serialization: "advanced" })
                else
                    continue;
            }
        }
    }
    async resolveAndSortCandidates() {
        this.Logger.await("Resolving and Sorting Modules");
        let groupedCandidates = [];
        for (let discovery of this.discoveries) {
            let candidate = {
                ...discovery,
                ...require(discovery.metaPath).meta,
            };
            let groupIdx = candidate.requires.length - 1;
            if (!groupedCandidates[groupIdx])
                groupedCandidates[groupIdx] = [];
            groupedCandidates[groupIdx].push(candidate);
        }
        this.candidates = groupedCandidates.flat();
    }
    async forkCandidates() {
        this.Logger.await("Forking Modules");
        for (let idx = this.candidates.length - 1; idx != -1; idx--) {
            let candidate = this.candidates[idx];
            try {
                this.forks[idx] = {
                    ...candidate,
                    fork: (0, child_process_1.fork)(candidate.entryPath, { serialization: "advanced" }),
                };
                (0, Sleep_1.default)(200);
            }
            catch (error) {
                this.Logger.error(`Failed to fork module: ${candidate.id}\n\t\tModule Path: ${candidate.modulePath}\n\t\tModule Version: ${candidate.version}\n\t\tModule Dependencies: ${candidate.requires.join(", ")}`);
                this.errored.push(candidate);
            }
        }
    }
    getModuleForks() {
        return this.forks;
    }
}
exports.TKModules = TKModules;
exports.default = TKModules;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kdWxlcy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRzs7Ozs7O0FBSUgsK0JBQTRCO0FBQzVCLGdFQUF3QztBQUN4QyxpREFBbUQ7QUFFbkQsMkJBQWtFO0FBcUJsRSx3QkFBd0I7QUFDeEIsTUFBYSxTQUFTO0lBQ2IsT0FBTyxDQUFLO0lBQ1osTUFBTSxDQUF1QjtJQUU3QixXQUFXLEdBQWdCLEVBQUUsQ0FBQztJQUM5QixVQUFVLEdBQWdCLEVBQUUsQ0FBQztJQUM3QixPQUFPLEdBQWdCLEVBQUUsQ0FBQztJQUMxQixLQUFLLEdBQVcsRUFBRSxDQUFDO0lBRTNCLFlBQVksT0FBVztRQUN0QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDakQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsY0FBYyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sVUFBVSxDQUFDLENBQUM7WUFDdEUsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQzFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUNuQixZQUFZLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSx5QkFDeEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUNqQixxQkFBcUIsQ0FDckIsQ0FBQztnQkFDRixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7b0JBQ2hDLG9DQUFvQztvQkFDcEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sdUJBQXVCLENBQUMsQ0FBQztvQkFDeEUsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDO3dCQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLHlCQUF5QixDQUFDLENBQUM7Z0JBQ2hHLENBQUMsQ0FBQyxDQUFDO1lBQ0osQ0FBQyxDQUFDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFTyxLQUFLLENBQUMsUUFBUSxDQUFDLFNBQW1CO1FBQ3pDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDekMsdUJBQXVCO1FBQ3ZCLElBQUksS0FBSyxHQUFHLElBQUEsY0FBUyxFQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2pDLHNDQUFzQztRQUN0QyxJQUFJLEtBQUssQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDO1lBQ3pCLCtCQUErQjtZQUMvQixJQUFJLGFBQWEsR0FBRyxJQUFBLGdCQUFXLEVBQUMsU0FBUyxDQUFDLEVBQ3pDLFFBQVEsRUFDUixTQUFTLENBQUM7WUFDWCxLQUFLLElBQUksT0FBTyxJQUFJLGFBQWEsRUFBRSxDQUFDO2dCQUNuQyxRQUFRLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNsQyxTQUFTLEdBQUcsSUFBQSxXQUFJLEVBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUVqRCxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO29CQUFFLFNBQVM7Z0JBQ3JDLDRCQUE0QjtnQkFDNUIsSUFBSSxJQUFBLGVBQVUsRUFBQyxJQUFBLFdBQUksRUFBQyxTQUFTLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxJQUFJLElBQUk7b0JBQ3hELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO3dCQUNyQixVQUFVLEVBQUUsU0FBUzt3QkFDckIsU0FBUyxFQUFFLElBQUEsV0FBSSxFQUFDLFNBQVMsRUFBRSxVQUFVLENBQUM7d0JBQ3RDLFFBQVEsRUFBRSxJQUFBLFdBQUksRUFBQyxTQUFTLEVBQUUsZ0JBQWdCLENBQUM7cUJBQzNDLENBQUMsQ0FBQztnQkFDSixrRUFBa0U7O29CQUM3RCxTQUFTO1lBQ2YsQ0FBQztRQUNGLENBQUM7SUFDRixDQUFDO0lBRU8sS0FBSyxDQUFDLHdCQUF3QjtRQUNyQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1FBQ25ELElBQUksaUJBQWlCLEdBQWtCLEVBQUUsQ0FBQztRQUUxQyxLQUFLLElBQUksU0FBUyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN4QyxJQUFJLFNBQVMsR0FBYztnQkFDMUIsR0FBRyxTQUFTO2dCQUNaLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJO2FBQ25DLENBQUM7WUFFRixJQUFJLFFBQVEsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFFN0MsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQztnQkFBRSxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDbkUsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzdDLENBQUM7UUFFRCxJQUFJLENBQUMsVUFBVSxHQUFHLGlCQUFpQixDQUFDLElBQUksRUFBRSxDQUFDO0lBQzVDLENBQUM7SUFFTyxLQUFLLENBQUMsY0FBYztRQUMzQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3JDLEtBQUssSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDO1lBQzdELElBQUksU0FBUyxHQUFjLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDO2dCQUNKLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUc7b0JBQ2pCLEdBQUcsU0FBUztvQkFDWixJQUFJLEVBQUUsSUFBQSxvQkFBSSxFQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLENBQUM7aUJBQzlELENBQUM7Z0JBQ0YsSUFBQSxlQUFLLEVBQUMsR0FBRyxDQUFDLENBQUM7WUFDWixDQUFDO1lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztnQkFDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQ2hCLDBCQUEwQixTQUFTLENBQUMsRUFBRSxzQkFDckMsU0FBUyxDQUFDLFVBQ1gseUJBQXlCLFNBQVMsQ0FBQyxPQUFPLDhCQUE4QixTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDOUYsSUFBSSxDQUNKLEVBQUUsQ0FDSCxDQUFDO2dCQUNGLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzlCLENBQUM7UUFDRixDQUFDO0lBQ0YsQ0FBQztJQUVNLGNBQWM7UUFDcEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ25CLENBQUM7Q0FDRDtBQXRHRCw4QkFzR0M7QUFFRCxrQkFBZSxTQUFTLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogTW9kdWxlcyBFbnRyeSBGaWxlXHJcbiAqXHJcbiAqIEBmb3JtYXRcclxuICovXHJcblxyXG4vKioqKiogSW1wb3J0cyAqKioqKi9cclxuaW1wb3J0IFRLIGZyb20gXCIuLlwiO1xyXG5pbXBvcnQgeyBqb2luIH0gZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IFNsZWVwIGZyb20gXCIuLi9jb3JlL3V0aWxzL1NsZWVwXCI7XHJcbmltcG9ydCB7IENoaWxkUHJvY2VzcywgZm9yayB9IGZyb20gXCJjaGlsZF9wcm9jZXNzXCI7XHJcbmltcG9ydCB7IElNb2R1bGUgfSBmcm9tIFwiLi4vLi4vc3JjL2NvcmUvbGliL01vZHVsZVwiO1xyXG5pbXBvcnQgeyBleGlzdHNTeW5jLCBsc3RhdFN5bmMsIFBhdGhMaWtlLCByZWFkZGlyU3luYyB9IGZyb20gXCJmc1wiO1xyXG5cclxuLyogSW50ZXJmYWNlcyAqL1xyXG5pbnRlcmZhY2UgRGlzY292ZXJ5IHtcclxuXHRtb2R1bGVQYXRoOiBzdHJpbmc7XHJcblx0ZW50cnlQYXRoOiBzdHJpbmc7XHJcblx0bWV0YVBhdGg6IHN0cmluZztcclxufVxyXG5cclxuaW50ZXJmYWNlIENhbmRpZGF0ZSBleHRlbmRzIERpc2NvdmVyeSB7XHJcblx0bmFtZTogSU1vZHVsZS5Nb2ROYW1lO1xyXG5cdGlkOiBJTW9kdWxlLk1vZElEO1xyXG5cdHZlcnNpb246IElNb2R1bGUuTW9kVmVyc2lvbjtcclxuXHR0eXBlOiBJTW9kdWxlLk1vZFR5cGU7XHJcblx0cmVxdWlyZXM6IElNb2R1bGUuTW9kUmVxdWlyZXNbXTtcclxufVxyXG5cclxuaW50ZXJmYWNlIEZvcmsgZXh0ZW5kcyBDYW5kaWRhdGUge1xyXG5cdGZvcms6IENoaWxkUHJvY2VzcztcclxufVxyXG5cclxuLyogU2V0dXAgTW9kdWxlTG9hZGVyICovXHJcbmV4cG9ydCBjbGFzcyBUS01vZHVsZXMge1xyXG5cdHByaXZhdGUgVG9vbGtpdDogVEs7XHJcblx0cHJpdmF0ZSBMb2dnZXI6IFRLW1wiTG9nZ2VyXCJdW1wiTW9kc1wiXTtcclxuXHJcblx0cHJpdmF0ZSBkaXNjb3ZlcmllczogRGlzY292ZXJ5W10gPSBbXTtcclxuXHRwcml2YXRlIGNhbmRpZGF0ZXM6IENhbmRpZGF0ZVtdID0gW107XHJcblx0cHJpdmF0ZSBlcnJvcmVkOiBDYW5kaWRhdGVbXSA9IFtdO1xyXG5cdHByaXZhdGUgZm9ya3M6IEZvcmtbXSA9IFtdO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcih0b29sa2l0OiBUSykge1xyXG5cdFx0dGhpcy5Ub29sa2l0ID0gdG9vbGtpdDtcclxuXHRcdHRoaXMuTG9nZ2VyID0gdG9vbGtpdC5Mb2dnZXIuTW9kcztcclxuXHRcdHRoaXMuZGlzY292ZXIodGhpcy5Ub29sa2l0LlBhdGhzLk1vZHMpLnRoZW4oKF8pID0+IHtcclxuXHRcdFx0dGhpcy5Mb2dnZXIuY29tcGxldGUoYERpc2NvdmVyZWQgJHt0aGlzLmRpc2NvdmVyaWVzLmxlbmd0aH0gTW9kdWxlc2ApO1xyXG5cdFx0XHR0aGlzLnJlc29sdmVBbmRTb3J0Q2FuZGlkYXRlcygpLnRoZW4oKF8pID0+IHtcclxuXHRcdFx0XHR0aGlzLkxvZ2dlci5jb21wbGV0ZShcclxuXHRcdFx0XHRcdGBSZXNvbHZlZCAke3RoaXMuY2FuZGlkYXRlcy5mbGF0KCkubGVuZ3RofSBNb2R1bGVzLiBTb3J0ZWQgaW50byAke1xyXG5cdFx0XHRcdFx0XHR0aGlzLmNhbmRpZGF0ZXMubGVuZ3RoXHJcblx0XHRcdFx0XHR9IGRlcGVuZGVuY3kgZ3JvdXBzLmBcclxuXHRcdFx0XHQpO1xyXG5cdFx0XHRcdHRoaXMuZm9ya0NhbmRpZGF0ZXMoKS50aGVuKChfKSA9PiB7XHJcblx0XHRcdFx0XHQvL3RoaXMuTG9nZ2VyLmluZm8odGhpcy5jYW5kaWRhdGVzKTtcclxuXHRcdFx0XHRcdHRoaXMuTG9nZ2VyLnN1Y2Nlc3MoYEZvcmtlZCAke3RoaXMuZm9ya3MubGVuZ3RofSBNb2R1bGVzIFN1Y2Nlc3NmdWxseWApO1xyXG5cdFx0XHRcdFx0aWYgKHRoaXMuZXJyb3JlZC5sZW5ndGggPiAwKSB0aGlzLkxvZ2dlci53YXJuKGAke3RoaXMuZXJyb3JlZC5sZW5ndGh9IE1vZHVsZXMgZmFpbGVkIHRvIGxvYWRgKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgYXN5bmMgZGlzY292ZXIoZGlyZWN0b3J5OiBQYXRoTGlrZSkge1xyXG5cdFx0dGhpcy5Mb2dnZXIuYXdhaXQoXCJEaXNjb3ZlcmluZyBNb2R1bGVzXCIpO1xyXG5cdFx0Ly8gR2V0IFwiZGlyZWNvcnlcIiBzdGF0c1xyXG5cdFx0bGV0IHN0YXRzID0gbHN0YXRTeW5jKGRpcmVjdG9yeSk7XHJcblx0XHQvL2lmIChlcnJvcikgdGhpcy5Mb2dnZXIuZXJyb3IoZXJyb3IpO1xyXG5cdFx0aWYgKHN0YXRzLmlzRGlyZWN0b3J5KCkpIHtcclxuXHRcdFx0Ly8gR2V0IGFsbCBmaWxlcyBpbiBcImRpcmVjdG9yeVwiXHJcblx0XHRcdGxldCBkaXJlY3RvcnlMaXN0ID0gcmVhZGRpclN5bmMoZGlyZWN0b3J5KSxcclxuXHRcdFx0XHRmaWxlTmFtZSxcclxuXHRcdFx0XHRkaXJTdHJpbmc7XHJcblx0XHRcdGZvciAobGV0IGZpbGVJZHggaW4gZGlyZWN0b3J5TGlzdCkge1xyXG5cdFx0XHRcdGZpbGVOYW1lID0gZGlyZWN0b3J5TGlzdFtmaWxlSWR4XTtcclxuXHRcdFx0XHRkaXJTdHJpbmcgPSBqb2luKGRpcmVjdG9yeS50b1N0cmluZygpLCBmaWxlTmFtZSk7XHJcblxyXG5cdFx0XHRcdGlmIChmaWxlTmFtZS5pbmNsdWRlcyhcIi5cIikpIGNvbnRpbnVlO1xyXG5cdFx0XHRcdC8vaWYgKGRpc2FibGVkKGYpKSBjb250aW51ZTtcclxuXHRcdFx0XHRpZiAoZXhpc3RzU3luYyhqb2luKGRpclN0cmluZywgXCJ0ay1tb2R1bGUuanNvblwiKSkgPT0gdHJ1ZSlcclxuXHRcdFx0XHRcdHRoaXMuZGlzY292ZXJpZXMucHVzaCh7XHJcblx0XHRcdFx0XHRcdG1vZHVsZVBhdGg6IGRpclN0cmluZyxcclxuXHRcdFx0XHRcdFx0ZW50cnlQYXRoOiBqb2luKGRpclN0cmluZywgXCJpbmRleC50c1wiKSxcclxuXHRcdFx0XHRcdFx0bWV0YVBhdGg6IGpvaW4oZGlyU3RyaW5nLCBcInRrLW1vZHVsZS5qc29uXCIpLFxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0Ly9mb3JrKGpvaW4oZGlyU3RyaW5nLCBcImluZGV4LnRzXCIpLCB7IHNlcmlhbGl6YXRpb246IFwiYWR2YW5jZWRcIiB9KVxyXG5cdFx0XHRcdGVsc2UgY29udGludWU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHByaXZhdGUgYXN5bmMgcmVzb2x2ZUFuZFNvcnRDYW5kaWRhdGVzKCkge1xyXG5cdFx0dGhpcy5Mb2dnZXIuYXdhaXQoXCJSZXNvbHZpbmcgYW5kIFNvcnRpbmcgTW9kdWxlc1wiKTtcclxuXHRcdGxldCBncm91cGVkQ2FuZGlkYXRlczogQ2FuZGlkYXRlW11bXSA9IFtdO1xyXG5cclxuXHRcdGZvciAobGV0IGRpc2NvdmVyeSBvZiB0aGlzLmRpc2NvdmVyaWVzKSB7XHJcblx0XHRcdGxldCBjYW5kaWRhdGU6IENhbmRpZGF0ZSA9IHtcclxuXHRcdFx0XHQuLi5kaXNjb3ZlcnksXHJcblx0XHRcdFx0Li4ucmVxdWlyZShkaXNjb3ZlcnkubWV0YVBhdGgpLm1ldGEsXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRsZXQgZ3JvdXBJZHggPSBjYW5kaWRhdGUucmVxdWlyZXMubGVuZ3RoIC0gMTtcclxuXHJcblx0XHRcdGlmICghZ3JvdXBlZENhbmRpZGF0ZXNbZ3JvdXBJZHhdKSBncm91cGVkQ2FuZGlkYXRlc1tncm91cElkeF0gPSBbXTtcclxuXHRcdFx0Z3JvdXBlZENhbmRpZGF0ZXNbZ3JvdXBJZHhdLnB1c2goY2FuZGlkYXRlKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmNhbmRpZGF0ZXMgPSBncm91cGVkQ2FuZGlkYXRlcy5mbGF0KCk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGFzeW5jIGZvcmtDYW5kaWRhdGVzKCkge1xyXG5cdFx0dGhpcy5Mb2dnZXIuYXdhaXQoXCJGb3JraW5nIE1vZHVsZXNcIik7XHJcblx0XHRmb3IgKGxldCBpZHggPSB0aGlzLmNhbmRpZGF0ZXMubGVuZ3RoIC0gMTsgaWR4ICE9IC0xOyBpZHgtLSkge1xyXG5cdFx0XHRsZXQgY2FuZGlkYXRlOiBDYW5kaWRhdGUgPSB0aGlzLmNhbmRpZGF0ZXNbaWR4XTtcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHR0aGlzLmZvcmtzW2lkeF0gPSB7XHJcblx0XHRcdFx0XHQuLi5jYW5kaWRhdGUsXHJcblx0XHRcdFx0XHRmb3JrOiBmb3JrKGNhbmRpZGF0ZS5lbnRyeVBhdGgsIHsgc2VyaWFsaXphdGlvbjogXCJhZHZhbmNlZFwiIH0pLFxyXG5cdFx0XHRcdH07XHJcblx0XHRcdFx0U2xlZXAoMjAwKTtcclxuXHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcclxuXHRcdFx0XHR0aGlzLkxvZ2dlci5lcnJvcihcclxuXHRcdFx0XHRcdGBGYWlsZWQgdG8gZm9yayBtb2R1bGU6ICR7Y2FuZGlkYXRlLmlkfVxcblxcdFxcdE1vZHVsZSBQYXRoOiAke1xyXG5cdFx0XHRcdFx0XHRjYW5kaWRhdGUubW9kdWxlUGF0aFxyXG5cdFx0XHRcdFx0fVxcblxcdFxcdE1vZHVsZSBWZXJzaW9uOiAke2NhbmRpZGF0ZS52ZXJzaW9ufVxcblxcdFxcdE1vZHVsZSBEZXBlbmRlbmNpZXM6ICR7Y2FuZGlkYXRlLnJlcXVpcmVzLmpvaW4oXHJcblx0XHRcdFx0XHRcdFwiLCBcIlxyXG5cdFx0XHRcdFx0KX1gXHJcblx0XHRcdFx0KTtcclxuXHRcdFx0XHR0aGlzLmVycm9yZWQucHVzaChjYW5kaWRhdGUpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0TW9kdWxlRm9ya3MoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5mb3JrcztcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRLTW9kdWxlcztcclxuIl19