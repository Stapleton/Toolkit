/**
 * /*
 * Modules Entry File
 *
 * @format
 */
/// <reference types="signale" />
/// <reference types="node" />
/***** Imports *****/
import { ChildProcess } from "child_process";
/***** Setup *****/
export declare const Logger: import("signale").Signale<import("signale").DefaultMethods>;
export declare const Forks: {
    [key: string]: ChildProcess;
};
//# sourceMappingURL=index.d.ts.map