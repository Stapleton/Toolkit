"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = __importDefault(require("../../core/lib/Logger"));
const auth_json_1 = require("../../../config/auth.json");
const discord_js_1 = require("discord.js");
class Client {
    static INSTANCE;
    static logger = Logger_1.default.Mods.scope("Mods.Discord.Client");
    djsClient;
    static getInstance() {
        if (!this.INSTANCE) {
            this.INSTANCE = new Client();
        }
        return this.INSTANCE;
    }
    constructor() {
        this.djsClient = new discord_js_1.Client({
            intents: [
                discord_js_1.GatewayIntentBits.Guilds,
                discord_js_1.GatewayIntentBits.GuildIntegrations,
                discord_js_1.GatewayIntentBits.GuildMembers,
                discord_js_1.GatewayIntentBits.GuildMessages,
                discord_js_1.GatewayIntentBits.GuildMessageReactions,
                discord_js_1.GatewayIntentBits.GuildMessageTyping,
                discord_js_1.GatewayIntentBits.GuildVoiceStates,
                discord_js_1.GatewayIntentBits.GuildWebhooks,
                discord_js_1.GatewayIntentBits.MessageContent,
            ],
        });
        this.djsClient.once(discord_js_1.Events.ClientReady, this.handlerClientReady);
        this.djsClient.login(auth_json_1.Discord.BotToken);
    }
    handlerClientReady(_client) {
        Client.logger.success(`Discord Client Ready! Username is ${_client.user.username}`);
    }
}
exports.default = Client;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZXMvZGlzY29yZC9DbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBR2QsbUVBQTJDO0FBQzNDLHlEQUFvRDtBQUNwRCwyQ0FBNEU7QUFFNUUsTUFBcUIsTUFBTTtJQUNsQixNQUFNLENBQUMsUUFBUSxDQUFTO0lBRXpCLE1BQU0sQ0FBQyxNQUFNLEdBQTBCLGdCQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBRS9FLFNBQVMsQ0FBWTtJQUV0QixNQUFNLENBQUMsV0FBVztRQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxNQUFNLEVBQUUsQ0FBQztRQUM5QixDQUFDO1FBQ0QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3RCLENBQUM7SUFFRDtRQUNDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxtQkFBUyxDQUFDO1lBQzlCLE9BQU8sRUFBRTtnQkFDUiw4QkFBaUIsQ0FBQyxNQUFNO2dCQUN4Qiw4QkFBaUIsQ0FBQyxpQkFBaUI7Z0JBQ25DLDhCQUFpQixDQUFDLFlBQVk7Z0JBQzlCLDhCQUFpQixDQUFDLGFBQWE7Z0JBQy9CLDhCQUFpQixDQUFDLHFCQUFxQjtnQkFDdkMsOEJBQWlCLENBQUMsa0JBQWtCO2dCQUNwQyw4QkFBaUIsQ0FBQyxnQkFBZ0I7Z0JBQ2xDLDhCQUFpQixDQUFDLGFBQWE7Z0JBQy9CLDhCQUFpQixDQUFDLGNBQWM7YUFDaEM7U0FDRCxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxtQkFBTSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUVqRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxtQkFBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFTyxrQkFBa0IsQ0FBQyxPQUFrQjtRQUM1QyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxxQ0FBcUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQ3JGLENBQUM7O0FBcENGLHlCQXFDQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAZm9ybWF0ICovXHJcblxyXG5pbXBvcnQgeyBTaWduYWxlIH0gZnJvbSBcInNpZ25hbGVcIjtcclxuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vLi4vY29yZS9saWIvTG9nZ2VyXCI7XHJcbmltcG9ydCB7IERpc2NvcmQgfSBmcm9tIFwiLi4vLi4vLi4vY29uZmlnL2F1dGguanNvblwiO1xyXG5pbXBvcnQgeyBDbGllbnQgYXMgREpTQ2xpZW50LCBFdmVudHMsIEdhdGV3YXlJbnRlbnRCaXRzIH0gZnJvbSBcImRpc2NvcmQuanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENsaWVudCB7XHJcblx0cHJpdmF0ZSBzdGF0aWMgSU5TVEFOQ0U6IENsaWVudDtcclxuXHJcblx0cHVibGljIHN0YXRpYyBsb2dnZXI6IHR5cGVvZiBMb2dnZXJbXCJNb2RzXCJdID0gTG9nZ2VyLk1vZHMuc2NvcGUoXCJNb2RzLkRpc2NvcmQuQ2xpZW50XCIpO1xyXG5cclxuXHRwcml2YXRlIGRqc0NsaWVudDogREpTQ2xpZW50O1xyXG5cclxuXHRwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCkge1xyXG5cdFx0aWYgKCF0aGlzLklOU1RBTkNFKSB7XHJcblx0XHRcdHRoaXMuSU5TVEFOQ0UgPSBuZXcgQ2xpZW50KCk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcy5JTlNUQU5DRTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgY29uc3RydWN0b3IoKSB7XHJcblx0XHR0aGlzLmRqc0NsaWVudCA9IG5ldyBESlNDbGllbnQoe1xyXG5cdFx0XHRpbnRlbnRzOiBbXHJcblx0XHRcdFx0R2F0ZXdheUludGVudEJpdHMuR3VpbGRzLFxyXG5cdFx0XHRcdEdhdGV3YXlJbnRlbnRCaXRzLkd1aWxkSW50ZWdyYXRpb25zLFxyXG5cdFx0XHRcdEdhdGV3YXlJbnRlbnRCaXRzLkd1aWxkTWVtYmVycyxcclxuXHRcdFx0XHRHYXRld2F5SW50ZW50Qml0cy5HdWlsZE1lc3NhZ2VzLFxyXG5cdFx0XHRcdEdhdGV3YXlJbnRlbnRCaXRzLkd1aWxkTWVzc2FnZVJlYWN0aW9ucyxcclxuXHRcdFx0XHRHYXRld2F5SW50ZW50Qml0cy5HdWlsZE1lc3NhZ2VUeXBpbmcsXHJcblx0XHRcdFx0R2F0ZXdheUludGVudEJpdHMuR3VpbGRWb2ljZVN0YXRlcyxcclxuXHRcdFx0XHRHYXRld2F5SW50ZW50Qml0cy5HdWlsZFdlYmhvb2tzLFxyXG5cdFx0XHRcdEdhdGV3YXlJbnRlbnRCaXRzLk1lc3NhZ2VDb250ZW50LFxyXG5cdFx0XHRdLFxyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGhpcy5kanNDbGllbnQub25jZShFdmVudHMuQ2xpZW50UmVhZHksIHRoaXMuaGFuZGxlckNsaWVudFJlYWR5KTtcclxuXHJcblx0XHR0aGlzLmRqc0NsaWVudC5sb2dpbihEaXNjb3JkLkJvdFRva2VuKTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgaGFuZGxlckNsaWVudFJlYWR5KF9jbGllbnQ6IERKU0NsaWVudCkge1xyXG5cdFx0Q2xpZW50LmxvZ2dlci5zdWNjZXNzKGBEaXNjb3JkIENsaWVudCBSZWFkeSEgVXNlcm5hbWUgaXMgJHtfY2xpZW50LnVzZXIudXNlcm5hbWV9YCk7XHJcblx0fVxyXG59XHJcbiJdfQ==