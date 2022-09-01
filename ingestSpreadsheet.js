const fs = require("fs");
const path = require("path");
const { readTextFile, readJsonFile, readCsvFile, writeCsvFile, writeJsonFile, ensureDirExists, normalizeToken } = require("./util.js");

const DATA_DIRECTORY = './_data'
const EXPORT_DIRECTORY = './_data'

const INPUT_FILE_PATH = path.join(EXPORT_DIRECTORY, "games.csv");
const OUTPUT_FILE_PATH = path.join(EXPORT_DIRECTORY, "games.json");


const isDefined = o => !(!o);
const isFalse = b => b == false;


function processRow(row) {
	return row;
}


const csvRows = readCsvFile(INPUT_FILE_PATH);

console.log(`${csvRows.length} rows`);

const results = csvRows.map(processRow);

ensureDirExists(EXPORT_DIRECTORY);

writeJsonFile({
	path: OUTPUT_FILE_PATH,
	data: results
})

console.log(`Wrote results to ${OUTPUT_FILE_PATH}`);

console.log("Done!");
