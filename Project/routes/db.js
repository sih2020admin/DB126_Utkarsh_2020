"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("mysql"));
var connection;
/* if (os.platform() === 'linux' && os.hostname() === 'ubuntu' && os.userInfo().username === 'winston') {
    var database, user, password
    var array = fs.readFileSync('/etc/mysql/my.cnf').toString().split('\n')
    for (var x of array) {
        if (x.match('database')) {
            if (x.split('=')[1] != undefined) {
                database = x.split('=')[1].trim()
            }
        }
        if (x.match('user')) {
            if (x.split('=')[1] != undefined) {
                user = x.split('=')[1].trim()
            }
        }
        if (x.match('password')) {
            if (x.split('=')[1] != undefined) {
                password = x.split('=')[1].trim()
            }
        }
    }

    connection = mysql.createConnection({
        host: 'localhost',
        user,
        password,
        database,
        multipleStatements: true,
    })
} else {
    
}
 */
connection = mysql_1.default.createConnection({
    host: 'localhost',
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: 'e_tender',
    multipleStatements: true,
});
exports.default = connection;
