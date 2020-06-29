"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionStatus = void 0;
function transactionStatus(status) {
    if (status === 'TXN_SUCCESS') {
        return 'Success';
    }
    else {
        return 'Fail';
    }
}
exports.transactionStatus = transactionStatus;
