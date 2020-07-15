"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redirectToLoginPage = exports.redirectToAdminProfilePage = void 0;
const debug = require('debug')('middleware:redirect');
function redirectToAdminProfilePage(request, response, next) {
    if (request.url.match('/admin')) {
        if (request.url.match(/\/login|/) && request.method === 'GET') {
            if (request.signedCookies['ad_id_e'] !== undefined || request.signedCookies['ad_org_id_e'] !== undefined || request.signedCookies['ad_dept_id_e'] !== undefined) {
                debug('Found cookies in request and user is accessing admin login.');
                debug('Redirecting to Admin Profile page');
                return response.redirect('/admin/profile');
            }
        }
    }
    next();
}
exports.redirectToAdminProfilePage = redirectToAdminProfilePage;
function redirectToLoginPage(request, response, next) {
    /* console.table({XHR:request.xhr,accepts:request.accepts(['html','json']),value:request.headers["x-requested-with"]}) */
    if (request.url.match('/admin') === null) {
        if (request.url !== '/') {
            if (request.url.match(/\/login|\/register|\/help|\/get_files/) === null && request.method === 'GET') {
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
