import express, { Router, Request, Response } from 'express'
import axios from 'axios'
import connection from './db'
import { TransactionSuccess, TransactionFailure, Params, AddressError, MIDError, KeyError } from './data-structure'
const debug = require('debug')('service:payment-loader')
const checksum = require('./paytm/checksum.js')
debug('Started Debugging process of payment-server\nLocation : routes/payment-server.ts')
var address: string = process.env.ADDRESS!
debug(`IP Address set in payment files  is ${address}`)
//var url: string = `http://localhost:${process.env.PORT}/payment`
var queue: Array<Params> = []
const router: Router = express.Router()
var allow: boolean = true
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
    CALLBACK_URL: `http://${address}:8081/payment/redirect`,
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

if (process.env.ADDRESS === '165.22.210.37') {
    allow = false
}
//get_transaction_status()

router.get('/tender', (request: Request, response: Response) => {
    let et_id = request.query.et_id
    var vcd_id = request.cookies.vcd_id
    if (et_id === undefined) {
        response.send('Cannot find tenders with undefined et_id')
    } else {
        connection.query('SELECT * FROM  e_tender_details INNER JOIN department ON e_tender_details.dept_id = department.dept_id WHERE et_id = ?', [et_id], (error, result) => {
            if (error) {
                debug(error)
            } else {
                if (result.length > 0) {
                    connection.query(`SELECT * FROM v_contact_details where vcd_id=${vcd_id}`, (err, res) => {
                        if (err) {
                            debug(err)
                        } else {
                            response.render('user/v4_apply_tender_s2', { layout: false, amount: result[0].et_tender_fee, allow, email: res[0].vcd_email, contact: res[0].vcd_contact })
                        }
                    })
                } else {
                    response.send('No such tender with et_id exists')
                }
            }
        })
    }
})

router.post('/', (request: Request, response: Response) => {
    params['ORDER_ID'] = 'ORD' + Math.floor(Math.random() * 10 ** 10).toString()
    params['CUST_ID'] = 'CUST' + Math.floor(Math.random() * 10 ** 10).toString()
    params['TXN_AMOUNT'] = request.body.amount
    params['EMAIL'] = request.body.email
    params['MOBILE_NO'] = request.body.mobile
    queue.push(new Params(request, params['ORDER_ID'], params['CUST_ID']))
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

router.post('/redirect', (request: Request, response: Response) => {
    var result = request.body
    console.log(request.params)
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
                    } else {
                        debug('Successfully inserted in payment database')
                        connection.query(`update e_tender_vendor set status=110 where et_id=${i.et_id} and etd_id=${i.etd_id}`, (error, result) => {
                            if (error) {
                                debug('Error in updating in e-tender-vendor')
                            } else {
                                debug('Successfully updated e_tender_vendor table')
                            }
                        })
                    }
                })
                response.redirect(`http://${address}:8081/v4_apply_tender_s3.html?et_id=${i.et_id}&etd_id=${i.etd_id}`)
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
            for (var i of queue) {
                if (i.order_id == transaction_fail.order_id) {
                    response.render('user/v4_apply_tender_s2', { layout: false,allow})
                    //response.redirect(`http://${address}:8081/v4_apply_tender_s2.html?et_id=${i.et_id}&etd_id=${i.etd_id}&code=0`)
                }
            }
        }
    }
})

setInterval(() => {
    debug('The status of queue is ', queue)
}, 8000)
export default router