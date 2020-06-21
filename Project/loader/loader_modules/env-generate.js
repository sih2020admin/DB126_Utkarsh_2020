"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
var fs_extra_1 = __importDefault(require("fs-extra"));
var dotenv_1 = __importDefault(require("dotenv"));
var debug = require('debug')('service:loader:env-generate');
var toml = require('@iarna/toml');
var ENV = /** @class */ (function () {
    function ENV(development_folder_path, development_env_path, production_folder_path, production_env_path, toml_path) {
        this.env_object = '';
        this.production_folder_path = production_folder_path;
        this.production_env_path = production_env_path;
        this.development_folder_path = development_folder_path;
        this.development_env_path = development_env_path;
        var loader_toml = toml.parse(fs_extra_1.default.readFileSync(toml_path));
        for (var i in loader_toml) {
            for (var j in loader_toml[i]) {
                this.env_object = this.env_object + (j.toUpperCase() + "=" + loader_toml[i][j] + "\n");
            }
        }
    }
    ENV.prototype.create = function () {
        if (fs_extra_1.default.existsSync('env')) {
            debug('Detected env folder in current directory');
            if (fs_extra_1.default.existsSync(this.production_folder_path) === false && fs_extra_1.default.existsSync(this.development_folder_path) === false) {
                debug('Could not find production and development folder in env folder\nCreating them');
                this.create_both();
            }
            {
                if (fs_extra_1.default.existsSync(this.production_folder_path)) {
                    if (fs_extra_1.default.existsSync(this.production_env_path)) {
                        debug('.env file present in production folder');
                    }
                    else {
                        debug('Creating .env file in production folder');
                        fs_extra_1.default.writeFileSync(this.production_env_path, '');
                    }
                }
                else {
                    this.create_prod();
                }
                if (fs_extra_1.default.existsSync(this.development_folder_path)) {
                    if (fs_extra_1.default.existsSync(this.development_env_path)) {
                        debug('.env file present in development folder');
                    }
                    else {
                        debug('Creating .env file in development folder');
                        fs_extra_1.default.writeFileSync(this.development_env_path, '');
                    }
                }
                else {
                    this.create_dev();
                }
            }
        }
        else {
            debug('Creating env folder');
            fs_extra_1.default.mkdirSync('env');
            this.create_both();
        }
    };
    ENV.prototype.create_dev = function () {
        debug("Couldn't find development folder in env folder");
        fs_extra_1.default.mkdirSync(this.development_folder_path);
        debug('Creating .env file in development folder');
        fs_extra_1.default.writeFileSync(this.development_env_path, '');
    };
    ENV.prototype.create_prod = function () {
        debug("Couldn't find production folder in env folder");
        fs_extra_1.default.mkdirSync(this.production_folder_path);
        debug('Creating .env file in production folder');
        fs_extra_1.default.writeFileSync(this.production_env_path, '');
    };
    ENV.prototype.create_both = function () {
        debug('Create both folder function called');
        debug('Creating production folder in env folder');
        fs_extra_1.default.mkdirSync(this.production_folder_path);
        debug('Creating .env file in production folder');
        fs_extra_1.default.writeFileSync(this.production_env_path, '');
        debug('Creating development folder in env folder');
        fs_extra_1.default.mkdirSync(this.development_folder_path);
        debug('Creating .env file in development folder');
        fs_extra_1.default.writeFileSync(this.development_env_path, '');
    };
    ENV.prototype.load = function (server) {
        if (server === true) {
            debug('Detected Remote Server IPV4 address');
            debug('Current system might be remote server');
            debug('Loading .env file in production folder');
            dotenv_1.default.config({ path: this.production_env_path });
        }
        else {
            debug("\nCouldn't detect remote server IP Address on this system");
            debug('Current system might be a local system  for testing and development');
            debug('Loading .env file in development folder');
            dotenv_1.default.config({ path: this.development_env_path });
        }
    };
    ENV.prototype.write = function (server, ipv4_address) {
        if (server === true) {
            fs_extra_1.default.writeFileSync(this.production_env_path, this.env_object + ("ADDRESS=" + ipv4_address));
        }
        else {
            fs_extra_1.default.writeFileSync(this.development_env_path, this.env_object + ("ADDRESS=" + ipv4_address));
        }
    };
    return ENV;
}());
exports.ENV = ENV;
