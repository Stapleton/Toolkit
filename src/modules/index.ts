/**
 * Modules Entry File
 *
 * @format
 */

// TODO: Start each module as its own child process
// TODO: All of my old bot modules will be rewritten into personal use tools for use within Toolkit

// ?: Will this have 3rd-party service connections? Yes. Notably Discord.

// ?: The old musicbot will be built into its own module and hosted from the Toolkit

// ?: A better Discord permisison manager will be added at some point.
// ?: Something that will kinda mimic discord's manager but has channel permission info and a permission hierarchy
// ?: laid out as part of the UI so you can see in a tree who can do what

/***** Imports *****/
import { ChildProcess, fork } from "child_process";
import { Signale } from "signale";

/***** Setup *****/
export const Logger = new Signale({ scope: "Modules" });

Logger.start("Initializing");

export const Forks: { [key: string]: ChildProcess } = {
  ChatCleaner: fork("./src/modules/chat-cleaner/index.ts", { serialization: "advanced" }),
  CommandManager: fork("./src/modules/command-manager/index.ts", { serialization: "advanced" }),
  CustomRPC: fork("./src/modules/custom-rpc/index.ts", { serialization: "advanced" }),
  Discord: fork("./src/modules/discord/index.ts", { serialization: "advanced" }),
  Jewguessr: fork("./src/modules/jewguessr/index.ts", { serialization: "advanced" }),
  MassBanTool: fork("./src/modules/mass-ban-tool/index.ts", { serialization: "advanced" }),
  Musicbot: fork("./src/modules/musicbot/index.ts", { serialization: "advanced" }),
  RoleManager: fork("./src/modules/role-manager/index.ts", { serialization: "advanced" }),
  Sandbox: fork("./src/modules/sandbox/index.ts", { serialization: "advanced" }),
  StockTrader: fork("./src/modules/stock-trader/index.ts", { serialization: "advanced" }),
  TextToSpeech: fork("./src/modules/text-to-speech/index.ts", { serialization: "advanced" }),
};
