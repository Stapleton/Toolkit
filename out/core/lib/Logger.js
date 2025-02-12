"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
/** @format */
const signale_1 = require("signale");
const Auth = __importStar(require("../../../config/auth.json"));
const SignaleTypes = {
    close: {
        label: "Closed",
        color: "red",
        badge: "🚫",
    },
    listen: {
        label: "Listening",
        color: "green",
        badge: "👂",
    },
    message: {
        label: "Message",
        color: "blue",
        badge: "💬",
    },
    connect: {
        label: "Connect",
        color: "cyan",
        badge: "🤝",
    },
    create: {
        label: "Create",
        color: "yellow",
        badge: "✨",
    },
    disabled: {
        label: "Disabled",
        color: "grey",
        badge: "❌",
    },
};
const SignaleOpts = {
    secrets: [Auth.Discord.BotToken, Auth.Discord.ClientID],
    scope: "Toolkit",
    types: SignaleTypes,
};
const Logger = {
    Global: new signale_1.Signale(SignaleOpts),
    Api: new signale_1.Signale(SignaleOpts).scope("Api"),
    App: new signale_1.Signale(SignaleOpts).scope("App"),
    Core: new signale_1.Signale(SignaleOpts).scope("Core"),
    Mods: new signale_1.Signale(SignaleOpts).scope("Mods"),
};
exports.default = Logger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmUvbGliL0xvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGNBQWM7QUFDZCxxQ0FBa0M7QUFDbEMsZ0VBQWtEO0FBRWxELE1BQU0sWUFBWSxHQUFHO0lBQ3BCLEtBQUssRUFBRTtRQUNOLEtBQUssRUFBRSxRQUFRO1FBQ2YsS0FBSyxFQUFFLEtBQUs7UUFDWixLQUFLLEVBQUUsSUFBSTtLQUNYO0lBQ0QsTUFBTSxFQUFFO1FBQ1AsS0FBSyxFQUFFLFdBQVc7UUFDbEIsS0FBSyxFQUFFLE9BQU87UUFDZCxLQUFLLEVBQUUsSUFBSTtLQUNYO0lBQ0QsT0FBTyxFQUFFO1FBQ1IsS0FBSyxFQUFFLFNBQVM7UUFDaEIsS0FBSyxFQUFFLE1BQU07UUFDYixLQUFLLEVBQUUsSUFBSTtLQUNYO0lBQ0QsT0FBTyxFQUFFO1FBQ1IsS0FBSyxFQUFFLFNBQVM7UUFDaEIsS0FBSyxFQUFFLE1BQU07UUFDYixLQUFLLEVBQUUsSUFBSTtLQUNYO0lBQ0QsTUFBTSxFQUFFO1FBQ1AsS0FBSyxFQUFFLFFBQVE7UUFDZixLQUFLLEVBQUUsUUFBUTtRQUNmLEtBQUssRUFBRSxHQUFHO0tBQ1Y7SUFDRCxRQUFRLEVBQUU7UUFDVCxLQUFLLEVBQUUsVUFBVTtRQUNqQixLQUFLLEVBQUUsTUFBTTtRQUNiLEtBQUssRUFBRSxHQUFHO0tBQ1Y7Q0FDRCxDQUFDO0FBRUYsTUFBTSxXQUFXLEdBQUc7SUFDbkIsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7SUFDdkQsS0FBSyxFQUFFLFNBQVM7SUFDaEIsS0FBSyxFQUFFLFlBQVk7Q0FDbkIsQ0FBQztBQUVGLE1BQU0sTUFBTSxHQUFHO0lBQ2QsTUFBTSxFQUFFLElBQUksaUJBQU8sQ0FBQyxXQUFXLENBQUM7SUFDaEMsR0FBRyxFQUFFLElBQUksaUJBQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO0lBQzFDLEdBQUcsRUFBRSxJQUFJLGlCQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztJQUMxQyxJQUFJLEVBQUUsSUFBSSxpQkFBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDNUMsSUFBSSxFQUFFLElBQUksaUJBQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO0NBQzVDLENBQUM7QUFFRixrQkFBZSxNQUFNLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGZvcm1hdCAqL1xyXG5pbXBvcnQgeyBTaWduYWxlIH0gZnJvbSBcInNpZ25hbGVcIjtcclxuaW1wb3J0ICogYXMgQXV0aCBmcm9tIFwiLi4vLi4vLi4vY29uZmlnL2F1dGguanNvblwiO1xyXG5cclxuY29uc3QgU2lnbmFsZVR5cGVzID0ge1xyXG5cdGNsb3NlOiB7XHJcblx0XHRsYWJlbDogXCJDbG9zZWRcIixcclxuXHRcdGNvbG9yOiBcInJlZFwiLFxyXG5cdFx0YmFkZ2U6IFwi8J+aq1wiLFxyXG5cdH0sXHJcblx0bGlzdGVuOiB7XHJcblx0XHRsYWJlbDogXCJMaXN0ZW5pbmdcIixcclxuXHRcdGNvbG9yOiBcImdyZWVuXCIsXHJcblx0XHRiYWRnZTogXCLwn5GCXCIsXHJcblx0fSxcclxuXHRtZXNzYWdlOiB7XHJcblx0XHRsYWJlbDogXCJNZXNzYWdlXCIsXHJcblx0XHRjb2xvcjogXCJibHVlXCIsXHJcblx0XHRiYWRnZTogXCLwn5KsXCIsXHJcblx0fSxcclxuXHRjb25uZWN0OiB7XHJcblx0XHRsYWJlbDogXCJDb25uZWN0XCIsXHJcblx0XHRjb2xvcjogXCJjeWFuXCIsXHJcblx0XHRiYWRnZTogXCLwn6SdXCIsXHJcblx0fSxcclxuXHRjcmVhdGU6IHtcclxuXHRcdGxhYmVsOiBcIkNyZWF0ZVwiLFxyXG5cdFx0Y29sb3I6IFwieWVsbG93XCIsXHJcblx0XHRiYWRnZTogXCLinKhcIixcclxuXHR9LFxyXG5cdGRpc2FibGVkOiB7XHJcblx0XHRsYWJlbDogXCJEaXNhYmxlZFwiLFxyXG5cdFx0Y29sb3I6IFwiZ3JleVwiLFxyXG5cdFx0YmFkZ2U6IFwi4p2MXCIsXHJcblx0fSxcclxufTtcclxuXHJcbmNvbnN0IFNpZ25hbGVPcHRzID0ge1xyXG5cdHNlY3JldHM6IFtBdXRoLkRpc2NvcmQuQm90VG9rZW4sIEF1dGguRGlzY29yZC5DbGllbnRJRF0sXHJcblx0c2NvcGU6IFwiVG9vbGtpdFwiLFxyXG5cdHR5cGVzOiBTaWduYWxlVHlwZXMsXHJcbn07XHJcblxyXG5jb25zdCBMb2dnZXIgPSB7XHJcblx0R2xvYmFsOiBuZXcgU2lnbmFsZShTaWduYWxlT3B0cyksXHJcblx0QXBpOiBuZXcgU2lnbmFsZShTaWduYWxlT3B0cykuc2NvcGUoXCJBcGlcIiksXHJcblx0QXBwOiBuZXcgU2lnbmFsZShTaWduYWxlT3B0cykuc2NvcGUoXCJBcHBcIiksXHJcblx0Q29yZTogbmV3IFNpZ25hbGUoU2lnbmFsZU9wdHMpLnNjb3BlKFwiQ29yZVwiKSxcclxuXHRNb2RzOiBuZXcgU2lnbmFsZShTaWduYWxlT3B0cykuc2NvcGUoXCJNb2RzXCIpLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTG9nZ2VyO1xyXG4iXX0=