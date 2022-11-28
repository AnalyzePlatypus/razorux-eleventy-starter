const fs = require("fs");
const path = require("path");


const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x);
const resolveFilePath = filepath => path.resolve(__dirname, filepath)

const readTextFile = pipe(
	resolveFilePath,
	fs.readFileSync,
	buffer => buffer.toString(),
);

const readJsonFile = pipe(
	readTextFile,
	JSON.parse
)

function readCsvFile(path) {
	return Papa.parse(readTextFile(path), {
		header: true,
		dynamicTyping: true
	}).data;
}

function writeCsvFile({path, data}) {
	return fs.writeFileSync(path, Papa.unparse(data));
}

function writeJsonFile({path, data}) {
	return fs.writeFileSync(path, JSON.stringify(data || {}));
}



// Import env vars from .env.json

function loadEnvVars(path) {
	const envVars = readJsonFile(path);
	Object.entries(envVars).forEach(([key, value])=>{
		process.env[key] = value;
	});
}

function validateEnvVars(envVars) {
	envVars.forEach(envVar => {
		if(!process.env[envVar]) throw `Missing required env var "${envVar}"`;
	})
}

function ensureDirExists(path) {
	if(!fs.existsSync(path)) fs.mkdirSync(path)
}


const normalizeToken = str => {
	console.log(str);
	if(!str) return str;
	return str.trim().toLowerCase();
}

async function asyncForEach(array, callback) {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
}

async function asyncMap(array, callback) {
	const results = [];
	for (let index = 0; index < array.length; index++) {
		results.push(await callback(array[index], index, array));
	}
	return results;
}


async function sleep(ms) {
	return await new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomIntBetween(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min); 
}


const assertObjectMatchesPaths = paths => (args, i) => {
	if(!args) throw new TypeError(`Missing argument object (Got ${args})`)
	paths.forEach(path => {
		const value = get(args, path);
		const itemIndexStr = i !== undefined ? 'Item ' + i + ' ': '';
		if(value == undefined || value == null) throw new TypeError(`${itemIndexStr}Missing required argument key '${ path }' (Got ${ value })`);
	})
}


function parseBoolean(str) {
	if(str === undefined) throw `Parse boolean failed. Must be called with String or Boolean but got \`${str}\``
	if (typeof str === "boolean") return str;
	const normalized = normalizeToken(str);
	if (normalized == 'true') return true;
	if (normalized == 'false') return false;
	throw `parseBoolean failed. Unable to convert string "${str}" to Boolean.`;
}


const sortByObjectPath = path => (a,b) => {
	if(a[path] > b[path]) return 1;
	if(a[path] < b[path]) return -1;
	return 0;
}


async function downto(n1, n2, fn) {
	console.log(`downto(${n1}, ${n2})`);
	for(i = n1; i >= n2; i -= 1) {
		if(await fn(i)) break;
	}
}

async function upto(n1, n2, fn) {
	for(i = n1; i <= n2; i += 1) {
		if(await fn(i)) break;
	}
}

function cloneProperties(source, paths) {
	const result = {}
	paths.forEach(key => {
		result[key] = source[key];
	})
	return result;
}


// Dollar/cent conversion 
// And yes, I find `dollarsToCents(n)` to be clearer than `n / 100`

const CENTS_IN_DOLLAR = 100;

function dollarsToCents(dollars) {
	return dollars * CENTS_IN_DOLLAR;
}

function centsToDollars(cents) {
	return cents / CENTS_IN_DOLLAR;
}

const clone = o => JSON.parse(JSON.stringify(o))
const invokeMethod = functionName => obj => obj[functionName]();


exports.readJsonFile = readJsonFile;
exports.loadEnvVars = loadEnvVars;
exports.validateEnvVars = validateEnvVars;
exports.readCsvFile = readCsvFile;
exports.readTextFile = readTextFile;
exports.normalizeToken = normalizeToken;
exports.writeCsvFile = writeCsvFile;
exports.ensureDirExists = ensureDirExists;
exports.writeJsonFile = writeJsonFile;