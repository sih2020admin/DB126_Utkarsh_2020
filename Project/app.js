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
var admin_files = fs_extra_1.default.readdirSync('views/admin'), user_files = fs_extra_1.default.readdirSync('views/user');
/* /* import connection from './routes/db'*/
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var path_1 = __importDefault(require("path"));
var cookie = require('cookie-parser');
/* const session = require('express-session')
var MySQLStore = require('express-mysql-session')(session) */
var misc_1 = __importDefault(require("./routes/misc"));
var payment_server_1 = __importDefault(require("./routes/payment-server"));
var admin_profile_1 = __importDefault(require("./routes/admin-profile"));
var app = express_1.default();
var routes = ['login', 'tender_desc', 'crud_admin', 'list_tender', 'tender_approval', 'vendor_dashboard', 'apply_tender', 'sign'];
var register = require('./routes/register-server');
/* var login = require('./routes/login')
var tender_desc = require('./routes/tender_desc')
var crud_admin = require('./routes/crud_admin')
var list_tender = require('./routes/list_tender')
var tender_approval = require('./routes/tender_approval')
var vendor_dashboard = require('./routes/vendor_dashboard')
var apply_tender = require('./routes/apply_tender')
var sign = require('./routes/sign')
 */ var port = process.env.PORT;
app.engine('.hbs', express_handlebars_1.default({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.use(express_1.default.json());
app.use(cookie(process.env.COOKIE_SECRET));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cors_1.default({
    origin: '*',
    methods: ['GET', 'POST'],
}));
/* var sessionStore = new MySQLStore({}, connection)
app.use(session({
    //key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge:1000*60*60*2
    }
    
})); */
app.use(function (request, response, next) {
    if (request.url.split('.')[1] === 'html') {
        if (request.url.match(/homepage|register|error|login/) === null) {
            var url = request.url.replace('/', '');
            console.log(url);
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
    next();
});
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(express_1.default.static(path_1.default.join(__dirname, 'views/user')));
app.use(express_1.default.static(path_1.default.join(__dirname, 'views/admin')));
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, 'uploads')));
app.use('/payment', payment_server_1.default);
app.use('/admin', admin_profile_1.default);
app.use('/misc', misc_1.default);
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
/* app.use('/', tender_desc.default)
app.use('/', login.default)
app.use('/', crud_admin.default)
app.use('/', list_tender.default)
app.use('/', tender_approval.default)
app.use('/', vendor_dashboard.default)
app.use('/', apply_tender.default)
app.use('/', sign.default) */
app.use('/register', register.default);
app.get('*', function (request, response) {
    response.sendFile(__dirname + '/views/user/error.html');
});
app.listen(port, function () {
    console.log("Server started on port " + port);
});
module.exports = app;
