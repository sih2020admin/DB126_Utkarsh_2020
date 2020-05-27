"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./loader");
var express_handlebars_1 = __importDefault(require("express-handlebars"));
/* import fs from 'fs-extra'
var admin_files = fs.readdirSync('views/admin'),
user_files = fs.readdirSync('views/user')
console.log(admin_files,user_files) */
/* import connection from './routes/db' */
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var path_1 = __importDefault(require("path"));
var cookie = require('cookie-parser');
/* const session = require('express-session')
var MySQLStore = require('express-mysql-session')(session) */
var misc_1 = __importDefault(require("./routes/misc"));
var payment_server_1 = __importDefault(require("./routes/payment-server"));
var admin_profile_1 = __importDefault(require("./routes/admin-profile"));


var https = require("https");
var fs = require("fs");
var httpsOptions = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('certificate.crt')
};

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
app.use(express_1.default.json());
app.use(cookie(process.env.COOKIE_SECRET));
app.use(express_1.default.urlencoded({ extended: true }));

app.use(cors_1.default({
    origin: '*',
    methods: ['GET', 'POST'],
}));

// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: false }));
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
/* app.use((request:Request, response, next) => {
    if (request.url.split(".")[1] !=='js'&& request.url.split(".")[1]!=='css'){
        var url = request.url.replace('/','')
        if(admin_files.indexOf(url)!== - 1){
            console.log('admin file')
        }
        if(user_files.indexOf(url)!== - 1){
            console.log('user file')
        }
        
    }
    next()
}) */
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(express_1.default.static(path_1.default.join(__dirname, 'views/user')));
app.use(express_1.default.static(path_1.default.join(__dirname, 'views/admin')));
app.use('/signed', express_1.default.static(path_1.default.join(__dirname, 'routes/uploaded_documents')));
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, 'uploads')));
app.use('/register', register.default);
app.use('/payment', payment_server_1.default);
app.use('/admin', admin_profile_1.default);
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
 /*app.listen(port, function () {
     console.log("Server started on port " + port);
 });*/

https.createServer(httpsOptions,app).listen(port,function(){
	console.log("Server listening On Port "+ port);
});

module.exports = app;
