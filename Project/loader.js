"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ip_address_1 = require("./loader_modules/ip-address");
var ip_generate_1 = require("./loader_modules/ip-generate");
var env_generate_1 = require("./loader_modules/env-generate");
var fs_extra_1 = __importDefault(require("fs-extra"));
var debug = require('debug')('service:loader');
debug.color = 1;
var ip_js_path = 'public/javascript/IP.js';
var ipv4 = new ip_address_1.IPv4();
var ip_file = new ip_generate_1.IPFile();
var ipv4_address;
var server_address = '165.22.210.37';
var server = ipv4.search(server_address);
var production_folder_path = 'env/production';
var production_env_path = 'env/production/.env';
var development_folder_path = 'env/development';
var development_env_path = 'env/development/.env';
var env = new env_generate_1.ENV(development_folder_path, development_env_path, production_folder_path, production_env_path);
var env_object = '';
var loader_json;
if (server === true) {
    ipv4_address = server_address;
}
else {
    ipv4_address = ipv4.get();
}
debug('Fetching object from loader.json');
try {
    loader_json = JSON.parse(fs_extra_1.default.readFileSync('loader.json').toString());
}
catch (error) {
    debug("Couldn't find loader.json for loading environment variables");
    debug('Exiting');
    console.log("Couldn't find loader.json for loading environment variables");
    console.log('Exiting');
    process.exit(0);
}
for (var i in loader_json) {
    for (var j in loader_json[i]) {
        env_object = env_object + (j.toUpperCase() + "=" + loader_json[i][j] + "\n");
    }
}
debug('Finished fetching object from loader.json');
function write_env_development(path) {
    fs_extra_1.default.writeFileSync(path, env_object + ("ADDRESS=" + ipv4_address));
}
function write_env_production(path) {
    fs_extra_1.default.writeFileSync(path, env_object + ("ADDRESS=" + ipv4_address));
}
debug('\nCreating env folder');
env.create();
debug('Finished creating env folder');
debug('Writing into .env file');
if (server === true) {
    write_env_production(production_env_path);
}
else {
    write_env_development(development_env_path);
}
debug('Loading of .env file');
env.load(server);
debug('Finished loading of .env file');
debug(process.env.ADDRESS);
debug('Generating IP.js file');
ip_file.create(server, ip_js_path);
debug('Finished generating IP.js');
