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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
const SPARQLQueryDispatcher_1 = require("../../../src/modules/jewguessr/SPARQLQueryDispatcher");
const ScrapeIMDB_1 = require("../../../src/modules/jewguessr/ScrapeIMDB");
const json = __importStar(require("jsonfile"));
const fs = __importStar(require("fs"));
class Validator {
    slug;
    cacheFile = "./src/plugins/JewValidator/namecache.json";
    endpointUrl = "https://query.wikidata.org/sparql";
    queryDispatcher = new SPARQLQueryDispatcher_1.SPARQLQueryDispatcher(this.endpointUrl);
    sparqlQuery = `SELECT ?family_name ?family_nameLabel WHERE {
    SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
    
    ?family_name wdt:P172 wd:Q7325.
    ?family_name wdt:P140 wd:Q9268.
    OPTIONAL { ?family_name wdt:P735 ?family_name. }
  }
  LIMIT 10000000`;
    constructor(slug) {
        this.slug = slug;
        try {
            fs.stat(this.cacheFile, (error, stats) => {
                if (error)
                    throw error;
                if (stats.mtimeMs % Date.now() >= this.aWeek())
                    this.updateCache();
            });
        }
        catch (e) {
            fs.writeFileSync(this.cacheFile, "[]");
        }
    }
    aWeek() {
        let i = 1; // 1 ms
        i = i * 1000; // 1s
        i = i * 60; // 1m
        i = i * 60; // 1h
        i = i * 24; // 1d
        i = i * 7; // 1w
        return i;
    }
    updateCache() {
        this.queryDispatcher.query(this.sparqlQuery).then((result) => {
            let cache = result.results.bindings.map((value) => {
                let v = value.family_nameLabel.value.split(" ");
                return v[v.length - 1];
            });
            json.writeFileSync(this.cacheFile, [...new Set(cache)]);
        });
    }
    async compare() {
        let self = this;
        let imdb = new ScrapeIMDB_1.ScrapeIMDB(this.slug);
        let dom = await imdb.getDOM();
        let cast = imdb.getCast(dom);
        let title = imdb.getTitle(dom);
        let names = await json.readFile(this.cacheFile);
        let jews = cast.filter((value) => {
            let v = value.split(" ");
            if (names.includes(v[v.length - 1]))
                return value;
        }, self);
        return `${title}\nThere are ${jews.length} jew(s) in the cast/crew.\n${jews.join(", ")}`;
    }
}
exports.Validator = Validator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZXMvamV3Z3Vlc3NyL1ZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWQsZ0dBQTZGO0FBQzdGLDBFQUF1RTtBQUN2RSwrQ0FBaUM7QUFDakMsdUNBQXlCO0FBdUJ6QixNQUFhLFNBQVM7SUFDYixJQUFJLENBQVM7SUFDYixTQUFTLEdBQWdCLDJDQUEyQyxDQUFDO0lBQ3JFLFdBQVcsR0FBVyxtQ0FBbUMsQ0FBQztJQUMxRCxlQUFlLEdBQUcsSUFBSSw2Q0FBcUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFFOUQsV0FBVyxHQUFHOzs7Ozs7O2lCQU9OLENBQUM7SUFFakIsWUFBWSxJQUFZO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRWpCLElBQUksQ0FBQztZQUNKLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRTtnQkFDeEMsSUFBSSxLQUFLO29CQUFFLE1BQU0sS0FBSyxDQUFDO2dCQUN2QixJQUFJLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3BFLENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQztRQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDWixFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEMsQ0FBQztJQUNGLENBQUM7SUFFTyxLQUFLO1FBQ1osSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTztRQUNsQixDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEtBQUs7UUFDbkIsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxLQUFLO1FBQ2pCLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsS0FBSztRQUNqQixDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEtBQUs7UUFDakIsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLO1FBQ2hCLE9BQU8sQ0FBQyxDQUFDO0lBQ1YsQ0FBQztJQUVNLFdBQVc7UUFDakIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQWtCLEVBQUUsRUFBRTtZQUN4RSxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDakQsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2hELE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDeEIsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6RCxDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFTSxLQUFLLENBQUMsT0FBTztRQUNuQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsSUFBSSxJQUFJLEdBQUcsSUFBSSx1QkFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQyxJQUFJLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUM5QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzdCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDL0IsSUFBSSxLQUFLLEdBQWEsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUUxRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDaEMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN6QixJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQUUsT0FBTyxLQUFLLENBQUM7UUFDbkQsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRVQsT0FBTyxHQUFHLEtBQUssZUFBZSxJQUFJLENBQUMsTUFBTSw4QkFBOEIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQzFGLENBQUM7Q0FDRDtBQWhFRCw4QkFnRUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGZvcm1hdCAqL1xyXG5cclxuaW1wb3J0IHsgU1BBUlFMUXVlcnlEaXNwYXRjaGVyIH0gZnJvbSBcIi4uLy4uLy4uL3NyYy9tb2R1bGVzL2pld2d1ZXNzci9TUEFSUUxRdWVyeURpc3BhdGNoZXJcIjtcclxuaW1wb3J0IHsgU2NyYXBlSU1EQiB9IGZyb20gXCIuLi8uLi8uLi9zcmMvbW9kdWxlcy9qZXdndWVzc3IvU2NyYXBlSU1EQlwiO1xyXG5pbXBvcnQgKiBhcyBqc29uIGZyb20gXCJqc29uZmlsZVwiO1xyXG5pbXBvcnQgKiBhcyBmcyBmcm9tIFwiZnNcIjtcclxuXHJcbnR5cGUgUmVzdWx0QmluZGluZyA9IFtcclxuXHR7XHJcblx0XHRmYW1pbHlfbmFtZToge1xyXG5cdFx0XHR0eXBlOiBzdHJpbmc7XHJcblx0XHRcdHZhbHVlOiBzdHJpbmc7XHJcblx0XHR9O1xyXG5cdFx0ZmFtaWx5X25hbWVMYWJlbDoge1xyXG5cdFx0XHRcInhtbDpsYW5nXCI6IHN0cmluZztcclxuXHRcdFx0dHlwZTogc3RyaW5nO1xyXG5cdFx0XHR2YWx1ZTogc3RyaW5nO1xyXG5cdFx0fTtcclxuXHR9XHJcbl07XHJcblxyXG50eXBlIFJlc3VsdFR5cGUgPSB7XHJcblx0aGVhZDogeyB2YXJzOiBzdHJpbmdbXSB9O1xyXG5cdHJlc3VsdHM6IHtcclxuXHRcdGJpbmRpbmdzOiBSZXN1bHRCaW5kaW5nO1xyXG5cdH07XHJcbn07XHJcblxyXG5leHBvcnQgY2xhc3MgVmFsaWRhdG9yIHtcclxuXHRwcml2YXRlIHNsdWc6IHN0cmluZztcclxuXHRwcml2YXRlIGNhY2hlRmlsZTogZnMuUGF0aExpa2UgPSBcIi4vc3JjL3BsdWdpbnMvSmV3VmFsaWRhdG9yL25hbWVjYWNoZS5qc29uXCI7XHJcblx0cHJpdmF0ZSBlbmRwb2ludFVybDogc3RyaW5nID0gXCJodHRwczovL3F1ZXJ5Lndpa2lkYXRhLm9yZy9zcGFycWxcIjtcclxuXHRwcml2YXRlIHF1ZXJ5RGlzcGF0Y2hlciA9IG5ldyBTUEFSUUxRdWVyeURpc3BhdGNoZXIodGhpcy5lbmRwb2ludFVybCk7XHJcblxyXG5cdHByaXZhdGUgc3BhcnFsUXVlcnkgPSBgU0VMRUNUID9mYW1pbHlfbmFtZSA/ZmFtaWx5X25hbWVMYWJlbCBXSEVSRSB7XHJcbiAgICBTRVJWSUNFIHdpa2liYXNlOmxhYmVsIHsgYmQ6c2VydmljZVBhcmFtIHdpa2liYXNlOmxhbmd1YWdlIFwiW0FVVE9fTEFOR1VBR0VdLGVuXCIuIH1cclxuICAgIFxyXG4gICAgP2ZhbWlseV9uYW1lIHdkdDpQMTcyIHdkOlE3MzI1LlxyXG4gICAgP2ZhbWlseV9uYW1lIHdkdDpQMTQwIHdkOlE5MjY4LlxyXG4gICAgT1BUSU9OQUwgeyA/ZmFtaWx5X25hbWUgd2R0OlA3MzUgP2ZhbWlseV9uYW1lLiB9XHJcbiAgfVxyXG4gIExJTUlUIDEwMDAwMDAwYDtcclxuXHJcblx0Y29uc3RydWN0b3Ioc2x1Zzogc3RyaW5nKSB7XHJcblx0XHR0aGlzLnNsdWcgPSBzbHVnO1xyXG5cclxuXHRcdHRyeSB7XHJcblx0XHRcdGZzLnN0YXQodGhpcy5jYWNoZUZpbGUsIChlcnJvciwgc3RhdHMpID0+IHtcclxuXHRcdFx0XHRpZiAoZXJyb3IpIHRocm93IGVycm9yO1xyXG5cdFx0XHRcdGlmIChzdGF0cy5tdGltZU1zICUgRGF0ZS5ub3coKSA+PSB0aGlzLmFXZWVrKCkpIHRoaXMudXBkYXRlQ2FjaGUoKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdGZzLndyaXRlRmlsZVN5bmModGhpcy5jYWNoZUZpbGUsIFwiW11cIik7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGFXZWVrKCkge1xyXG5cdFx0bGV0IGkgPSAxOyAvLyAxIG1zXHJcblx0XHRpID0gaSAqIDEwMDA7IC8vIDFzXHJcblx0XHRpID0gaSAqIDYwOyAvLyAxbVxyXG5cdFx0aSA9IGkgKiA2MDsgLy8gMWhcclxuXHRcdGkgPSBpICogMjQ7IC8vIDFkXHJcblx0XHRpID0gaSAqIDc7IC8vIDF3XHJcblx0XHRyZXR1cm4gaTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyB1cGRhdGVDYWNoZSgpIHtcclxuXHRcdHRoaXMucXVlcnlEaXNwYXRjaGVyLnF1ZXJ5KHRoaXMuc3BhcnFsUXVlcnkpLnRoZW4oKHJlc3VsdDogUmVzdWx0VHlwZSkgPT4ge1xyXG5cdFx0XHRsZXQgY2FjaGUgPSByZXN1bHQucmVzdWx0cy5iaW5kaW5ncy5tYXAoKHZhbHVlKSA9PiB7XHJcblx0XHRcdFx0bGV0IHYgPSB2YWx1ZS5mYW1pbHlfbmFtZUxhYmVsLnZhbHVlLnNwbGl0KFwiIFwiKTtcclxuXHRcdFx0XHRyZXR1cm4gdlt2Lmxlbmd0aCAtIDFdO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGpzb24ud3JpdGVGaWxlU3luYyh0aGlzLmNhY2hlRmlsZSwgWy4uLm5ldyBTZXQoY2FjaGUpXSk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBhc3luYyBjb21wYXJlKCkge1xyXG5cdFx0bGV0IHNlbGYgPSB0aGlzO1xyXG5cdFx0bGV0IGltZGIgPSBuZXcgU2NyYXBlSU1EQih0aGlzLnNsdWcpO1xyXG5cdFx0bGV0IGRvbSA9IGF3YWl0IGltZGIuZ2V0RE9NKCk7XHJcblx0XHRsZXQgY2FzdCA9IGltZGIuZ2V0Q2FzdChkb20pO1xyXG5cdFx0bGV0IHRpdGxlID0gaW1kYi5nZXRUaXRsZShkb20pO1xyXG5cdFx0bGV0IG5hbWVzOiBzdHJpbmdbXSA9IGF3YWl0IGpzb24ucmVhZEZpbGUodGhpcy5jYWNoZUZpbGUpO1xyXG5cclxuXHRcdGxldCBqZXdzID0gY2FzdC5maWx0ZXIoKHZhbHVlKSA9PiB7XHJcblx0XHRcdGxldCB2ID0gdmFsdWUuc3BsaXQoXCIgXCIpO1xyXG5cdFx0XHRpZiAobmFtZXMuaW5jbHVkZXModlt2Lmxlbmd0aCAtIDFdKSkgcmV0dXJuIHZhbHVlO1xyXG5cdFx0fSwgc2VsZik7XHJcblxyXG5cdFx0cmV0dXJuIGAke3RpdGxlfVxcblRoZXJlIGFyZSAke2pld3MubGVuZ3RofSBqZXcocykgaW4gdGhlIGNhc3QvY3Jldy5cXG4ke2pld3Muam9pbihcIiwgXCIpfWA7XHJcblx0fVxyXG59XHJcbiJdfQ==