"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SPARQLQueryDispatcher = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
class SPARQLQueryDispatcher {
    endpoint;
    constructor(endpoint) {
        this.endpoint = endpoint;
    }
    query(sparqlQuery) {
        const fullUrl = this.endpoint + "?query=" + encodeURIComponent(sparqlQuery);
        const headers = { Accept: "application/sparql-results+json" };
        return (0, node_fetch_1.default)(fullUrl, { headers }).then((body) => body.json());
    }
}
exports.SPARQLQueryDispatcher = SPARQLQueryDispatcher;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1BBUlFMUXVlcnlEaXNwYXRjaGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZXMvamV3Z3Vlc3NyL1NQQVJRTFF1ZXJ5RGlzcGF0Y2hlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7O0FBRWQsNERBQStCO0FBRS9CLE1BQWEscUJBQXFCO0lBQ3ZCLFFBQVEsQ0FBUztJQUUzQixZQUFZLFFBQWdCO1FBQzNCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzFCLENBQUM7SUFFRCxLQUFLLENBQUMsV0FBbUI7UUFDeEIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLEdBQUcsa0JBQWtCLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDNUUsTUFBTSxPQUFPLEdBQUcsRUFBRSxNQUFNLEVBQUUsaUNBQWlDLEVBQUUsQ0FBQztRQUU5RCxPQUFPLElBQUEsb0JBQUssRUFBQyxPQUFPLEVBQUUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFDaEUsQ0FBQztDQUNEO0FBYkQsc0RBYUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGZvcm1hdCAqL1xyXG5cclxuaW1wb3J0IGZldGNoIGZyb20gXCJub2RlLWZldGNoXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU1BBUlFMUXVlcnlEaXNwYXRjaGVyIHtcclxuXHRwcm90ZWN0ZWQgZW5kcG9pbnQ6IHN0cmluZztcclxuXHJcblx0Y29uc3RydWN0b3IoZW5kcG9pbnQ6IHN0cmluZykge1xyXG5cdFx0dGhpcy5lbmRwb2ludCA9IGVuZHBvaW50O1xyXG5cdH1cclxuXHJcblx0cXVlcnkoc3BhcnFsUXVlcnk6IHN0cmluZykge1xyXG5cdFx0Y29uc3QgZnVsbFVybCA9IHRoaXMuZW5kcG9pbnQgKyBcIj9xdWVyeT1cIiArIGVuY29kZVVSSUNvbXBvbmVudChzcGFycWxRdWVyeSk7XHJcblx0XHRjb25zdCBoZWFkZXJzID0geyBBY2NlcHQ6IFwiYXBwbGljYXRpb24vc3BhcnFsLXJlc3VsdHMranNvblwiIH07XHJcblxyXG5cdFx0cmV0dXJuIGZldGNoKGZ1bGxVcmwsIHsgaGVhZGVycyB9KS50aGVuKChib2R5KSA9PiBib2R5Lmpzb24oKSk7XHJcblx0fVxyXG59XHJcbiJdfQ==