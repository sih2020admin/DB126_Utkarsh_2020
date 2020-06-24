"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var debug = require('debug')('middleware:cookie');
//Redirects away from corresponding login page if cookies are set
module.exports = function (request, response, next) {
    if (request.url.match(/html/) !== null) {
        if (request.url.match(/\/1admin_login.html/)) {
            if (request.signedCookies.ad_id_e !== undefined || request.signedCookies.ad_dept_id_e !== undefined || request.signedCookies.ad_org_id_e !== undefined) {
                debug('Found cookies in request and user is accessing admin login.');
                debug('Redirecting to CRUD admin page');
                response.redirect('/2CRUD_admin.html');
                return;
            }
        }
        else if (request.url.match(/\/v1_login.html/)) {
            if (request.signedCookies.vcd_id_e !== undefined || request.signedCookies.vd_id_e !== undefined) {
                debug('Found cookies in request and user is accessing vendor login.');
                debug('Redirecting to See tender page');
                response.redirect('/profile.html');
                return;
            }
        }
        else {
        }
    }
    next();
};
