"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redirectToLoginPage = exports.redirectToProfilePage = void 0;
const toml_1 = __importDefault(require("@iarna/toml"));
const fs_1 = __importDefault(require("fs"));
const debug = require('debug')('middleware:redirect');
// @ts-ignore
var exception = new RegExp('\/' + toml_1.default.parse(fs_1.default.readFileSync('configuration/middleware.toml').toString())['Exceptions']['User']['routes'].join('|\/'));
function redirectToProfilePage(request, response, next) {
    if (request.url.match('/admin') === null) {
        if (request.url.match(/\/login|\/register/)) {
            if (request.signedCookies['vcd_id_e'] !== undefined || request.signedCookies['vd_id_e'] !== undefined) {
                debug('Found cookies in request and user is accessing vendor login.');
                debug('Redirecting to Profile page');
                return response.redirect('/profile');
            }
        }
    }
    next();
}
exports.redirectToProfilePage = redirectToProfilePage;
function redirectToLoginPage(request, response, next) {
    /* console.table({XHR:request.xhr,accepts:request.accepts(['html','json']),value:request.headers["x-requested-with"]}) */
    if (request.url.match('/admin') === null) {
        if (request.url !== '/') {
            if (request.url.match(exception) === null && request.method === 'GET') {
                if (request.signedCookies['vcd_id_e'] === undefined || request.signedCookies['vd_id_e'] === undefined) {
                    debug('Cookies have been deleted or modified');
                    debug('Redirecting to Login page');
                    return response.redirect('/login');
                }
            }
        }
    }
    next();
}
exports.redirectToLoginPage = redirectToLoginPage;
