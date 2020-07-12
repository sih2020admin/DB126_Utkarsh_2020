"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminUsername = exports.isAdmin = exports.getUserUsername = exports.isUser = void 0;
const connection_1 = __importDefault(require("./../connections/connection"));
function isUser(request) {
    if (request.signedCookies['vcd_id_e']) {
        return true;
    }
    else {
        return false;
    }
}
exports.isUser = isUser;
async function getUserUsername(request) {
    if (request.signedCookies['vcd_id_e'] !== undefined) {
        let username = await connection_1.default.execute(`Select user_name from log_in_details where vcd_id='${request.signedCookies.vcd_id_e}'`);
        return JSON.parse(JSON.stringify(username[0]))[0]['user_name'];
    }
    else {
        return '';
    }
}
exports.getUserUsername = getUserUsername;
function isAdmin(request) {
    if (request.signedCookies['ad_id_e'] !== undefined) {
        return true;
    }
    else {
        return false;
    }
}
exports.isAdmin = isAdmin;
async function getAdminUsername(request) {
    if (request.signedCookies['ad_id_e'] !== undefined) {
        let username = await connection_1.default.execute(`Select user_name from log_in_details where ad_id='${request.signedCookies['ad_id_e']}'`);
        return JSON.parse(JSON.stringify(username[0]))[0]['user_name'];
    }
    else {
        return '';
    }
}
exports.getAdminUsername = getAdminUsername;
