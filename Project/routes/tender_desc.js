	"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var db_1 = __importDefault(require("./db"));
var router = express_1.default.Router();
var unirest = require('unirest');


router.post('/tender_desc', function (req, res) {

    	var id= req.body.et_id;
    //   var vcd_id= req.body.vcd_id;
	//   var vd_id= req.body.vd_id;
	var vd_id = req.signedCookies.vd_id_e;
      var vcd_id = req.signedCookies.vcd_id_e;
		console.log("tender desc called "+id)
	
				
	db_1.default.query('SELECT * FROM  e_tender_details INNER JOIN department ON e_tender_details.dept_id = department.dept_id WHERE et_id = ? ; SELECT  `vcd_name`, `vcd_title`, `vcd_dob`,`vcd_aadhar`,`vcd_contact`, `vcd_email`, `vcd_designation` FROM `v_contact_details` WHERE vcd_id=?; SELECT `v_name`, `v_address`, `v_yoe`, `v_email`, `v_mobile`, `v_reg_no`, `v_state_id`, `v_dist_id`, `v_city_id`, `v_pincode`, `v_legal_id`, `v_pan`, `v_is_verified`, `v_gst` FROM `vendor_details` WHERE vd_id=?',[id,vcd_id,vd_id], function (error, results, fields) {
		if (error) {
	      		//console.log("error");
	      		res.sendStatus(400);
	     	}else{
	       		if(results.length >0){
	       			res.send(results);
       			}
       			else{
         			//does not exists
         			res.sendStatus(400);
       			}
      		}
    	});
});

router.post('/get_etd_id', function (req, res) {

	var et_id= req.body.et_id;
	// var vd_id= req.body.vd_id;
	var vd_id = req.signedCookies.vd_id_e;
	  var vcd_id = req.signedCookies.vcd_id_e;
	  var key=process.env["ENCRYPTION_KEY"];
	console.log("tender desc called "+et_id)

			
db_1.default.query('SELECT etd_id,cast( AES_DECRYPT(status ,?) as char ) as status  FROM  e_tender_vendor WHERE et_id = ? and vd_id=?',[key,et_id,vd_id], function (error, results, fields) {
	if (error) {
			  //console.log("error");
			  res.sendStatus(400);
		 }else{
			   if(results.length >0){
				   console.log(results[0]);
				   res.send(results[0]);
			   }
			   else{
				 //does not exists
				 res.sendStatus(404);
			   }
		  }
	});
});
	
router.post('/view', function (req, res) {
		var et= req.body.et_id;
		// var vd= req.body.vd_id;
		var vd_id = req.signedCookies.vd_id_e;
      var vcd_id = req.signedCookies.vcd_id_e;
		var etd= req.body.etd_id;
		var key=process.env["ENCRYPTION_KEY"];
		db_1.default.query('SELECT et_id,et_title,et_tender_fee,et_tender_ref_no,et_bidding_date FROM  e_tender_details WHERE et_id = ?',[et],function(error,results){
			if (error) {
					console.log("Tender Details Error");
					// res.sendStatus(400);
			}else{
				db_1.default.query('SELECT * FROM (SELECT vendor_details.vd_id,vcd_name ,vcd_dob ,vcd_aadhar,vcd_contact,vcd_email,vcd_designation,v_name,v_address,v_yoe,v_email,v_mobile,v_reg_no,v_legal_id,v_pan,v_gst FROM v_contact_details,vendor_details WHERE v_contact_details.vd_id=vendor_details.vd_id) AS hello WHERE vd_id= ?',[vd_id],function(error,result){
					if(error){
						console.log("Personal and Company Details Error");
						// res.sendStatus(400);
					}
					else{
						db_1.default.query('SELECT * FROM (SELECT file_uri.etd_id,cast( AES_DECRYPT(furi1 ,?) as char ) as furi1,cast( AES_DECRYPT(furi2 ,?) as char ) as furi2 ,txn_id,txn_amount,txn_timestamp,bank_name ,resp_message FROM file_uri,payment_transactions WHERE file_uri.etd_id=payment_transactions.etd_id) AS hello WHERE etd_id= ?',[key,key,etd],function(error,resul){
							if(error){
								console.log("File and Payment Error");
								// res.sendStatus(400);
							}
							else{
								res.status(200).send({"result0":results,"result1":result,"result2":resul});
							}
						});
					}
				});
			}	
		});
});

exports.default = router;
