/** @format */
/// <reference types="node" />
import EventEmitter from "events";
export declare var __TKModules: Map<Module.ModID, Module>;
export declare var __TKConfigs: Map<Module.ModID, ModConfig>;
export declare namespace Module {
    type ModName = string;
    type ModID = string;
    type ModVersion = string;
    type ModType = "lib" | "mod";
    type ModRequires = "none" | Array<string>;
}
export interface IModConfig {
    name: Module.ModName;
    id: Module.ModID;
    version: Module.ModVersion;
    type: Module.ModType;
    requires: Module.ModRequires;
    disabled: boolean;
}
export default class Module extends EventEmitter {
    protected _name: Module.ModName;
    protected id: Module.ModID;
    protected version: Module.ModVersion;
    protected type: Module.ModType;
    protected requires: Module.ModRequires;
    protected _config: ModConfig;
    constructor(name: Module.ModName, id: Module.ModID, version: Module.ModVersion, type?: Module.ModType, requires?: Module.ModRequires);
    protected disabledMod(exitcode: number): void;
    getName(): Module.ModName;
    getID(): Module.ModID;
    getVersion(): Module.ModVersion;
    getType(): Module.ModType;
    getRequires(): Module.ModRequires;
}
export declare class ModConfig {
    private Config;
    private Path;
    /**
     * An array of ModuleIDs that gets updated at startup during scan/init of all modules
     * Any Module found in the mods folder that doesnt have a matching Config
     * will show up in this list and will automatically have a default config generated for it.
     */
    private NotInit;
    constructor(mod: Module);
    private makeConfig;
    private readFile;
    private parseConfig;
    private setConfig;
    getConfig(): IModConfig;
    notInit(id: Module.ModID): boolean;
    init(name: Module.ModName, id: Module.ModID, version?: Module.ModVersion, type?: Module.ModType, requires?: Module.ModRequires): void;
}
//# sourceMappingURL=Module.d.ts.map