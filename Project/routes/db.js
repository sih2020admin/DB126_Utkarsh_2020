"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("mysql"));
var connection;
connection = mysql_1.default.createPool({
    host: 'localhost',
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: 'e_tender',
    multipleStatements: true,
});
exports.default = connection;
