import express,{ Router, Request, Response } from 'express'
import axios from 'axios'
const debug = require('debug')('payment')
const checksum = require("./paytm/checksum.js")

class Transaction{
    constructor(txn_id:string,order_id:string,amount:string,status_message:string,status_code:string,refund_amount:string,timestamp:string){
        this.txn_id = txn_id
        this.order_id = order_id
        this.amount = amount
        this.status_message = status_message
        this.status_code = status_code
        this.refund_amount = refund_amount
        this.timestamp = timestamp
    }
    readonly txn_id:string
    readonly order_id:string
    readonly amount:string
    readonly status_message:string
    readonly status_code:string
    readonly refund_amount:string
    readonly timestamp:string 
    
    
}
class TransactionFailure extends Transaction{
    constructor(txn_id:string,order_id:string,amount:string,status_message:string,status_code:string,refund_amount:string,timestamp:string){
        super(txn_id,order_id,amount,status_message,status_code,refund_amount,timestamp)
        
    }
}

class TransactionSuccess extends Transaction{
    constructor(txn_id:string,order_id:string,amount:string,status_message:string,status_code:string,refund_amount:string,
        timestamp:string,bank_txn_id:string,gateway_name:string,bank_name:string,payment_mode:string){
        super(txn_id,order_id,amount,status_message,status_code,refund_amount, timestamp)
        this.bank_txn_id = bank_txn_id
        this.gateway_name = gateway_name
        this.bank_name = bank_name
        this.payment_mode =payment_mode
    }
    readonly bank_txn_id:string
    readonly gateway_name:string
    readonly bank_name:string
    readonly payment_mode:string
}
const router:Router = express.Router()
const salt:string = process.env.KEY!;
var params : { [key: string]: string }= {
    "MID" : process.env.MID!,
    "WEBSITE" : "WEBSTAGING",
    "INDUSTRY_TYPE_ID" : "Retail",
    "CHANNEL_ID" : "WEB",
    "ORDER_ID" : "",
    "CUST_ID" : "",
    "MOBILE_NO" : "",
    "EMAIL" : "",
    "TXN_AMOUNT" : "",
    "CALLBACK_URL" : "http://165.22.210.37:8080/redirect",
};
var verify_params = {
    "MID":process.env.MID!,
    "ORDERID":"ORD9548155614",//ORD335093582 fail ORD9548155614 success
    "CHECKSUMHASH":""

}
checksum.genchecksum(verify_params, salt, function(err:any, checksum:string){
verify_params["CHECKSUMHASH"] = checksum;
axios({
    method:"POST",
    url:"https://securegw-stage.paytm.in/order/status",
    data:JSON.stringify(verify_params)
}).then(function(response){
    debug(response.data)
})
});
router.post("/",(request:Request,response:Response)=>{
    params["ORDER_ID"] = "ORD" + Math.floor(Math.random()*10**10).toString()
    params["CUST_ID"] = "CUST" + Math.floor(Math.random()*10**10).toString()
    params["TXN_AMOUNT"] = request.body.amount
    params["EMAIL"] = request.body.email
    params["MOBILE_NO"] = request.body.mobile
    params["TXN_AMOUNT"] = request.body.amount
    checksum.genchecksum(params,salt,(error:any,result:any)=>{
        var url:string = "https://securegw-stage.paytm.in/order/process"
        response.writeHead(200, {'Content-Type': 'text/html'});
		response.write('<html>');
		response.write('<head>');
		response.write('<title>Merchant Checkout Page</title>');
		response.write('</head>');
		response.write('<body>');
		response.write('<center><h1>Please do not refresh this page...</h1></center>');
		response.write('<form method="post" action="' + url + '" name="paytm_form">');
		for(var x in params){
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
	
    })

})

router.post("/redirect",(request:Request,resp:Response)=>{
    verify_params["ORDERID"] = params['ORDER_ID'];
    checksum.genchecksum(verify_params, salt, function(err:any, checksum:any){
        verify_params["CHECKSUMHASH"] = checksum;
        axios({
            method:"POST",
            url:"https://securegw-stage.paytm.in/order/status",
            data:JSON.stringify(verify_params)
        }).then(function(response){
            //console.log(response)
        })
        });
    
})

export default router