"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatTime = exports.formatDate = void 0;
function formatDate(date) {
    let temp = new Date(date);
    return `${temp.getDate()}/${temp.getMonth() + 1}/${temp.getFullYear()}`;
}
exports.formatDate = formatDate;
function formatTime(time) {
    let temp = new Date(time);
    return `${temp.getHours()}:${temp.getMinutes()}:${temp.getSeconds()}`;
}
exports.formatTime = formatTime;
