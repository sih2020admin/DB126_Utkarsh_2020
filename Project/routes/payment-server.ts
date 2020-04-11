import express, { Router, Request, Response } from 'express'
import axios from 'axios'
import connection from './db'
import { TransactionSuccess, TransactionFailure, Queue, Params } from './data-structure'
const debug = require('debug')('payment')
const checksum = require('./paytm/checksum.js')
debug('Started Debugging process of payment-server\nLocation : routes/payment-server.ts')
var queue:Array<Params> = []
const router: Router = express.Router()
const salt: string = process.env.KEY!
var params: { [key: string]: string } = {
    MID: process.env.MID!,
    WEBSITE: 'WEBSTAGING',
    INDUSTRY_TYPE_ID: 'Retail',
    CHANNEL_ID: 'WEB',
    ORDER_ID: '',
    CUST_ID: '',
    MOBILE_NO: '',
    EMAIL: '',
    TXN_AMOUNT: '',
    CALLBACK_URL: 'http://192.168.1.106:8081/payment/redirect',
}

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
    MID: process.env.MID!,
    ORDERID: 'ORD9548155614', //ORD335093582 fail ORD9548155614 success
    CHECKSUMHASH: '',
}

function get_transaction_status() {
    checksum.genchecksum(verify_params, salt, function (err: any, checksum: string) {
        verify_params['CHECKSUMHASH'] = checksum
        axios({
            method: 'POST',
            url: 'https://securegw-stage.paytm.in/order/status',
            data: JSON.stringify(verify_params),
        }).then(function (response) {
            var result = response.data
            var code: string = result.RESPCODE
            debug(`Status Code of transaction is ${code}`)
            if (response.data.RESPCODE === '01') {
                debug(`\nTransaction is successful`)
                var transaction_success = new TransactionSuccess(result)
                debug('Transaction success object :', transaction_success)

                connection.query('truncate payment_transactions')
                connection.query('INSERT INTO payment_transactions VALUES (?,?)', ['4', transaction_success.to_array()], (error, result) => {
                    if (error) {
                        debug('Mysql insertion error', error)
                    } else debug('Result', result)
                })
            } else if (code === '400' || code === '402') {
                debug('\nTransaction is pending')
                debug('Transaction Pending object', result)
            } else {
                debug('\nTransaction has failed')
                if (result.RESPCODE === '334') {
                    debug('Invalid Order ID')
                } else {
                    var transaction_fail = new TransactionFailure(result)
                    debug('Transaction Failure Object :', transaction_fail)
                }
            }
        })
    })
}

//get_transaction_status()

router.post('/', (request: Request, response: Response) => {
    params['ORDER_ID'] = 'ORD' + Math.floor(Math.random() * 10 ** 10).toString()
    params['CUST_ID'] = 'CUST' + Math.floor(Math.random() * 10 ** 10).toString()
    params['TXN_AMOUNT'] = request.body.amount
    params['EMAIL'] = request.body.email
    params['MOBILE_NO'] = request.body.mobile
    queue.push(new Params(request, params['ORDER_ID'], params['CUST_ID']))
    /* checksum.genchecksum(params, salt, (error: any, result: any) => {
        var url: string = 'https://securegw-stage.paytm.in/order/process'
        response.writeHead(200, { 'Content-Type': 'text/html' })
        response.write('<html>')
        response.write('<head>')
        response.write('<title>Merchant Checkout Page</title>')
        response.write('</head>')
        response.write('<body>')
        response.write('<center><h1>Please do not refresh this page...</h1></center>')
        response.write('<form method="post" action="' + url + '" name="paytm_form">')
        for (var x in params) {
            response.write('<input type="hidden" name="' + x + '" value="' + params[x] + '">')
        }
        response.write('<input type="hidden" name="CHECKSUMHASH" value="' + result + '">')
        response.write('</form>')
        response.write('<script type="text/javascript">')
        response.write('document.paytm_form.submit();')
        response.write('</script>')
        response.write('</body>')
        response.write('</html>')
        response.end()
    }) */
})

router.post('/redirect', (request: Request, response: Response) => {
    var result = request.body
    /* var isValidChecksum = checksum.verifychecksum(params, salt, result.CHECKSUMHASH)
    if (isValidChecksum) {
        console.log('Checksum Matched')
    } else {
        console.log('Checksum Mismatched')
    } */
    var code: string = result.RESPCODE
    debug(`Status Code of transaction is ${code}`)
    if (result.RESPCODE === '01') {
        debug(`\nTransaction is successful`)
        var transaction_success = new TransactionSuccess(result)
        debug('Transaction success object :', transaction_success)
        for (var i of queue) {
            if (i.order_id == transaction_success.order_id) {
                connection.query('INSERT INTO payment_transactions VALUES (?,?)', [i.etd_id, transaction_success.to_array()], (error, result) => {
                    if (error) {
                        debug('Mysql insertion error', error)
                    } else debug('Result', result)
                })
            }
        }
        //connection.query('truncate payment_transactions')
    } else if (code === '400' || code === '402') {
        debug('\nTransaction is pending')
        debug('Transaction Pending object', result)
    } else {
        debug('\nTransaction has failed')
        if (result.RESPCODE === '334') {
            debug('Invalid Order ID')
        } else {
            var transaction_fail = new TransactionFailure(result)
            debug('Transaction Failure Object :', transaction_fail)
        }
    }
})

export default router
