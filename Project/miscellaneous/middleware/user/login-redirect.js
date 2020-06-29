"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redirectToProfilePage = void 0;
var debug = require('debug')('middleware:login-redirect');
function redirectToProfilePage(request, response, next) {
    if (request.url.match(/\/login|\/register/)) {
        if (request.signedCookies.vcd_id_e !== undefined || request.signedCookies.vd_id_e !== undefined) {
            debug('Found cookies in request and user is accessing vendor login.');
            debug('Redirecting to Profile page');
            response.redirect('/profile');
            return;
        }
    }
    next();
}
exports.redirectToProfilePage = redirectToProfilePage;
