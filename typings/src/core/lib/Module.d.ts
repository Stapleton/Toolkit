/** @format */
import logger from "./Logger";
import { EventEmitter } from "node:events";
import { ModConfig } from "../lib/ModConfig";
export declare var __TKModules: Map<IModule.ModID, Module>;
export declare var __TKConfigs: Map<IModule.ModID, ModConfig>;
export declare namespace IModule {
    type ModName = string;
    type ModID = string;
    type ModVersion = string;
    type ModType = "lib" | "mod";
    type ModRequires = "none" | Array<string>;
}
export interface IModConfig {
    module: {
        name: IModule.ModName;
        id: IModule.ModID;
        version: IModule.ModVersion;
        type: IModule.ModType;
        requires: IModule.ModRequires;
        disabled: boolean;
    };
}
export declare class Module extends EventEmitter {
    protected _name: IModule.ModName;
    protected id: IModule.ModID;
    protected version: IModule.ModVersion;
    protected type: IModule.ModType;
    protected requires: IModule.ModRequires;
    protected _config: ModConfig;
    Logger: typeof logger["Global"];
    constructor(name: IModule.ModName, id: IModule.ModID, version: IModule.ModVersion, type?: IModule.ModType, requires?: IModule.ModRequires);
    protected disabledMod(exitcode: number): void;
    getName(): IModule.ModName;
    getID(): IModule.ModID;
    getVersion(): IModule.ModVersion;
    getType(): IModule.ModType;
    getRequires(): IModule.ModRequires;
}
//# sourceMappingURL=Module.d.ts.map