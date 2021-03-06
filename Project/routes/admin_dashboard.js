"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var db_1 = __importDefault(require("./db"));
var router = express_1.default.Router();
var unirest = require('unirest');


router.post('/admin_dashboard', function (req, res) {

	// var ad_id= req.body.ad_id;
	var ad_id = req.signedCookies.ad_id_e;
    // var dept_id = req.signedCookies.ad_dept_id_e;
    // var ad_org_id = req.signedCookies.ad_org_id_e;
	// var vcd_id= req.body.vcd_id;
	console.log("admin_dashboard called",ad_id)
				
	db_1.default.query('SELECT a.ad_name,a.ad_contact, a.ad_email, a.ad_addr, o.org_name, o.org_contact , o.org_email , o.org_addr, o.org_state , o.org_dist ,o.org_pin ,d.dept_name FROM `admin_detail` as a INNER JOIN org_details as o ON a.ad_dept_id = o.org_id INNER JOIN department as d ON a.ad_dept_id=d.dept_id WHERE ad_id =?',[ad_id], function (error, results, fields) {
		if (error) {
	      		console.log("error");
	      		res.status(400);
	     	}else{
	     		console.log(results[0])
	       		if(results.length >0 ){
		  		 res.send(results[0]);
       			}
       			else{
         			//User does not exist
         			res.sendStatus(404);
       			}
      		}
    	});
});


router.post('/approved_tenders', function (req, res) {

	// var dept_id= req.body.dept_id;
	// var ad_id = req.signedCookies.ad_id_e;
    var dept_id = req.signedCookies.ad_dept_id_e;
    // var ad_org_id = req.signedCookies.ad_org_id_e;
	// var vcd_id= req.body.vcd_id;
	console.log("admin_approved _tenders called",dept_id)
				
	db_1.default.query('SELECT e.etd_id, e.et_id, e.vd_id, e.vcd_id, e.bidding_amt, e.is_approved, e.date_of_approval ,et.et_title,et.et_tender_fee,et.et_tender_ref_no,et.et_tender_desc,et.et_last_date_apply ,et.et_bidding_date ,et.et_file_uri, v.v_name, v.v_address, v.v_yoe, v.v_email, v.v_mobile, v.v_reg_no, v.v_state_id, v.v_dist_id, v.v_city_id, v.v_pincode, v.v_legal_id, v.v_pan, v.v_is_verified, v.v_gst ,vc.vcd_name,vc.vcd_title,vc.vcd_dob,vc.vcd_aadhar , vc.vcd_contact,vc.vcd_email,vc.vcd_email,vc.vcd_designation, f.furi_id, f.furi1,f.furi2, f.f_type , p.txn_id , p.order_id ,p.txn_amount , p.resp_message , p.resp_code,p.refund_amount , p.txn_timestamp , p.bank_txn_id , p.gateway_name , p.bank_name , p.payment_mode  FROM `e_tender_vendor` as e INNER JOIN e_tender_details as et ON et.et_id=e.et_id INNER JOIN `vendor_details` as v ON e.vd_id=v.vd_id INNER JOIN v_contact_details as vc ON e.vcd_id = vc.vcd_id INNER JOIN `file_uri` as f ON e.etd_id=f.etd_id INNER JOIN payment_transactions as p ON p.etd_id = e.etd_id WHERE et.is_approved="1" and et.dept_id = ?',[dept_id], function (error, results, fields) {
		if (error) {
	      		console.log("error",error);
	      		res.status(400);
	     	}else{
	       		if(results.length >0 ){
		  		 res.send(results);
       			}
       			else{
         			//User does not exist
         			res.sendStatus(404);
       			}
      		}
    	});
});


exports.default = router;
