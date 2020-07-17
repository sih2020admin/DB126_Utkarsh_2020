"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getYears = exports.getLegalStatus = exports.getStates = void 0;
const connection_1 = __importDefault(require("./../connections/connection"));
async function getStates() {
    let states = await connection_1.default.execute('select st_name from states');
    return states[0];
}
exports.getStates = getStates;
async function getLegalStatus() {
    let legal_status = await connection_1.default.execute('select l_name from legal_status_details');
    return legal_status[0];
}
exports.getLegalStatus = getLegalStatus;
async function getYears() {
    let years = [];
    const end_year = 1700;
    const current_year = new Date().getFullYear();
    for (var i = current_year; i >= end_year; i--) {
        years.push(i);
    }
    return years;
}
exports.getYears = getYears;
