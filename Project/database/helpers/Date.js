"use strict";
module.exports.date = function formatDate(date) {
    var temp = new Date(date);
    return temp.getDate() + "/" + (temp.getMonth() + 1) + "/" + temp.getFullYear();
};
module.exports.time = function formatTime(time) {
    var temp = new Date(time);
    return temp.getHours() + ":" + temp.getMinutes() + ":" + temp.getSeconds();
};
