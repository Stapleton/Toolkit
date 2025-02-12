"use strict";
/** @format */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const youtube_1 = __importDefault(require("./commands/youtube"));
const discord_js_1 = require("discord.js");
const Logger_1 = __importDefault(require("../../core/lib/Logger"));
const Auth = __importStar(require("../../../config/auth.json"));
class DiscordCommandManager {
    rest = new discord_js_1.REST().setToken(Auth.Discord.BotToken);
    logger = Logger_1.default.Mods.scope("Mods.CommandManager.DiscordCommandManager");
    constructor() {
        //console.log(youtube);
        this.RefreshSlashCommands().then();
    }
    async RefreshSlashCommands() {
        try {
            this.logger.start("Started refreshing application (/) commands.");
            this.rest
                .put(discord_js_1.Routes.applicationGuildCommands(Auth.Discord.ClientID, Auth.Discord.GuildID), {
                body: [youtube_1.default.data],
            })
                .then(() => this.logger.success("Successfully reloaded application (/) commands."));
        }
        catch (error) {
            this.logger.error(error);
        }
    }
}
exports.default = DiscordCommandManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGlzY29yZENvbW1hbmRNYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZXMvY29tbWFuZC1tYW5hZ2VyL0Rpc2NvcmRDb21tYW5kTWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFZCxpRUFBeUM7QUFDekMsMkNBQTBDO0FBQzFDLG1FQUEyQztBQUMzQyxnRUFBa0Q7QUFFbEQsTUFBcUIscUJBQXFCO0lBQ2pDLElBQUksR0FBRyxJQUFJLGlCQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNsRCxNQUFNLEdBQUcsZ0JBQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLDJDQUEyQyxDQUFDLENBQUM7SUFFaEY7UUFDQyx1QkFBdUI7UUFFdkIsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUVNLEtBQUssQ0FBQyxvQkFBb0I7UUFDaEMsSUFBSSxDQUFDO1lBQ0osSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsOENBQThDLENBQUMsQ0FBQztZQUVsRSxJQUFJLENBQUMsSUFBSTtpQkFDUCxHQUFHLENBQUMsbUJBQU0sQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNsRixJQUFJLEVBQUUsQ0FBQyxpQkFBTyxDQUFDLElBQUksQ0FBQzthQUNwQixDQUFDO2lCQUNELElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxpREFBaUQsQ0FBQyxDQUFDLENBQUM7UUFDdEYsQ0FBQztRQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUIsQ0FBQztJQUNGLENBQUM7Q0FDRDtBQXZCRCx3Q0F1QkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGZvcm1hdCAqL1xyXG5cclxuaW1wb3J0IHlvdXR1YmUgZnJvbSBcIi4vY29tbWFuZHMveW91dHViZVwiO1xyXG5pbXBvcnQgeyBSRVNULCBSb3V0ZXMgfSBmcm9tIFwiZGlzY29yZC5qc1wiO1xyXG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi8uLi9jb3JlL2xpYi9Mb2dnZXJcIjtcclxuaW1wb3J0ICogYXMgQXV0aCBmcm9tIFwiLi4vLi4vLi4vY29uZmlnL2F1dGguanNvblwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGlzY29yZENvbW1hbmRNYW5hZ2VyIHtcclxuXHRwcml2YXRlIHJlc3QgPSBuZXcgUkVTVCgpLnNldFRva2VuKEF1dGguRGlzY29yZC5Cb3RUb2tlbik7XHJcblx0cHJpdmF0ZSBsb2dnZXIgPSBMb2dnZXIuTW9kcy5zY29wZShcIk1vZHMuQ29tbWFuZE1hbmFnZXIuRGlzY29yZENvbW1hbmRNYW5hZ2VyXCIpO1xyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdC8vY29uc29sZS5sb2coeW91dHViZSk7XHJcblxyXG5cdFx0dGhpcy5SZWZyZXNoU2xhc2hDb21tYW5kcygpLnRoZW4oKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBhc3luYyBSZWZyZXNoU2xhc2hDb21tYW5kcygpIHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdHRoaXMubG9nZ2VyLnN0YXJ0KFwiU3RhcnRlZCByZWZyZXNoaW5nIGFwcGxpY2F0aW9uICgvKSBjb21tYW5kcy5cIik7XHJcblxyXG5cdFx0XHR0aGlzLnJlc3RcclxuXHRcdFx0XHQucHV0KFJvdXRlcy5hcHBsaWNhdGlvbkd1aWxkQ29tbWFuZHMoQXV0aC5EaXNjb3JkLkNsaWVudElELCBBdXRoLkRpc2NvcmQuR3VpbGRJRCksIHtcclxuXHRcdFx0XHRcdGJvZHk6IFt5b3V0dWJlLmRhdGFdLFxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0LnRoZW4oKCkgPT4gdGhpcy5sb2dnZXIuc3VjY2VzcyhcIlN1Y2Nlc3NmdWxseSByZWxvYWRlZCBhcHBsaWNhdGlvbiAoLykgY29tbWFuZHMuXCIpKTtcclxuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XHJcblx0XHRcdHRoaXMubG9nZ2VyLmVycm9yKGVycm9yKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIl19