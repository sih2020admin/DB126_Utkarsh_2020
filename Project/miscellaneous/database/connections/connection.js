"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_credentials_1 = require("./database_credentials");
const promise_1 = __importDefault(require("mysql2/promise"));
var connection;
connection = promise_1.default.createPool(database_credentials_1.tender_credentials);
exports.default = connection;
