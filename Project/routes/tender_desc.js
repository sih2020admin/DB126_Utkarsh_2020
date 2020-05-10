	"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var db_1 = __importDefault(require("./db"));
var router = express_1.default.Router();
var unirest = require('unirest');


<<<<<<< HEAD
router.post('/tender_desc', function (req, res) {

    	var id= req.body.et_id;
      var vcd_id= req.body.vcd_id;
      var vd_id= req.body.vd_id;
		console.log("tender desc called "+id)
	
				
	db_1.default.query('SELECT * FROM  e_tender_details INNER JOIN department ON e_tender_details.dept_id = department.dept_id WHERE et_id = ? ; SELECT  `vcd_name`, `vcd_title`, `vcd_dob`, `vcd_contact`, `vcd_email`, `vcd_designation` FROM `v_contact_details` WHERE vcd_id=?; SELECT `v_name`, `v_address`, `v_yoe`, `v_email`, `v_mobile`, `v_reg_no`, `v_state_id`, `v_dist_id`, `v_city_id`, `v_pincode`, `v_legal_id`, `v_pan`, `v_is_verified`, `v_gst` FROM `vendor_details` WHERE vd_id=?',[id,vcd_id,vd_id], function (error, results, fields) {
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


router.post('/filled_tender_desc', function (req, res) {

    	var et_id= req.body.et_id;
    	var etd_id= req.body.etd_id;
    	console.log("tender desc called "+etd_id) 
	
				
	db_1.default.query('SELECT * FROM  e_tender_details AS e INNER JOIN e_tender_vendor AS etv ON e.et_id = etv.et_id  WHERE etv.etd_id = ?',[etd_id], function (error, results, fields) {
		if (error) {
	      		//console.log("error");
	      		res.sendStatus(400);
	     	}else{
	       		if(results.length >0){
	       			res.send(results[0]);
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
    	var vd_id= req.body.vd_id;
    	console.log("tender desc called "+et_id)
	
=======
router.post('/view', function (req, res) {
		var et= req.body.et_id;
		var vd= req.body.vd_id;
		var etd= req.body.etd_id;
		db_1.default.query('SELECT et_id,et_title,et_tender_fee,et_tender_ref_no,et_bidding_date FROM  e_tender_details WHERE et_id = ?',[et],function(error,results){
			if (error) {
					console.log("Tender Details Error");
					// res.sendStatus(400);
			}else{
				db_1.default.query('SELECT * FROM (SELECT vendor_details.vd_id,vcd_name ,vcd_dob ,vcd_aadhar,vcd_contact,vcd_email,vcd_designation,v_name,v_address,v_yoe,v_email,v_mobile,v_reg_no,v_legal_id,v_pan,v_gst FROM v_contact_details,vendor_details WHERE v_contact_details.vd_id=vendor_details.vd_id) AS hello WHERE vd_id= ?',[vd],function(error,result){
					if(error){
						console.log("Personal and Company Details Error");
						// res.sendStatus(400);
					}
					else{
						db_1.default.query('SELECT * FROM (SELECT file_uri.etd_id,furi1,furi2,txn_id,txn_amount,txn_timestamp,bank_name ,resp_message FROM file_uri,payment_transactions WHERE file_uri.etd_id=payment_transactions.etd_id) AS hello WHERE etd_id= ?',[etd],function(error,resul){
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
>>>>>>> 67e885085f8df2f6749e37a2a57c6226510e6352
				
		});
});

exports.default = router;
