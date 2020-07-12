"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadRouterFiles = exports.loadStaticFiles = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const toml = require('@iarna/toml');
var routes_content = toml.parse(fs_extra_1.default.readFileSync('configuration/routes.toml')), static_files = routes_content['StaticFiles']['Files'], router_files = routes_content['RouterFiles']['Files'];
function loadStaticFiles(app) {
    for (let i of static_files) {
        app.use(i['app_path'], express_1.default.static(path_1.default.join(__dirname, '../../' + i['folder_name'])));
    }
    return app;
}
exports.loadStaticFiles = loadStaticFiles;
function loadRouterFiles(app) {
    for (let i of router_files) {
        if (i['default_export'] === true || i['default_export'] === undefined) {
            app.use(i['app_path'], require(`./../../routes/${i['module_name']}`).default);
        }
        else {
            app.use(i['app_path'], require(`./../../routes/${i['module_name']}`));
        }
    }
    return app;
}
exports.loadRouterFiles = loadRouterFiles;
