/** @format */
/// <reference types="node" />
import ModConfig, { ModID } from "@Core/lib/ModConfig";
import { Module } from "@Core/lib/Module";
import { ChildProcess } from "child_process";
export declare type ToolkitWorker = "api" | "app" | "core" | "module";
export interface ToolkitConfig {
    disabled: ToolkitWorker[];
}
declare class Toolkit {
    Paths: {
        Config: string;
        Api: string;
        App: string;
        Core: string;
        Mods: string;
    };
    Logger: {
        Global: import("signale").Signale<import("signale").DefaultMethods>;
        Api: import("signale").Signale<import("signale").DefaultMethods>;
        App: import("signale").Signale<import("signale").DefaultMethods>;
        Core: import("signale").Signale<import("signale").DefaultMethods>;
        Mods: import("signale").Signale<import("signale").DefaultMethods>;
    };
    Workers: Map<ToolkitWorker, ChildProcess>;
    Modules: Map<ModID, Module>;
    Configs: Map<ModID, ModConfig>;
}
declare const _default: Toolkit;
export default _default;
//# sourceMappingURL=Toolkit.d.ts.map