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
    Queue.prototype.get_elements = function () {
        return this.queue_items;
    };
    Queue.prototype.length = function () {
        return this.queue_items.length;
    };
    Queue.prototype.clear = function () {
        this.queue_items = [];
    };
    return Queue;
}());
exports.Queue = Queue;
var AddressError = /** @class */ (function (_super) {
    __extends(AddressError, _super);
    function AddressError(message) {
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, AddressError.prototype);
        return _this;
    }
    return AddressError;
}(Error));
exports.AddressError = AddressError;
var KeyError = /** @class */ (function (_super) {
    __extends(KeyError, _super);
    function KeyError(message) {
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, KeyError.prototype);
        return _this;
    }
    return KeyError;
}(Error));
exports.KeyError = KeyError;
var MIDError = /** @class */ (function (_super) {
    __extends(MIDError, _super);
    function MIDError(message) {
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, MIDError.prototype);
        return _this;
    }
    return MIDError;
}(Error));
exports.MIDError = MIDError;
var Params = /** @class */ (function () {
    function Params(response, order_id, customer_id) {
        if ('body' in response) {
            response = response.body;
        }
        this.et_id = response.et_id;
        this.etd_id = response.etd_id;
        this.amount = response.amount;
        this.email = response.email;
        this.mobile = response.mobile;
        this.order_id = order_id;
        this.customer_id = customer_id;
    }
    return Params;
}());
exports.Params = Params;
var PaymentDetails = /** @class */ (function () {
    function PaymentDetails(order_id, customer_id, txn_amount) {
        this.order_id = order_id;
        this.customer_id = customer_id;
        this.txn_amount = txn_amount;
    }
    return PaymentDetails;
}());
exports.PaymentDetails = PaymentDetails;
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
    function TransactionFailure(response) {
        var _this = this;
        if ('data' in response) {
            response = response.data;
        }
        if ('body' in response) {
            response = response.body;
        }
        if (response.REFUNDAMT == undefined) {
            response.REFUNDAMT = '0.00';
        }
        _this = _super.call(this, response.TXNID, response.ORDERID, response.TXNAMOUNT, response.STATUS, response.RESPCODE, response.REFUNDAMT, response.TXNDATE) || this;
        _this.resp_message = response.RESPMSG;
        return _this;
    }
    return TransactionFailure;
}(Transaction));
exports.TransactionFailure = TransactionFailure;
var TransactionSuccess = /** @class */ (function (_super) {
    __extends(TransactionSuccess, _super);
    function TransactionSuccess(response) {
        var _this = this;
        if ('data' in response) {
            response = response.data;
        }
        if ('body' in response) {
            response = response.body;
        }
        if (response.REFUNDAMT == undefined) {
            response.REFUNDAMT = '0.00';
        }
        _this = _super.call(this, response.TXNID, response.ORDERID, response.TXNAMOUNT, response.STATUS, response.RESPCODE, response.REFUNDAMT, response.TXNDATE) || this;
        _this.bank_txn_id = response.BANKTXNID;
        _this.gateway_name = response.GATEWAYNAME;
        _this.bank_name = response.BANKNAME;
        _this.payment_mode = response.PAYMENTMODE;
        return _this;
    }
    TransactionSuccess.prototype.to_array = function () {
        return [this.txn_id, this.order_id, this.amount, this.status_message, this.status_code, this.refund_amount, this.timestamp, this.bank_txn_id, this.gateway_name, this.bank_name, this.payment_mode];
    };
    return TransactionSuccess;
}(Transaction));
exports.TransactionSuccess = TransactionSuccess;
