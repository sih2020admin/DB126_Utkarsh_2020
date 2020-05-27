"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var debug = require('debug')('middleware:session');
//Redirects away from corresponding login page if session cookie is set
module.exports = function (request, response, next) {
    var _a, _b, _c, _d, _e;
    if (request.url.match(/html/) !== null) {
        if (request.url.match(/\/1admin_login.html/)) {
            if (((_a = request.session) === null || _a === void 0 ? void 0 : _a.ad_id_e) !== undefined || ((_b = request.session) === null || _b === void 0 ? void 0 : _b.ad_dept_id_e) !== undefined || ((_c = request.session) === null || _c === void 0 ? void 0 : _c.ad_org_id_e) !== undefined) {
                debug('Found cookies in request and user is accessing admin login.');
                debug('Redirecting to CRUD admin page');
                response.redirect('/2CRUD_admin.html');
                return;
            }
        }
        else if (request.url.match(/\/v1_login.html/)) {
            if (((_d = request.session) === null || _d === void 0 ? void 0 : _d.vcd_id_e) !== undefined || ((_e = request.session) === null || _e === void 0 ? void 0 : _e.vd_id_e) !== undefined) {
                debug('Found cookies in request and user is accessing vendor login.');
                debug('Redirecting to See tender page');
                response.redirect('/v3_see_tender.html');
                return;
            }
        }
        else {
        }
    }
    next();
};
