	"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var db_1 = __importDefault(require("./db"));
var router = express_1.default.Router();
var unirest = require('unirest');


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
				
		});
});

exports.default = router;
