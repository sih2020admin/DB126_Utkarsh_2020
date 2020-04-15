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

    var ad_id= req.body.ad_id;
	// var vcd_id= req.body.vcd_id;
	console.log("vendor admin_dashboard called",ad_id)
				
	db_1.default.query('SELECT a.ad_name, a.ad_contact, a.ad_email, d.dept_name, a.ad_addr,  o.org_name, o.org_contact, o.org_email, o.org_addr , o.org_state ,o.org_pin FROM `admin_detail` as a INNER JOIN org_details as o ON a.ad_org_id = o.org_id INNER JOIN department as d ON a.ad_dept_id = d.dept_id WHERE ad_id =?; ',[ad_id], function (error, results, fields) {
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

    var dept_id= req.body.dept_id;
	// var vcd_id= req.body.vcd_id;
	console.log("vendor admin_approved _tenders called",dept_id)
				
	db_1.default.query('SELECT et.et_title, et.et_tender_ref_no, et.et_tender_desc, et.et_file_uri, et.is_approved,v.v_name, v.v_address , v.v_email , v.v_reg_no, v.v_pincode, v.v_pan , v.v_gst, v.v_is_verified , v.v_yoe, v.v_mobile ,e.etd_id, e.vcd_id, e.bidding_amt, e.is_approved, e.date_of_approval, e.status  FROM `e_tender_vendor` as e INNER JOIN vendor_details as v ON e.vd_id = v.vd_id INNER JOIN e_tender_details as et ON e.et_id = et.et_id WHERE e.is_approved=1 and et.dept_id = 1;',[dept_id], function (error, results, fields) {
		if (error) {
	      		console.log("error");
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
