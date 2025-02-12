/**
 * Modules Entry File
 *
 * @format
 */
/***** Imports *****/
import TK from "..";
import { ChildProcess } from "child_process";
import { IModule } from "../../src/core/lib/Module";
interface Discovery {
    modulePath: string;
    entryPath: string;
    metaPath: string;
}
interface Candidate extends Discovery {
    name: IModule.ModName;
    id: IModule.ModID;
    version: IModule.ModVersion;
    type: IModule.ModType;
    requires: IModule.ModRequires[];
}
interface Fork extends Candidate {
    fork: ChildProcess;
}
export declare class TKModules {
    private Toolkit;
    private Logger;
    private discoveries;
    private candidates;
    private errored;
    private forks;
    constructor(toolkit: TK);
    private discover;
    private resolveAndSortCandidates;
    private forkCandidates;
    getModuleForks(): Fork[];
}
export default TKModules;
//# sourceMappingURL=index.d.ts.map