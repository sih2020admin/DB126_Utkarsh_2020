"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aadhar_credentials = exports.tender_credentials = void 0;
exports.tender_credentials = {
    host: 'localhost',
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: 'e_tender',
    multipleStatements: true,
};
exports.aadhar_credentials = {
    host: 'localhost',
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: 'aadharDB',
};
