/**
 * /*
 * API Entry File
 *
 * @format
 */

// TODO: Create various API endpoints for internal and external tool usage

/***** Imports *****/
import dgram from "node:dgram";
import Toolkit from "@Toolkit";
import { HandleError } from "./udpsocket/HandleError";
import { HandleListening } from "./udpsocket/HandleListening";
import { HandleMessage } from "./udpsocket/HandleMessage";

/***** Setup *****/
let Logger = Toolkit.Logger.Api;
Logger.start("Initializing");

Logger.await(`Starting UDP Socket Server`);
export const Server = dgram.createSocket("udp4");

Server.on("error", HandleError);
Server.on("message", HandleMessage);
Server.on("listening", HandleListening);
