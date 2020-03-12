"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'winston',
    password: '',
    database: 'testing'
});
module.exports = connection;
