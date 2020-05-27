'use strict'
var __values =
    (this && this.__values) ||
    function (o) {
        var s = typeof Symbol === 'function' && Symbol.iterator,
            m = s && o[s],
            i = 0
        if (m) return m.call(o)
        if (o && typeof o.length === 'number')
            return {
                next: function () {
                    if (o && i >= o.length) o = void 0
                    return { value: o && o[i++], done: !o }
                },
            }
        throw new TypeError(s ? 'Object is not iterable.' : 'Symbol.iterator is not defined.')
    }
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
var e_1, _a, e_2, _b
Object.defineProperty(exports, '__esModule', { value: true })
require('./loader')
var express_handlebars_1 = __importDefault(require('express-handlebars'))
var fs_extra_1 = __importDefault(require('fs-extra'))
var https_1 = __importDefault(require('https'))
var express_1 = __importDefault(require('express'))
var cors_1 = __importDefault(require('cors'))
var path_1 = __importDefault(require('path'))
var db_1 = __importDefault(require('./routes/db'))
var app = express_1.default()
var cookie = require('cookie-parser')
var session = require('express-session')
var MySQLStore = require('express-mysql-session')(session)
var morgan = require('morgan')
var uuidv4 = require('uuid').v4
var routes_content = fs_extra_1.default.readJSONSync('routes.json'),
    static_files = routes_content['public'],
    router_files = routes_content['routes'],
    port = process.env.PORT,
    httpsOptions = {
        key: fs_extra_1.default.readFileSync('certificates/key.pem'),
        cert: fs_extra_1.default.readFileSync('certificates/certificate.crt'),
    },
    sessionStore = new MySQLStore({}, db_1.default)
app.engine('.hbs', express_handlebars_1.default({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('trust proxy', ['165.22.210.37', '127.0.0.1'])
app.use(express_1.default.json())
app.use(express_1.default.urlencoded({ extended: true }))
app.use(cookie(process.env.COOKIE_SECRET))
app.use(
    cors_1.default({
        origin: '*',
        methods: ['GET', 'POST'],
    })
)
app.use(
    session({
        genid: function (req) {
            return uuidv4() 
        },
        secret: process.env.COOKIE_SECRET,
        store: sessionStore,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 2,
        },
    })
)
app.use(require('./middleware/checker'))
app.use(require('./middleware/checker1'))

/* app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(express_1.default.static(path_1.default.join(__dirname, 'views/user')));
app.use(express_1.default.static(path_1.default.join(__dirname, 'views/admin')));
app.use('/signed', express_1.default.static(path_1.default.join(__dirname, 'routes/uploaded_documents')));
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, 'uploads')));
app.use('/payment', payment_server_1.default);
app.use('/admin', admin_profile_1.default);
app.use('/misc', misc_1.default);
app.use('/register', register.default); */
try {
    for (var static_files_1 = __values(static_files), static_files_1_1 = static_files_1.next(); !static_files_1_1.done; static_files_1_1 = static_files_1.next()) {
        var i = static_files_1_1.value
        if (i['folder_name'] === 'public') {
            app.use(i['app_path'], express_1.default.static(path_1.default.join(__dirname, i['folder_name'])))
        }
        app.use(i['app_path'], express_1.default.static(path_1.default.join(__dirname, i['folder_name'])))
    }
} catch (e_1_1) {
    e_1 = { error: e_1_1 }
} finally {
    try {
        if (static_files_1_1 && !static_files_1_1.done && (_a = static_files_1.return)) _a.call(static_files_1)
    } finally {
        if (e_1) throw e_1.error
    }
}
app.use(morgan('dev'))
try {
    for (var router_files_1 = __values(router_files), router_files_1_1 = router_files_1.next(); !router_files_1_1.done; router_files_1_1 = router_files_1.next()) {
        var i = router_files_1_1.value
        if (i['default_export'] === true || i['default_export'] === undefined) {
            app.use(i['app_path'], require('./routes/' + i['module_name']).default)
        } else {
            app.use(i['app_path'], require('./routes/' + i['module_name']))
        }
    }
} catch (e_2_1) {
    e_2 = { error: e_2_1 }
} finally {
    try {
        if (router_files_1_1 && !router_files_1_1.done && (_b = router_files_1.return)) _b.call(router_files_1)
    } finally {
        if (e_2) throw e_2.error
    }
}
app.get('*', function (request, response) {
    response.sendFile(__dirname + '/views/user/error.html')
})
https_1.default.createServer(httpsOptions, app).listen(port, function () {
    console.log('Server listening On Port ' + port)
})
