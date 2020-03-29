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
var os_1 = __importDefault(require("os"));
var mysql_1 = __importDefault(require("mysql"));
var fs_1 = __importDefault(require("fs"));
var connection;
if (os_1.default.platform() === "linux" && os_1.default.hostname() === "ubuntu" && os_1.default.userInfo().username === "winston") {
    var database, user, password;
    var array = fs_1.default.readFileSync('/etc/mysql/my.cnf').toString().split("\n");
    try {
        for (var array_1 = __values(array), array_1_1 = array_1.next(); !array_1_1.done; array_1_1 = array_1.next()) {
            var x = array_1_1.value;
            if (x.match("database")) {
                if (x.split("=")[1] != undefined) {
                    database = x.split("=")[1].trim();
                }
            }
            if (x.match("user")) {
                if (x.split("=")[1] != undefined) {
                    user = x.split("=")[1].trim();
                }
            }
            if (x.match("password")) {
                if (x.split("=")[1] != undefined) {
                    password = x.split("=")[1].trim();
                }
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (array_1_1 && !array_1_1.done && (_a = array_1.return)) _a.call(array_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    connection = mysql_1.default.createConnection({
        host: 'localhost',
        user: user,
        password: password,
        database: database,
        multipleStatements: true
    });
}
else {
    connection = mysql_1.default.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'e_tender',
        multipleStatements: true
    });
}
exports.default = connection;
