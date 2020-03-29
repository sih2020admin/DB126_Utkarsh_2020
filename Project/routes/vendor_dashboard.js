"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var db_1 = __importDefault(require("./db"));
var router = express_1.default.Router();
var unirest = require('unirest');


router.post('/vendor_dashboard', function (req, res) {

    var vd_id= req.body.vd_id;
	var vcd_id= req.body.vcd_id;
	console.log("vendor vendor_dashboard called",vd_id,vcd_id)
				
	db_1.default.query('SELECT `v_name`, `v_address`, `v_yoe`, `v_email`, `v_mobile`, `v_reg_no`, `v_state_id`, `v_city_id`, `v_pincode`, `v_legal_id`, `v_pan`, `v_is_verified`, `v_gst` FROM vendor_details WHERE vd_id = ?; SELECT `vcd_name`, `vcd_title`, `vcd_dob`, `vcd_aadhar`, `vcd_contact`, `vcd_email`, `vcd_designation` FROM v_contact_details WHERE vcd_id = ? and vd_id = ?; SELECT e_tender_details.et_id, `et_title`, `et_tender_fee`, `et_tender_ref_no`, `et_tender_desc`, `et_last_date_apply`, `et_bidding_date`, `et_file_uri`, `dept_id`, e_tender_vendor.bidding_amt FROM `e_tender_details` INNER JOIN e_tender_vendor ON e_tender_details.et_id = e_tender_vendor.et_id WHERE e_tender_vendor.vd_id = ? and e_tender_vendor.vcd_id = ?; SELECT e_tender_details.et_id, `et_title`, `et_tender_fee`, `et_tender_ref_no`, `et_tender_desc`, `et_last_date_apply`, `et_bidding_date`, `et_file_uri`, `dept_id`, e_tender_vendor.bidding_amt FROM `e_tender_details` INNER JOIN e_tender_vendor ON e_tender_details.et_id = e_tender_vendor.et_id WHERE e_tender_vendor.vd_id = ? and e_tender_vendor.vcd_id = ? and e_tender_vendor.is_approved =1; ',[vd_id,vcd_id,vd_id,vd_id,vcd_id,vd_id,vcd_id], function (error, results, fields) {
		if (error) {
	      		//console.log("error");
	      		res.status(400);
	     	}else{
	       		if(results[0].length >0 && results[1].length >0){
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
