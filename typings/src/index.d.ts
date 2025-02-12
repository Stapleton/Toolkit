/** @format */
import Logger from "./core/lib/Logger";
import { ChildProcess } from "child_process";
import TKApi from "./api";
import TKCore from "./core";
import TKModules from "./modules";
export type ToolkitDomain = "api" | "app" | "core" | "module";
/***** Setup Toolkit *****/
declare class Toolkit {
    private static INSTANCE;
    Modules: Map<string, import("@Core/lib/ModConfig").ModConfig>;
    Configs: Map<string, import("@Core/lib/ModConfig").ModConfig>;
    TKApi: TKApi;
    TKApp: ChildProcess;
    TKCore: TKCore;
    TKModules: TKModules;
    Paths: {
        Config: string;
        Api: string;
        App: string;
        Core: string;
        Mods: string;
    };
    Logger: typeof Logger;
    static getInstance(): Toolkit;
    private constructor();
    private checkAuth;
}
type TK = Toolkit;
export default TK;
//# sourceMappingURL=index.d.ts.map