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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var axios_1 = __importDefault(require("axios"));
var debug = require('debug')('payment');
var checksum = require("./paytm/checksum.js");
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
    function TransactionFailure(txn_id, order_id, amount, status_message, status_code, refund_amount, timestamp) {
        return _super.call(this, txn_id, order_id, amount, status_message, status_code, refund_amount, timestamp) || this;
    }
    return TransactionFailure;
}(Transaction));
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
var router = express_1.default.Router();
var salt = process.env.KEY;
var params = {
    "MID": process.env.MID,
    "WEBSITE": "WEBSTAGING",
    "INDUSTRY_TYPE_ID": "Retail",
    "CHANNEL_ID": "WEB",
    "ORDER_ID": "",
    "CUST_ID": "",
    "MOBILE_NO": "",
    "EMAIL": "",
    "TXN_AMOUNT": "",
    "CALLBACK_URL": "http://165.22.210.37:8080/redirect",
};
var verify_params = {
    "MID": process.env.MID,
    "ORDERID": "ORD9548155614",
    "CHECKSUMHASH": ""
};
checksum.genchecksum(verify_params, salt, function (err, checksum) {
    verify_params["CHECKSUMHASH"] = checksum;
    axios_1.default({
        method: "POST",
        url: "https://securegw-stage.paytm.in/order/status",
        data: JSON.stringify(verify_params)
    }).then(function (response) {
        debug(response.data);
    });
});
router.post("/", function (request, response) {
    params["ORDER_ID"] = "ORD" + Math.floor(Math.random() * Math.pow(10, 10)).toString();
    params["CUST_ID"] = "CUST" + Math.floor(Math.random() * Math.pow(10, 10)).toString();
    params["TXN_AMOUNT"] = request.body.amount;
    params["EMAIL"] = request.body.email;
    params["MOBILE_NO"] = request.body.mobile;
    params["TXN_AMOUNT"] = request.body.amount;
    checksum.genchecksum(params, salt, function (error, result) {
        var url = "https://securegw-stage.paytm.in/order/process";
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write('<html>');
        response.write('<head>');
        response.write('<title>Merchant Checkout Page</title>');
        response.write('</head>');
        response.write('<body>');
        response.write('<center><h1>Please do not refresh this page...</h1></center>');
        response.write('<form method="post" action="' + url + '" name="paytm_form">');
        for (var x in params) {
            response.write('<input type="hidden" name="' + x + '" value="' + params[x] + '">');
        }
        response.write('<input type="hidden" name="CHECKSUMHASH" value="' + result + '">');
        response.write('</form>');
        response.write('<script type="text/javascript">');
        response.write('document.paytm_form.submit();');
        response.write('</script>');
        response.write('</body>');
        response.write('</html>');
        response.end();
    });
});
router.post("/redirect", function (request, resp) {
    verify_params["ORDERID"] = params['ORDER_ID'];
    checksum.genchecksum(verify_params, salt, function (err, checksum) {
        verify_params["CHECKSUMHASH"] = checksum;
        axios_1.default({
            method: "POST",
            url: "https://securegw-stage.paytm.in/order/status",
            data: JSON.stringify(verify_params)
        }).then(function (response) {
            //console.log(response)
        });
    });
});
exports.default = router;
