import express, { Router, Request, Response } from 'express'
import axios from 'axios'
const debug = require('debug')('payment')
import { TransactionSuccess, TransactionFailure , Queue } from './data-structure'
const checksum = require('./paytm/checksum.js')

debug('Started Debugging process of payment-server\nLocation : routes/payment-server.ts')
 
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
    CALLBACK_URL: 'http://165.22.210.37:8080/redirect',
}
var verify_params = {
    MID: process.env.MID!,
    ORDERID: 'ORD335093582', //ORD335093582 fail ORD9548155614 success
    CHECKSUMHASH: '',
}
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
            debug(`Transaction is successful`)
            var transaction_success = new TransactionSuccess(
                result.TXNID,
                result.ORDERID,
                result.TXNAMOUNT,
                result.STATUS,
                result.RESPCODE,
                result.REFUNDAMT,
                result.TXNDATE,
                result.BANKTXNID,
                result.GATEWAYNAME,
                result.BANKNAME,
                result.PAYMENTMODE
            )
            debug('Transaction success object :', transaction_success)
        } else if (code === '400' || code === '402') {
            debug('Transaction is pending')
            debug('Transaction Pending object',response.data)
        } else {
            debug('Transaction has failed')
            var transaction_fail = new TransactionFailure(
                result.TXNID,
                result.ORDERID,
                result.TXNAMOUNT,
                result.STATUS,
                result.RESPCODE,
                result.REFUNDAMT,
                result.TXNDATE,
                result.RESPMSG
            )
            debug('Transaction Failure Object :', transaction_fail)
        }
    })
})
router.post('/', (request: Request, response: Response) => {
    params['ORDER_ID'] = 'ORD' + Math.floor(Math.random() * 10 ** 10).toString()
    params['CUST_ID'] = 'CUST' + Math.floor(Math.random() * 10 ** 10).toString()
    params['TXN_AMOUNT'] = request.body.amount
    params['EMAIL'] = request.body.email
    params['MOBILE_NO'] = request.body.mobile
    params['TXN_AMOUNT'] = request.body.amount
    checksum.genchecksum(params, salt, (error: any, result: any) => {
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
    })
})

router.post('/redirect', (request: Request, resp: Response) => {
    verify_params['ORDERID'] = params['ORDER_ID']
    checksum.genchecksum(verify_params, salt, function (err: any, checksum: any) {
        verify_params['CHECKSUMHASH'] = checksum
        axios({
            method: 'POST',
            url: 'https://securegw-stage.paytm.in/order/status',
            data: JSON.stringify(verify_params),
        }).then(function (response) {})
    })
})

export default router
