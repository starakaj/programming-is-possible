const fs = require("fs");
const { promisify } = require("util");
const moment = require("moment");
const path = require("path");
const readFileAsync = promisify(fs.readFile);

// Get command line arguments
const myArgs = process.argv.slice(2);
if (myArgs.length < 2) {
    console.log("Usage: node get_temp_range.js <log-file-name> <yyyy-mm-dd>");
    process.exit(0);
}

const filename = myArgs[0];
const filterdate = myArgs[1];

readFileAsync(filename, "utf8").then((contents) => {
    // Split on newlines and filter out empty lines
    const lines = contents.split("\n").filter(line => line.length > 0);
    // Parse each line as JSON
    const parsedLines = lines.map(JSON.parse);
    // Filter for those lines with the same day, using the granularity controls from moment
    const filteredLines = parsedLines.filter(line => {
        return moment(line.time).isSame(filterdate, "day");
    });
    const maxTemp = filteredLines.map(line => line.temp).reduce((a, b) => Math.max(a, b));
    const minTemp = filteredLines.map(line => line.temp).reduce((a, b) => Math.min(a, b));
    console.log(`Temperature min: ${minTemp} max: ${maxTemp}`);
}).catch(e => console.error(e));
