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
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadRouterFiles = exports.loadStaticFiles = void 0;
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var toml = require('@iarna/toml');
var routes_content = toml.parse(fs_extra_1.default.readFileSync('configuration/routes.toml')), static_files = routes_content['StaticFiles']['Files'], router_files = routes_content['RouterFiles']['Files'];
function loadStaticFiles(app) {
    var e_1, _a;
    try {
        for (var static_files_1 = __values(static_files), static_files_1_1 = static_files_1.next(); !static_files_1_1.done; static_files_1_1 = static_files_1.next()) {
            var i = static_files_1_1.value;
            app.use(i['app_path'], express_1.default.static(path_1.default.join(__dirname, '../../' + i['folder_name'])));
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (static_files_1_1 && !static_files_1_1.done && (_a = static_files_1.return)) _a.call(static_files_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return app;
}
exports.loadStaticFiles = loadStaticFiles;
function loadRouterFiles(app) {
    var e_2, _a;
    try {
        for (var router_files_1 = __values(router_files), router_files_1_1 = router_files_1.next(); !router_files_1_1.done; router_files_1_1 = router_files_1.next()) {
            var i = router_files_1_1.value;
            if (i['default_export'] === true || i['default_export'] === undefined) {
                app.use(i['app_path'], require("./../../routes/" + i['module_name']).default);
            }
            else {
                app.use(i['app_path'], require("./../../routes/" + i['module_name']));
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (router_files_1_1 && !router_files_1_1.done && (_a = router_files_1.return)) _a.call(router_files_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return app;
}
exports.loadRouterFiles = loadRouterFiles;
