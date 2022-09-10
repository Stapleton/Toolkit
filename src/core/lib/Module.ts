/** @format */
type ModType = "lib" | "mod";
type ModRequires = "none" | Array<string>;

export interface ModConfig {
  name: string;
  id: string;
  version: string;
  type: ModType;
  requires: ModRequires;
}

export default abstract class Module {
  private name: string;
  private id: string;
  private version: string;
  private type: ModType;
  private requires: ModRequires;

  constructor(name: string, id: string, version: string, type: ModType, requires: ModRequires) {
    this.name = name;
    this.id = id;
    this.version = version;
    this.type = type;
    this.requires = requires;
  }

  public getName(): string {
    return this.name;
  }

  public getID(): string {
    return this.id;
  }

  public getVersion(): string {
    return this.version;
  }

  public getType(): ModType {
    return this.type;
  }

  public getRequires(): ModRequires {
    return this.requires;
  }
}
