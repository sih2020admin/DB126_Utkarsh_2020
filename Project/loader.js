"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ip_address_1 = require("./loader_modules/ip-address");
//import { IPFile } from './loader_modules/ip-generate'
var env_generate_1 = require("./loader_modules/env-generate");
var debug = require('debug')('service:loader');
debug.color = 1;
//var ip_js_path: string = 'public/javascript/IP.js'
var ipv4 = new ip_address_1.IPv4();
//var ip_file = new IPFile()
var ipv4_address;
var server_address = '165.22.210.37';
var server = ipv4.search(server_address);
var production_folder_path = 'env/production';
var production_env_path = 'env/production/.env';
var development_folder_path = 'env/development';
var development_env_path = 'env/development/.env';
var json_path = 'loader.json';
try {
    var env = new env_generate_1.ENV(development_folder_path, development_env_path, production_folder_path, production_env_path, json_path);
}
catch (error) {
    debug("Couldn't find loader.json for loading environment variables");
    debug('Exiting');
    console.log("Couldn't find loader.json for loading environment variables");
    console.log('Exiting');
    process.exit(0);
}
if (server === true) {
    ipv4_address = server_address;
}
else {
    ipv4_address = ipv4.get();
}
debug('Creating env folder');
env.create();
debug('Finished creating env folder');
debug('\nWriting into .env file');
env.write(server, ipv4_address);
debug('Finished writing into .env file');
debug('\nLoading of .env file');
env.load(server);
debug('Finished loading of .env file');
/* debug('\nGenerating IP.js file')
ip_file.create(server, ip_js_path)
debug('Finished generating IP.js') */
