"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_extra_1 = __importDefault(require("fs-extra"));
var IPFile = /** @class */ (function () {
    function IPFile() {
    }
    IPFile.prototype.create = function (server, path) {
        var ip_object = '';
        if (server === true) {
            for (var i in process.env) {
                if (i.includes('PORT')) {
                    ip_object = ip_object + ("var IP" + i.split('T')[1] + "='http://" + process.env.ADDRESS + ":" + process.env[i] + "'\n'");
                }
            }
        }
        else {
            for (var i in process.env) {
                if (i.includes('PORT')) {
                    ip_object = ip_object + ("var IP" + i.split('T')[1] + "='http://localhost:" + process.env[i] + "'\n");
                }
            }
        }
        fs_extra_1.default.writeFileSync("public/javascript/IP.js", ip_object);
    };
    return IPFile;
}());
exports.IPFile = IPFile;
