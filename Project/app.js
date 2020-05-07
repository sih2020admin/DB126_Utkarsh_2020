"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./loader");
var express_handlebars_1 = __importDefault(require("express-handlebars"));
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var path_1 = __importDefault(require("path"));
var misc_1 = __importDefault(require("./routes/misc"));
var payment_server_1 = __importDefault(require("./routes/payment-server"));
var app = express_1.default();
var login = require('./routes/login');
var register = require('./routes/register-server');
var tender_desc = require('./routes/tender_desc');
var crud_admin = require('./routes/crud_admin');
var list_tender = require('./routes/list_tender');
var tender_approval = require('./routes/tender_approval');
var vendor_dashboard = require('./routes/vendor_dashboard');
var apply_tender = require('./routes/apply_tender');
var sign = require('./routes/sign');
var port = process.env.PORT;
app.engine('.hbs', express_handlebars_1.default({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.use(cors_1.default({
    origin: '*',
    methods: ['GET', 'POST'],
}));
app.use(cook())
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(function (request, response, next) {
    console.log(request.ip);
    next();
});
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(express_1.default.static(path_1.default.join(__dirname, 'views/user')));
app.use(express_1.default.static(path_1.default.join(__dirname, 'views/admin')));
app.use('/register', register.default);
app.use('/payment', payment_server_1.default);
app.use('/', tender_desc.default);
app.use('', login.default);
app.use('/', crud_admin.default);
app.use('/', list_tender.default);
app.use('/', tender_approval.default);
app.use('/', vendor_dashboard.default);
app.use('/', apply_tender.default);
app.use('/', sign.default);
app.use('/misc', misc_1.default);
app.get('*', function (request, response) {
    response.sendFile(__dirname + '/views/user/error.html');
});
app.listen(port, function () {
    console.log("Server started on port " + port);
});
module.exports = app;
