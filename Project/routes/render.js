"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
router.get('/login', function (request, response) {
    response.render('admin/login', { layout: false });
});
router.get('/dashboard', function (request, response) {
    response.render('admin/dashboard', { layout: false });
});
router.get('/tenders/list', function (request, response) {
    response.render('admin/tenders-list', { layout: false });
});
router.get('/application/approve', function (request, response) {
    response.render('admin/application-approve', { layout: false });
});
router.get('/help', function (request, response) {
    response.render('admin/help', { layout: false });
});
exports.default = router;
