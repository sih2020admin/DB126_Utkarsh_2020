"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("./../miscellaneous/database/database functions/user");
const admin_1 = require("./../miscellaneous/database/database functions/admin");
const router = express_1.default.Router();
router.get('/login', (request, response) => {
    response.render('admin/login', { layout: false });
});
router.get('/dashboard', (request, response) => {
    let admin = user_1.isAdmin(request);
    Promise.all([user_1.getAdminUsername(request)]).then((results) => {
        response.render('admin/dashboard', { layout: false, admin, username: results[0] });
    });
});
router.get('/profile', (request, response) => {
    let admin = user_1.isAdmin(request);
    Promise.all([user_1.getAdminUsername(request), admin_1.getAdminDetails(request), admin_1.getApprovedTenders(request)]).then((results) => {
        response.render('admin/profile', { layout: false, admin, username: results[0], admin1: results[1][0], tenders: results[2] });
    });
});
router.get('/tenders/list', (request, response) => {
    let admin = user_1.isAdmin(request);
    Promise.all([user_1.getAdminUsername(request)]).then((results) => {
        response.render('admin/tenders-list', { layout: false, admin, username: results[0] });
    });
});
router.get('/application/approve', (request, response) => {
    let admin = user_1.isAdmin(request);
    Promise.all([user_1.getAdminUsername(request)]).then((results) => {
        response.render('admin/application-approve', { layout: false, admin, username: results[0] });
    });
});
router.get('/help', (request, response) => {
    let admin = user_1.isAdmin(request);
    Promise.all([user_1.getAdminUsername(request)]).then((results) => {
        response.render('admin/help', { layout: false, admin, username: results[0] });
    });
});
exports.default = router;
