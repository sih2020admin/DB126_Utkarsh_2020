"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redirectToAdminLoginPage = exports.redirectToAdminProfilePage = exports.checkVendorCookies = void 0;
const debug = require('debug')('middleware:redirect');
function checkVendorCookies(request, response, next) {
    if (request.url.match('/admin') && request.url.match('/super-admin') === null && request.method === 'GET') {
        if (request.signedCookies['vcd_id_e'] !== null || request.signedCookies['vd_id_e'] || request.signedCookies['digi_access_e']) {
            response.clearCookie('vcd_id');
            response.clearCookie('vd_id');
            response.clearCookie('digi_access');
            response.clearCookie('vcd_id_e');
            response.clearCookie('vd_id_e');
            response.clearCookie('digi_access_e');
            //@ts-ignore
            request.session.destroy(function (err) {
                response.clearCookie('connect.sid');
            });
        }
    }
    next();
}
exports.checkVendorCookies = checkVendorCookies;
function redirectToAdminProfilePage(request, response, next) {
    if (request.url.match('/admin') && request.url.match('/super-admin') === null && request.method === 'GET') {
        if (request.url.match(/\/login/)) {
            if (request.signedCookies['ad_id_e'] !== undefined || request.signedCookies['ad_dept_id_e'] !== undefined || request.signedCookies['ad_org_id_e'] !== undefined) {
                debug('Found cookies in request and user is accessing Admin login.');
                debug('Redirecting to Admin Profile page');
                return response.redirect('/admin/profile');
            }
        }
    }
    next();
}
exports.redirectToAdminProfilePage = redirectToAdminProfilePage;
function redirectToAdminLoginPage(request, response, next) {
    if (request.url.match('/admin') && request.method === 'GET') {
        if (request.url.match(/\/login|\/help/) === null) {
            if (request.signedCookies['ad_id_e'] === undefined || request.signedCookies['ad_dept_id_e'] === undefined || request.signedCookies['ad_org_id_e'] == undefined) {
                debug('Found No cookies in request and user is accessing Admin Pages.');
                debug('Redirecting to Admin Login page');
                return response.redirect('/admin/login');
            }
        }
    }
    next();
}
exports.redirectToAdminLoginPage = redirectToAdminLoginPage;
