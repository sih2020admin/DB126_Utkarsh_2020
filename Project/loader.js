"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var e_1, _a, e_2, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var os_1 = __importDefault(require("os"));
var fs_1 = __importDefault(require("fs"));
var dotenv_1 = __importDefault(require("dotenv"));
var debug = require('debug')('service:loader');
debug.color = 1;
var list_of_IPV4_address = [];
var server = 0;
var server_address = '165.22.210.37';
var production_folder_path = 'env/production';
var production_env_path = 'env/production/.env';
var development_folder_path = 'env/development';
var development_env_path = 'env/development/.env';
var env_object = '';
debug('Fetching object from loader.json');
try {
    var loader_json = JSON.parse(fs_1.default.readFileSync('loader.json').toString());
}
catch (error) {
    debug("Couldn't find loader.json for loading environment variables");
    debug('Exiting');
    process.exit(0);
}
for (var i_1 in loader_json) {
    for (var j_1 in loader_json[i_1]) {
        env_object = env_object + (j_1.toUpperCase() + "=" + loader_json[i_1][j_1] + "\n");
    }
}
debug('Finished fetching object from loader.json');
debug('\nInitalizing env folder');
function create_production_folder() {
    debug("Couldn't find production folder in env folder");
    fs_1.default.mkdirSync(production_folder_path);
    debug('Creating .env file in production folder');
    fs_1.default.writeFileSync(production_env_path, '');
}
function create_development_folder() {
    debug("Couldn't find development folder in env folder");
    fs_1.default.mkdirSync(development_folder_path);
    debug('Creating .env file in development folder');
    fs_1.default.writeFileSync(development_env_path, '');
}
function create_both_folder() {
    debug('Create both folder function called');
    debug('Creating production folder in env folder');
    fs_1.default.mkdirSync(production_folder_path);
    debug('Creating .env file in production folder');
    fs_1.default.writeFileSync(production_env_path, '');
    debug('Creating development folder in env folder');
    fs_1.default.mkdirSync(development_folder_path);
    debug('Creating .env file in development folder');
    fs_1.default.writeFileSync(development_env_path, '');
}
function write_env_development(path) {
    var e_3, _a;
    var ip_development = '';
    try {
        for (var list_of_IPV4_address_2 = __values(list_of_IPV4_address), list_of_IPV4_address_2_1 = list_of_IPV4_address_2.next(); !list_of_IPV4_address_2_1.done; list_of_IPV4_address_2_1 = list_of_IPV4_address_2.next()) {
            var i = list_of_IPV4_address_2_1.value;
            if (i.includes('192.168')) {
                ip_development = i;
            }
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (list_of_IPV4_address_2_1 && !list_of_IPV4_address_2_1.done && (_a = list_of_IPV4_address_2.return)) _a.call(list_of_IPV4_address_2);
        }
        finally { if (e_3) throw e_3.error; }
    }
    fs_1.default.writeFileSync(path, env_object + ("ADDRESS=" + ip_development));
}
function write_env_production(path) {
    var e_4, _a;
    var ip_production = '';
    try {
        for (var list_of_IPV4_address_3 = __values(list_of_IPV4_address), list_of_IPV4_address_3_1 = list_of_IPV4_address_3.next(); !list_of_IPV4_address_3_1.done; list_of_IPV4_address_3_1 = list_of_IPV4_address_3.next()) {
            var i = list_of_IPV4_address_3_1.value;
            if (i.includes('165.22')) {
                ip_production = i;
            }
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (list_of_IPV4_address_3_1 && !list_of_IPV4_address_3_1.done && (_a = list_of_IPV4_address_3.return)) _a.call(list_of_IPV4_address_3);
        }
        finally { if (e_4) throw e_4.error; }
    }
    fs_1.default.writeFileSync(path, env_object + ("ADDRESS=" + ip_production));
}
if (fs_1.default.existsSync('env')) {
    debug('Detected env folder in current directory');
    if (fs_1.default.existsSync(production_folder_path) === false && fs_1.default.existsSync(development_folder_path) === false) {
        debug('Could not find production and development folder in env folder\nCreating them');
        create_both_folder();
    }
    else {
        if (fs_1.default.existsSync(production_folder_path)) {
            if (fs_1.default.existsSync(production_env_path)) {
                debug('.env file present in production folder');
            }
            else {
                debug('Creating .env file in production folder');
                fs_1.default.writeFileSync(production_env_path, '');
            }
        }
        else {
            create_production_folder();
        }
        if (fs_1.default.existsSync(development_folder_path)) {
            if (fs_1.default.existsSync(development_env_path)) {
                debug('.env file present in development folder');
            }
            else {
                debug('Creating .env file in development folder');
                fs_1.default.writeFileSync(development_env_path, '');
            }
        }
        else {
            create_development_folder();
        }
    }
}
else {
    debug('Creating env folder');
    fs_1.default.mkdirSync('env');
    create_both_folder();
}
debug('Finished initializing env folder');
for (var i in os_1.default.networkInterfaces()) {
    try {
        //console.log(i)
        for (var _c = (e_1 = void 0, __values(os_1.default.networkInterfaces()[i])), _d = _c.next(); !_d.done; _d = _c.next()) {
            var j = _d.value;
            if (j.address.split('.').length === 4 && j.address !== '127.0.0.1') {
                list_of_IPV4_address.push(j.address);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
        }
        finally { if (e_1) throw e_1.error; }
    }
}
debug('\nList of IPV4 addresses is %o', list_of_IPV4_address);
debug("Found " + list_of_IPV4_address.length + " valid IPV4 addresses on current system");
debug("Current setting automatically rejects localhost address");
try {
    for (var list_of_IPV4_address_1 = __values(list_of_IPV4_address), list_of_IPV4_address_1_1 = list_of_IPV4_address_1.next(); !list_of_IPV4_address_1_1.done; list_of_IPV4_address_1_1 = list_of_IPV4_address_1.next()) {
        var i = list_of_IPV4_address_1_1.value;
        if (i === server_address) {
            server = 1;
            debug('Detected Remote Server IPV4 address');
            debug('Current system might be remote server');
            debug('Performing procedures in accordance to remote server');
        }
    }
}
catch (e_2_1) { e_2 = { error: e_2_1 }; }
finally {
    try {
        if (list_of_IPV4_address_1_1 && !list_of_IPV4_address_1_1.done && (_b = list_of_IPV4_address_1.return)) _b.call(list_of_IPV4_address_1);
    }
    finally { if (e_2) throw e_2.error; }
}
debug('Writing into .env file');
if (server === 1) {
    write_env_production(production_env_path);
}
else {
    write_env_development(development_env_path);
}
//fs.writeFileSync('')
/* if (fs.existsSync('./.env') && server === 0) {
    debug(`\nDetected .env file in current directory`)
    
    debug('Fetching contents from the file')
    var file_contents = fs.readFileSync('./.env').toString().split('\n')
    debug('Finished fetching contents from the file')
    debug('Determining address used in the file')
    for (var i of file_contents) {
        if (i.includes('ADDRESS') === true) {
            debug('Found address in the file')
        }
    }
} */
debug('Loading of .env file');
if (server === 1) {
    debug("Loading .env file in production folder");
    dotenv_1.default.config({ path: production_env_path });
}
else {
    debug("\nCouldn't detect remote server IP Address on this system");
    debug('Current system might be a local system  for testing and development');
    debug("Loading .env file in development folder");
    dotenv_1.default.config({ path: development_env_path });
}
debug(process.env.ADDRESS);
debug('Finished loading of .env file');
