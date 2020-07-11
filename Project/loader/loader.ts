import { IPv4 } from './loader_modules/ip-address'
//import { IPFile } from './loader_modules/ip-generate'
import { ENV } from './loader_modules/env-generate'
import fs, { fstatSync } from "fs-extra"
const debug = require('debug')('service:loader')
debug.color = 1
//var ip_js_path: string = 'public/javascript/IP.js'
var ipv4 = new IPv4() 
//var ip_file = new IPFile()
var ipv4_address: string
var server_address: string = '165.22.210.37'
var server: boolean = ipv4.search(server_address)
var production_folder_path: string = 'env/production'
var production_env_path: string = 'env/production/.env'
var development_folder_path: string = 'env/development'
var development_env_path: string = 'env/development/.env'
var toml_path: string = 'configuration/environment.toml'
try {
    var env = new ENV(development_folder_path, development_env_path, production_folder_path, production_env_path, toml_path)
} catch (error) {
    debug("Couldn't find environment.toml for loading environment variables")
    debug('Exiting')
    console.log("Couldn't find environment.toml for loading environment variables")
    console.log('Exiting')
    process.exit(0)
}
if (server === true) {
    ipv4_address = server_address
} else {
    ipv4_address = ipv4.get()
}
debug('Creating env folder')
env.create()
debug('Finished creating env folder')
debug('\nWriting into .env file')
env.write(server, ipv4_address)
debug('Finished writing into .env file')
debug('\nLoading of .env file')
env.load(server)
debug('Finished loading of .env file')
/* debug('\nGenerating IP.js file')
ip_file.create(server, ip_js_path)
debug('Finished generating IP.js') */
