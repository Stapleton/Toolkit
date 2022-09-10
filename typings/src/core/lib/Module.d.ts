/** @format */
declare type ModType = "lib" | "mod";
declare type ModRequires = "none" | Array<string>;
export declare type ModConfig = {
    name: string;
    id: string;
    version: string;
    type: ModType;
    requires: ModRequires;
    test: {
        enabled: boolean;
        randomMax: number;
        randomMin: number;
    };
};
export default abstract class Module {
    private name;
    private id;
    private version;
    private type;
    private requires;
    constructor(name: string, id: string, version: string, type: ModType, requires: ModRequires);
    getName(): string;
    getID(): string;
    getVersion(): string;
    getType(): ModType;
    getRequires(): ModRequires;
}
export {};
//# sourceMappingURL=Module.d.ts.map