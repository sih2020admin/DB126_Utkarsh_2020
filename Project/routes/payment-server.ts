import express from 'express'
import { Router, Request, Response } from "express"
const checksum = require("./paytm/checksum.js")

const router:Router = express.Router()
const salt:string = "rTyIgCQYeh5YQzSm";


var params= {
    "MID" : "jiitCC65479360829906",
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
router.post("/",(request:Request,response:Response)=>{
    params["ORDER_ID"] = "ORD" + Math.floor(Math.random()*10**10).toString()
    params["CUST_ID"] = "CUST" + Math.floor(Math.random()*10**10).toString()
    params["TXN_AMOUNT"] = request.body.amount
    params["EMAIL"] = request.body.email
    params["MOBILE_NO"] = request.body.mobile
    params["TXN_AMOUNT"] = request.body.amount
    console.log(params)
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

export default router