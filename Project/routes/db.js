"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("mysql"));
var connection = mysql_1.default.createConnection({
    host: 'localhost',
    user: 'viraj',
    password: 'qwerty',
    database: 'e_tender',
    multipleStatements: true
});
exports.default = connection;
	