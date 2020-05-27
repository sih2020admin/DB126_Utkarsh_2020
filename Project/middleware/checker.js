"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_extra_1 = __importDefault(require("fs-extra"));
var debug = require('debug')('middleware:cookie');
var admin_files = fs_extra_1.default.readdirSync('views/admin'), user_files = fs_extra_1.default.readdirSync('views/user'), invalid_extensions = new RegExp(['.js', '.css', '.svg'].join('|'));
//Redirects to corresponding login page if cookies are tampered or deleted due to some event
module.exports = function (request, response, next) {
    if (request.url.match(/html/) !== null) {
        if (request.url.match(/homepage|register|error|login/) === null) {
            var url = request.url.replace('/', '');
            debug("Checking for cookies in " + request.url);
            if (admin_files.indexOf(url) !== -1) {
                if (request.signedCookies.ad_id_e === undefined || request.signedCookies.ad_dept_id_e === undefined || request.signedCookies.ad_org_id_e === undefined) {
                    debug('Could not find cookies in request.');
                    debug('Redirecting to Admin Login page');
                    response.redirect('/1admin_login.html');
                    return;
                }
            }
            else if (user_files.indexOf(url) !== -1) {
                if (request.signedCookies.vcd_id_e === undefined || request.signedCookies.vd_id_e === undefined) {
                    debug('Could not find cookies in request.');
                    debug('Redirecting to Vendor Login page');
                    response.redirect('/v1_login.html');
                    return;
                }
            }
            else {
            }
        }
    }
    next();
};
