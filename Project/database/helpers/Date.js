"use strict";
module.exports = function formatDate(date) {
    var temp = new Date(date);
    return temp.getUTCDate() + "/" + (temp.getUTCMonth() + 1) + "/" + temp.getUTCFullYear();
};
