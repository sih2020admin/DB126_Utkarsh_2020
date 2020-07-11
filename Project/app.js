"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./loader/loader");
var helpers_1 = require("./miscellaneous/helpers/helpers");
var express_handlebars_1 = __importDefault(require("express-handlebars"));
var fs_1 = __importDefault(require("fs"));
var https_1 = __importDefault(require("https"));
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var db_1 = __importDefault(require("./routes/db"));
var load_routes_1 = require("./loader/loader_modules/load-routes");
var redirect_1 = require("./miscellaneous/middleware/user/redirect");
var tender_1 = require("./miscellaneous/middleware/user/tender");
var app = express_1.default();
var cookie = require('cookie-parser');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var helmet = require('helmet');
var morgan = require('morgan');
var uuidv4 = require('uuid').v4;
var port = process.env.PORT;
var httpsOptions = {
    key: fs_1.default.readFileSync('certificates/key.pem'),
    cert: fs_1.default.readFileSync('certificates/certificate.crt'),
}, sessionStore = new MySQLStore({}, db_1.default);
app.engine('.hbs', express_handlebars_1.default({ extname: '.hbs', helpers: helpers_1.helpers }));
app.set('view engine', '.hbs');
app.set('trust proxy', ['165.22.210.37', '127.0.0.1']);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cookie(process.env.COOKIE_SECRET));
app.use(helmet());
app.use(cors_1.default({
    origin: '*',
    methods: ['GET', 'POST'],
}));
app.use(session({
    genid: function (req) {
        return uuidv4();
    },
    secret: process.env.COOKIE_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 2,
    },
}));
app = load_routes_1.loadStaticFiles(app);
//app.use(morgan('dev'))
app.use(redirect_1.redirectToLoginPage, redirect_1.redirectToProfilePage);
app.use('/tender/payment', tender_1.validateURLParams, tender_1.validateURLParamsD);
app.use('/tender/confirmation', tender_1.validateURLParams, tender_1.validateURLParamsD, tender_1.confirmTender);
app.use('/tender/preview', tender_1.validateURLParams, tender_1.validateURLParamsD, tender_1.previewTender);
app = load_routes_1.loadRouterFiles(app);
app.get('*', function (request, response) {
    response.render('error', { layout: false });
});
/* console.log(require('express-list-endpoints')(app)) */
https_1.default.createServer(httpsOptions, app).listen(port, function () {
    console.log('Server listening On Port ' + port);
});
exports.default = app;
