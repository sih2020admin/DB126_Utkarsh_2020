"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'winston',
    password: 'Winston@99',
    database: 'testing'
});
module.exports = connection;
