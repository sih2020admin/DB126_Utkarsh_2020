"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var path_1 = __importDefault(require("path"));
var misc_1 = __importDefault(require("./routes/misc"));
var app = express_1.default();
var login = require("./routes/login");
var register = require("./routes/register-server");
var tender_desc = require("./routes/tender_desc");	
var crud_admin = require("./routes/crud_admin");

//var port = process.env.PORT || 8080
var port = 8081;
app.use(cors_1.default());
app.use(express_1.default.json());
//app.use(express.urlencoded({extended:false}))
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(express_1.default.static(path_1.default.join(__dirname, 'views')));
app.use('/login', login.default);
app.use('/register', register.default);
app.use("/misc", misc_1.default);
app.use('/', tender_desc.default);
app.use('/',crud_admin.default);
app.listen(port, function () {
    console.log("Server started on port " + port);
});
