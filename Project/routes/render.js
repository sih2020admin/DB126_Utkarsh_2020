"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("./../miscellaneous/database/database functions/user");
const admin_1 = require("./../miscellaneous/database/database functions/admin");
const stats_1 = require("./../miscellaneous/database/database functions/stats");
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
    Promise.all([user_1.getAdminUsername(request), admin_1.getAdminDetails(request), admin_1.getApprovedTenders(request), stats_1.getCountOfApplicationsPerTender(request), stats_1.getApplicationsWhichPassedFirstStage(request), stats_1.getAmountDifference()]).then((results) => {
        //console.log(results[3])
        response.render('admin/profile', { layout: false, admin, username: results[0], admin1: results[1][0], tenders: results[2], stats1: results[3] });
    });
});
router.get('/tenders/list', (request, response) => {
    let admin = user_1.isAdmin(request);
    Promise.all([user_1.getAdminUsername(request)]).then((results) => {
        response.render('admin/tenders-list', { layout: false, admin, username: results[0] });
    });
});
router.get('/application/approve/technical', (request, response) => {
    let admin = user_1.isAdmin(request);
    Promise.all([user_1.getAdminUsername(request)]).then((results) => {
        response.render('admin/approve-technical', { layout: false, admin, username: results[0] });
    });
});
router.get('/application/approve/boq', (request, response) => {
    let admin = user_1.isAdmin(request);
    Promise.all([user_1.getAdminUsername(request)]).then((results) => {
        response.render('admin/approve-boq', { layout: false, admin, username: results[0] });
    });
});
router.get('/application/approve/result', (request, response) => {
    let admin = user_1.isAdmin(request);
    Promise.all([user_1.getAdminUsername(request)]).then((results) => {
        response.render('admin/approve-result', { layout: false, admin, username: results[0] });
   });
});
router.get('/help', (request, response) => {
    let admin = user_1.isAdmin(request);
    Promise.all([user_1.getAdminUsername(request)]).then((results) => {
        response.render('admin/help', { layout: false, admin, username: results[0] });
    });
});
exports.default = router;
