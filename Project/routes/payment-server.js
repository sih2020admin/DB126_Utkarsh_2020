"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var axios_1 = __importDefault(require("axios"));
var db_1 = __importDefault(require("./db"));
var data_structure_1 = require("./data-structure");
var debug = require('debug')('service:payment-loader');
var checksum = require('./paytm/checksum.js');
debug('Started Debugging process of payment-server\nLocation : routes/payment-server.ts');
var address = process.env.ADDRESS;
debug("IP Address set in payment files  is " + address);
var url = "http://localhost:" + process.env.PORT;
var queue = [];
var router = express_1.default.Router();
var salt = process.env.KEY;
var params = {
    MID: process.env.MID,
    WEBSITE: 'WEBSTAGING',
    INDUSTRY_TYPE_ID: 'Retail',
    CHANNEL_ID: 'WEB',
    ORDER_ID: '',
    CUST_ID: '',
    MOBILE_NO: '',
    EMAIL: '',
    TXN_AMOUNT: '',
    CALLBACK_URL: "http://" + address + ":8081/payment/redirect",
};
/* var data =2
function demo(){
    return new Promise(function(result,error){
        if (data == 1){
            error("error")
        }
        else{
            result(data)
        }
    })
}
demo().then(function(result){
    console.log(result)
}).catch(error=>{
    console.log(error)
})
 */
var verify_params = {
    MID: process.env.MID,
    ORDERID: 'ORD9548155614',
    CHECKSUMHASH: '',
};
function get_transaction_status() {
    checksum.genchecksum(verify_params, salt, function (err, checksum) {
        verify_params['CHECKSUMHASH'] = checksum;
        axios_1.default({
            method: 'POST',
            url: 'https://securegw-stage.paytm.in/order/status',
            data: JSON.stringify(verify_params),
        }).then(function (response) {
            var result = response.data;
            var code = result.RESPCODE;
            debug("Status Code of transaction is " + code);
            if (response.data.RESPCODE === '01') {
                debug("\nTransaction is successful");
                var transaction_success = new data_structure_1.TransactionSuccess(result);
                debug('Transaction success object :', transaction_success);
                db_1.default.query('truncate payment_transactions');
                db_1.default.query('INSERT INTO payment_transactions VALUES (?,?)', ['4', transaction_success.to_array()], function (error, result) {
                    if (error) {
                        debug('Mysql insertion error', error);
                    }
                    else
                        debug('Result', result);
                });
            }
            else if (code === '400' || code === '402') {
                debug('\nTransaction is pending');
                debug('Transaction Pending object', result);
            }
            else {
                debug('\nTransaction has failed');
                if (result.RESPCODE === '334') {
                    debug('Invalid Order ID');
                }
                else {
                    var transaction_fail = new data_structure_1.TransactionFailure(result);
                    debug('Transaction Failure Object :', transaction_fail);
                }
            }
        });
    });
}
if (process.env.ADDRESS === '165.22.210.37') {
    url = "http://165.22.210.37:8081";

console.log(url)}
//get_transaction_status()
router.get('/tender', function (request, response) {
    var et_id = request.query.et_id;
    if (et_id === undefined) {
        response.send('Cannot find tenders with undefined et_id');
    }
    else {
        db_1.default.query('SELECT * FROM  e_tender_details INNER JOIN department ON e_tender_details.dept_id = department.dept_id WHERE et_id = ?', [et_id], function (error, result) {
            if (error) {
                debug('error');
            }
            else {
                if (result.length > 0) {
                    response.render('user/v4_apply_tender_s2', { layout: false, url: url, amount: result[0].et_tender_fee });
                }
                else {
                    response.send('No such tender with et_id exists');
                }
            }
        });
    }
});
router.post('/', function (request, response) {
    params['ORDER_ID'] = 'ORD' + Math.floor(Math.random() * Math.pow(10, 10)).toString();
    params['CUST_ID'] = 'CUST' + Math.floor(Math.random() * Math.pow(10, 10)).toString();
    params['TXN_AMOUNT'] = request.body.amount;
    params['EMAIL'] = request.body.email;
    params['MOBILE_NO'] = request.body.mobile;
    queue.push(new data_structure_1.Params(request, params['ORDER_ID'], params['CUST_ID']));
    checksum.genchecksum(params, salt, function (error, result) {
        var url = 'https://securegw-stage.paytm.in/order/process';
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
router.post('/redirect', function (request, response) {
    var e_1, _a, e_2, _b;
    var result = request.body;
    /* var isValidChecksum = checksum.verifychecksum(params, salt, result.CHECKSUMHASH)
    if (isValidChecksum) {
        console.log('Checksum Matched')
    } else {
        console.log('Checksum Mismatched')
    } */
    var code = result.RESPCODE;
    debug("Status Code of transaction is " + code);
    if (result.RESPCODE === '01') {
        debug("\nTransaction is successful");
        var transaction_success = new data_structure_1.TransactionSuccess(result);
        debug('Transaction success object :', transaction_success);
        try {
            for (var queue_1 = __values(queue), queue_1_1 = queue_1.next(); !queue_1_1.done; queue_1_1 = queue_1.next()) {
                var i = queue_1_1.value;
                if (i.order_id == transaction_success.order_id) {
                    db_1.default.query('INSERT INTO payment_transactions VALUES (?,?)', [i.etd_id, transaction_success.to_array()], function (error, result) {
                        if (error) {
                            debug('Mysql insertion error', error);
                        }
                        else {
                            debug('Successfully inserted in payment database');
                            db_1.default.query("update e_tender_vendor set status=110 where et_id=" + i.et_id + " and etd_id=" + i.etd_id, function (error, result) {
                                if (error) {
                                    debug('Error in updating in e-tender-vendor');
                                }
                                else {
                                    debug('Successfully updated e_tender_vendor table');
                                }
                            });
                        }
                    });
                    response.redirect("http://" + address + ":8081/v4_apply_tender_s3.html?et_id=" + i.et_id + "&etd_id=" + i.etd_id);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (queue_1_1 && !queue_1_1.done && (_a = queue_1.return)) _a.call(queue_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        //connection.query('truncate payment_transactions')
    }
    else if (code === '400' || code === '402') {
        debug('\nTransaction is pending');
        debug('Transaction Pending object', result);
    }
    else {
        debug('\nTransaction has failed');
        if (result.RESPCODE === '334') {
            debug('Invalid Order ID');
        }
        else {
            var transaction_fail = new data_structure_1.TransactionFailure(result);
            debug('Transaction Failure Object :', transaction_fail);
            try {
                for (var queue_2 = __values(queue), queue_2_1 = queue_2.next(); !queue_2_1.done; queue_2_1 = queue_2.next()) {
                    var i = queue_2_1.value;
                    if (i.order_id == transaction_fail.order_id) {
                        response.redirect("http://" + address + ":8081/v4_apply_tender_s2.html?et_id=" + i.et_id + "&etd_id=" + i.etd_id + "&code=0");
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (queue_2_1 && !queue_2_1.done && (_b = queue_2.return)) _b.call(queue_2);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
    }
});
setInterval(function () {
    debug('The status of queue is ', queue);
}, 8000);
exports.default = router;
