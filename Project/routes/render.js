"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_1 = require("./../miscellaneous/database/database functions/user");
var admin_1 = require("./../miscellaneous/database/database functions/admin");
var router = express_1.default.Router();
router.get('/login', function (request, response) {
    response.render('admin/login', { layout: false });
});
router.get('/dashboard', function (request, response) {
    var admin = user_1.isAdmin(request);
    Promise.all([user_1.getAdminUsername(request)]).then(function (results) {
        response.render('admin/dashboard', { layout: false, admin: admin, username: results[0] });
    });
});
router.get('/profile', function (request, response) {
    var admin = user_1.isAdmin(request);
    Promise.all([user_1.getAdminUsername(request), admin_1.getAdminDetails(request), admin_1.getApprovedTenders(request)]).then(function (results) {
        response.render('admin/profile', { layout: false, admin: admin, username: results[0], admin1: results[1][0], tenders: results[2] });
    });
});
router.get('/tenders/list', function (request, response) {
    var admin = user_1.isAdmin(request);
    Promise.all([user_1.getAdminUsername(request)]).then(function (results) {
        response.render('admin/tenders-list', { layout: false, admin: admin, username: results[0] });
    });
});
router.get('/application/approve', function (request, response) {
    var admin = user_1.isAdmin(request);
    Promise.all([user_1.getAdminUsername(request)]).then(function (results) {
        response.render('admin/application-approve', { layout: false, admin: admin, username: results[0] });
    });
});
router.get('/help', function (request, response) {
    var admin = user_1.isAdmin(request);
    Promise.all([user_1.getAdminUsername(request)]).then(function (results) {
        response.render('admin/help', { layout: false, admin: admin, username: results[0] });
    });
});
exports.default = router;
