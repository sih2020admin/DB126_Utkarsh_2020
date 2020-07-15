"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./loader/loader");
const helpers_1 = require("./miscellaneous/helpers/helpers");
const express_handlebars_1 = __importDefault(require("express-handlebars"));
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./routes/db"));
const load_routes_1 = require("./loader/loader_modules/load-routes");
const redirect_1 = require("./miscellaneous/middleware/user/redirect");
const tender_1 = require("./miscellaneous/middleware/user/tender");
var app = express_1.default();
const cookie = require('cookie-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const helmet = require('helmet');
const morgan = require('morgan');
const { v4: uuidv4 } = require('uuid');
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
app.use('/tender/apply', tender_1.validateURLParamsApply, tender_1.validateURLParamsDApply, tender_1.applyTender);
app.use('/tender/payment', tender_1.validateURLParams, tender_1.validateURLParamsD);
/* app.use('/tender/confirmation', validateURLParams, validateURLParamsD, confirmTender)
app.use('/tender/preview', validateURLParams, validateURLParamsD, previewTender) */
app = load_routes_1.loadRouterFiles(app);
app.get('*', (request, response) => {
    response.render('error', { layout: false });
});
/* console.log(require('express-list-endpoints')(app)) */
https_1.default.createServer(httpsOptions, app).listen(port, function () {
    console.log('Server listening On Port ' + port);
});
exports.default = app;
