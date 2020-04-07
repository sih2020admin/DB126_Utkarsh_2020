"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var axios_1 = __importDefault(require("axios"));
var checksum = require("./paytm/checksum.js");
var TransactionData = /** @class */ (function () {
    function TransactionData(payment_mode) {
        this.payment_mode = payment_mode;
    }
    return TransactionData;
}());
var app = new TransactionData("DC");
app.payment_mode;
console.log(app.payment_mode);
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
        console.log(response);
    });
});
router.post("/", function (request, response) {
    params["ORDER_ID"] = "ORD" + Math.floor(Math.random() * Math.pow(10, 10)).toString();
    params["CUST_ID"] = "CUST" + Math.floor(Math.random() * Math.pow(10, 10)).toString();
    params["TXN_AMOUNT"] = request.body.amount;
    params["EMAIL"] = request.body.email;
    params["MOBILE_NO"] = request.body.mobile;
    params["TXN_AMOUNT"] = request.body.amount;
    console.log(params);
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
            console.log(response);
        });
    });
});
exports.default = router;
