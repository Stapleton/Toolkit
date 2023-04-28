/** @format */
/// <reference types="node" />
import Module from "@Core/lib/Module";
import { ChildProcess } from "child_process";
import { IModConfig } from "@Core/lib/Module";
export declare type ToolkitDomain = "api" | "app" | "core" | "module";
export interface ToolkitConfig extends IModConfig {
    Api: {
        disabled: boolean;
    };
    App: {
        disabled: boolean;
    };
    Core: {
        disabled: boolean;
    };
    Module: {
        disabled: boolean;
    };
}
export declare const SignaleOpts: {
    scope: string;
    types: {
        close: {
            label: string;
            color: string;
            badge: string;
        };
        listen: {
            label: string;
            color: string;
            badge: string;
        };
        message: {
            label: string;
            color: string;
            badge: string;
        };
        connect: {
            label: string;
            color: string;
            badge: string;
        };
        create: {
            label: string;
            color: string;
            badge: string;
        };
        disabled: {
            label: string;
            color: string;
            badge: string;
        };
    };
};
declare class Toolkit extends Module {
    readonly Config: ToolkitConfig;
    private static INSTANCE;
    Paths: {
        Config: string;
        Api: string;
        App: string;
        Core: string;
        Mods: string;
    };
    Logger: {
        Global: import("signale").Signale<"close" | "listen" | "message" | "connect" | "create" | "disabled">;
        Api: import("signale").Signale<"close" | "listen" | "message" | "connect" | "create" | "disabled">;
        App: import("signale").Signale<"close" | "listen" | "message" | "connect" | "create" | "disabled">;
        Core: import("signale").Signale<"close" | "listen" | "message" | "connect" | "create" | "disabled">;
        Mods: import("signale").Signale<"close" | "listen" | "message" | "connect" | "create" | "disabled">;
    };
    Workers: Map<ToolkitDomain, ChildProcess>;
    Modules: Map<string, import("@Core/lib/Module").ModConfig>;
    Configs: Map<string, import("@Core/lib/Module").ModConfig>;
    private constructor();
    static getInstance(): Toolkit;
}
declare const TK: Toolkit;
export default TK;
//# sourceMappingURL=Toolkit.d.ts.map