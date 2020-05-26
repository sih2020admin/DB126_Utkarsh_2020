"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var e_1, _a;
Object.defineProperty(exports, "__esModule", { value: true });
require("./loader");
var express_handlebars_1 = __importDefault(require("express-handlebars"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var https_1 = __importDefault(require("https"));
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var path_1 = __importDefault(require("path"));
var morgan = require('morgan');
var cookie = require('cookie-parser');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var app = express_1.default();
var debug = require('debug')('service:app');
var db_1 = __importDefault(require("./routes/db"));
var misc_1 = __importDefault(require("./routes/misc"));
var payment_server_1 = __importDefault(require("./routes/payment-server"));
var admin_profile_1 = __importDefault(require("./routes/admin-profile"));
var routes = ['login', 'tender_desc', 'crud_admin', 'list_tender', 'tender_approval', 'vendor_dashboard', 'apply_tender', 'sign'];
var register = require('./routes/register-server');
var admin_files = fs_extra_1.default.readdirSync('views/admin'), user_files = fs_extra_1.default.readdirSync('views/user');
var port = process.env.PORT;
var httpsOptions = {
    key: fs_extra_1.default.readFileSync('certificates/key.pem'),
    cert: fs_extra_1.default.readFileSync('certificates/certificate.crt'),
};
var invalid_extensions = new RegExp(['.js', '.css', '.svg'].join('|'));
app.engine('.hbs', express_handlebars_1.default({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.use(morgan('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cookie(process.env.COOKIE_SECRET));
app.use(cors_1.default({
    origin: '*',
    methods: ['GET', 'POST'],
}));
var sessionStore = new MySQLStore({}, db_1.default);
app.use(session({
    //key: 'session_cookie_name',
    secret: process.env.COOKIE_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 2,
    },
}));
app.use(function (request, response, next) {
    if (request.url.match(/.html/) !== null) {
        if (request.url.match(/homepage|register|error|login/) === null) {
            var url = request.url.replace('/', '');
            debug('Checking for cookies in CRUD admin ');
            if (admin_files.indexOf(url) !== -1) {
                if (request.signedCookies.ad_id_e === undefined || request.signedCookies.ad_id_e === undefined || request.signedCookies.ad_id_e === undefined) {
                    response.redirect('/1admin_login.html');
                    return;
                }
            }
            else if (user_files.indexOf(url) !== -1) {
                if (request.signedCookies.vcd_id_e === undefined || request.signedCookies.vd_id_e === undefined) {
                    response.redirect('/v1_login.html');
                    return;
                }
            }
            else {
            }
        }
    }
    else {
        if (request.url.match(invalid_extensions) === null) {
            debug(request.url, ' : one of xhr requests');
        }
    }
    next();
});
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(express_1.default.static(path_1.default.join(__dirname, 'views/user')));
app.use(express_1.default.static(path_1.default.join(__dirname, 'views/admin')));
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, 'uploads')));
app.use('/payment', payment_server_1.default);
app.use('/admin', admin_profile_1.default);
app.use('/misc', misc_1.default);
app.use('/register', register.default);
try {
    for (var routes_1 = __values(routes), routes_1_1 = routes_1.next(); !routes_1_1.done; routes_1_1 = routes_1.next()) {
        var i = routes_1_1.value;
        app.use('/', require("./routes/" + i).default);
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (routes_1_1 && !routes_1_1.done && (_a = routes_1.return)) _a.call(routes_1);
    }
    finally { if (e_1) throw e_1.error; }
}
app.get('*', function (request, response) {
    response.sendFile(__dirname + '/views/user/error.html');
});
https_1.default.createServer(httpsOptions, app).listen(port, function () {
    debug('Server listening On Port ' + port);
});
