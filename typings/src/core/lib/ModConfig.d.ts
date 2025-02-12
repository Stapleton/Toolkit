/** @format */
import { IModConfig, IModule, Module } from "./Module";
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
    notInit(id: IModule.ModID): boolean;
    init(name: IModule.ModName, id: IModule.ModID, version?: IModule.ModVersion, type?: IModule.ModType, requires?: IModule.ModRequires): void;
}
export default ModConfig;
//# sourceMappingURL=ModConfig.d.ts.map