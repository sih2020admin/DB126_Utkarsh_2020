"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cookie = exports.TransactionSuccess = exports.TransactionFailure = exports.PaymentDetails = exports.Params = exports.MIDError = exports.KeyError = exports.AddressError = exports.Queue = void 0;
class Queue {
    constructor() {
        this.queue_items = [];
    }
    enqueue(item) {
        this.queue_items.push(item);
    }
    dequeue() {
        return this.queue_items.shift();
    }
    display() {
        console.log(this.queue_items);
    }
    get_elements() {
        return this.queue_items;
    }
    length() {
        return this.queue_items.length;
    }
    clear() {
        this.queue_items = [];
    }
}
exports.Queue = Queue;
class AddressError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, AddressError.prototype);
    }
}
exports.AddressError = AddressError;
class KeyError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, KeyError.prototype);
    }
}
exports.KeyError = KeyError;
class MIDError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, MIDError.prototype);
    }
}
exports.MIDError = MIDError;
class Params {
    constructor(response, order_id, customer_id) {
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
}
exports.Params = Params;
class PaymentDetails {
    constructor(order_id, customer_id, txn_amount) {
        this.order_id = order_id;
        this.customer_id = customer_id;
        this.txn_amount = txn_amount;
    }
}
exports.PaymentDetails = PaymentDetails;
class Transaction {
    constructor(txn_id, order_id, amount, status_message, status_code, refund_amount, timestamp) {
        this.txn_id = txn_id;
        this.order_id = order_id;
        this.amount = amount;
        this.status_message = status_message;
        this.status_code = status_code;
        this.refund_amount = refund_amount;
        this.timestamp = timestamp;
    }
}
class TransactionFailure extends Transaction {
    constructor(response) {
        if ('data' in response) {
            response = response.data;
        }
        if ('body' in response) {
            response = response.body;
        }
        if (response.REFUNDAMT == undefined) {
            response.REFUNDAMT = '0.00';
        }
        super(response.TXNID, response.ORDERID, response.TXNAMOUNT, response.STATUS, response.RESPCODE, response.REFUNDAMT, response.TXNDATE);
        this.resp_message = response.RESPMSG;
    }
}
exports.TransactionFailure = TransactionFailure;
class TransactionSuccess extends Transaction {
    constructor(response) {
        if ('data' in response) {
            response = response.data;
        }
        if ('body' in response) {
            response = response.body;
        }
        if (response.REFUNDAMT == undefined) {
            response.REFUNDAMT = '0.00';
        }
        super(response.TXNID, response.ORDERID, response.TXNAMOUNT, response.STATUS, response.RESPCODE, response.REFUNDAMT, response.TXNDATE);
        this.bank_txn_id = response.BANKTXNID;
        this.gateway_name = response.GATEWAYNAME;
        this.bank_name = response.BANKNAME;
        this.payment_mode = response.PAYMENTMODE;
    }
    to_array() {
        return [this.txn_id, this.order_id, this.amount, this.status_message, this.status_code, this.refund_amount, this.timestamp, this.bank_txn_id, this.gateway_name, this.bank_name, this.payment_mode];
    }
}
exports.TransactionSuccess = TransactionSuccess;
class Cookie {
    check_admin(request) {
        if (request.signedCookies.ad_id_e === undefined || request.signedCookies.ad_id_e === undefined || request.signedCookies.ad_id_e === undefined) {
            return 366;
        }
        else {
            return 100;
        }
    }
    check_vendor(request) {
        if (request.signedCookies.vcd_id_e === undefined || request.signedCookies.vd_id_e === undefined) {
            return 366;
        }
        else {
            return 100;
        }
    }
}
exports.Cookie = Cookie;
