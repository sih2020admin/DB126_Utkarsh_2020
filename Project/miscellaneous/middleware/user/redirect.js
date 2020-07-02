"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redirectToLoginPage = exports.redirectToProfilePage = void 0;
var debug = require('debug')('middleware:redirect');
function redirectToProfilePage(request, response, next) {
    if (request.url.match(/\/login|\/register/)) {
        if (request.signedCookies['vcd_id_e'] !== undefined || request.signedCookies['vd_id_e'] !== undefined) {
            debug('Found cookies in request and user is accessing vendor login.');
            debug('Redirecting to Profile page');
            return response.redirect('/profile');
        }
    }
    next();
}
exports.redirectToProfilePage = redirectToProfilePage;
function redirectToLoginPage(request, response, next) {
    /* console.table({XHR:request.xhr,accepts:request.accepts(['html','json']),value:request.headers["x-requested-with"]}) */
    if (request.url !== '/') {
        if (request.url.match(/\/login|\/register|\/help/) === null && request.method === 'GET') {
            if (request.signedCookies['vcd_id_e'] === undefined || request.signedCookies['vd_id_e'] === undefined) {
                debug('Cookies have been deleted or modified');
                debug('Redirecting to Login page');
                return response.redirect('/login');
            }
        }
    }
    next();
}
exports.redirectToLoginPage = redirectToLoginPage;