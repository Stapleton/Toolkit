/** @format */
/// <reference types="signale" />
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
}
declare const _default: Toolkit;
export default _default;
//# sourceMappingURL=Toolkit.d.ts.map