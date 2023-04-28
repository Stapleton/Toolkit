/** @format */

const fs = require("fs");
const path = require("path");

function Recursor(directory) {
	// Get "direcory" stats
	fs.lstat(directory, function (error, stats) {
		if (error) console.error(error);
		if (stats.isDirectory()) {
			// Get all files in "directory"
			let directoryList = fs.readdirSync(directory);
			for (let file in directoryList) {
				Recursor(path.join(directory, directoryList[file]));
			}
		} else {
			let f = path.parse(directory);

			//if (disabled(f)) continue;
			//console.log(f);
			if (f.ext != ".mts") return;
			let name = `${f.name}.ts`;
			fs.renameSync(`${directory}`, `${path.join(f.root, f.dir, name)}`);
		}
	});
}

Recursor("./src");
