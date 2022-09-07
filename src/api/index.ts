/**
 * /*
 * API Entry File
 *
 * @format
 */

// TODO: Create various API endpoints for internal and external tool usage

/***** Imports *****/
import { Signale } from "signale";
import dgram from "node:dgram";

/***** Setup *****/
export const Logger = new Signale({ scope: "API" });

Logger.start("Initializing");

Logger.await(`Starting UDP Socket Server`);
export const Server = dgram.createSocket("udp4");
