"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Queue = /** @class */ (function () {
    function Queue() {
        this.queue_items = [];
    }
    Queue.prototype.enqueue = function (item) {
        this.queue_items.push(item);
    };
    Queue.prototype.dequeue = function () {
        return this.queue_items.shift();
    };
    Queue.prototype.display = function () {
        console.log(this.queue_items);
    };
    return Queue;
}());
exports.Queue = Queue;
var Transaction = /** @class */ (function () {
    function Transaction(txn_id, order_id, amount, status_message, status_code, refund_amount, timestamp) {
        this.txn_id = txn_id;
        this.order_id = order_id;
        this.amount = amount;
        this.status_message = status_message;
        this.status_code = status_code;
        this.refund_amount = refund_amount;
        this.timestamp = timestamp;
    }
    return Transaction;
}());
var TransactionFailure = /** @class */ (function (_super) {
    __extends(TransactionFailure, _super);
    function TransactionFailure(txn_id, order_id, amount, status_message, status_code, refund_amount, timestamp, resp_message) {
        var _this = _super.call(this, txn_id, order_id, amount, status_message, status_code, refund_amount, timestamp) || this;
        _this.resp_message = resp_message;
        return _this;
    }
    return TransactionFailure;
}(Transaction));
exports.TransactionFailure = TransactionFailure;
var TransactionSuccess = /** @class */ (function (_super) {
    __extends(TransactionSuccess, _super);
    function TransactionSuccess(txn_id, order_id, amount, status_message, status_code, refund_amount, timestamp, bank_txn_id, gateway_name, bank_name, payment_mode) {
        var _this = _super.call(this, txn_id, order_id, amount, status_message, status_code, refund_amount, timestamp) || this;
        _this.bank_txn_id = bank_txn_id;
        _this.gateway_name = gateway_name;
        _this.bank_name = bank_name;
        _this.payment_mode = payment_mode;
        return _this;
    }
    return TransactionSuccess;
}(Transaction));
exports.TransactionSuccess = TransactionSuccess;
