"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var db_1 = __importDefault(require("./db"));
var router = express_1.default.Router();







router.post('/get_application', function (req, res) {  // to be call from see tender or apply tender

	var et_id = req.body.et_id;
	console.log("get applications called"+et_id)	

	//imp to mention where status = 111

	db_1.default.query('SELECT e.etd_id, e.et_id, e.vd_id, e.vcd_id, e.bidding_amt, e.is_approved, e.date_of_approval , v.v_name, v.v_address, v.v_yoe, v.v_email, v.v_mobile, v.v_reg_no, v.v_state_id, v.v_dist_id, v.v_city_id, v.v_pincode, v.v_legal_id, v.v_pan, v.v_is_verified, v.v_gst ,  f.furi_id, f.furi1,f.furi2, f.f_type FROM `e_tender_vendor` as e INNER JOIN `vendor_details` as v ON e.vd_id=v.vd_id INNER JOIN `file_uri` as f ON e.etd_id=f.etd_id WHERE et_id =  ? and e.status="111"', 
		
	 [et_id],function (error, results, fields) {
		if (error) {
	      		console.log("error",error);
	      		res.sendStatus(400);
	      		console.log("gettenderlist called0")	
	     	}
	     else{
	     	// console.log(results.length	,results)
	       		if(results.length >0){
					   //console.log("gettenderlist called1")
					   //console.log(results)
		  			   res.send(results);

       			}
       			else{
         			
         			console.log("gettenderlist called2")	
         			res.sendStatus(404);
       			}
      		}
    	});
});


router.post('/approve_tender_application', function (req, res) {  // to be call from see tender or apply tender

	var et_id = req.body.et_id;
	var etd_id = req.body.etd_id;
	console.log("approve applications called"+et_id+etd_id)	


	db_1.default.query('START TRANSACTION ; UPDATE `e_tender_details` SET `is_approved` = 1 WHERE et_id =  ?; UPDATE `e_tender_vendor` SET `is_approved` = 1 WHERE etd_id =  ?; COMMIT;',
	 [et_id,etd_id],function (error, results, fields) {
		if (error) {
	      		console.log("error",error);
	      		res.sendStatus(400);
	      		// console.log("gettenderlist called0")	
	     	}
	     else{
         			// console.log("gettenderlist called2")	
         			res.sendStatus(200);
       			
      		}
    	});
});


exports.default = router;


















// SELECT e.etd_id, e.et_id, e.vd_id, e.vcd_id, e.bidding_amt, e.is_approved, e.date_of_approval , v.v_name, v.v_address, v.v_yoe, v.v_email, v.v_mobile, v.v_reg_no, v.v_state_id, v.v_dist_id, v.v_city_id, v.v_pincode, v.v_legal_id, v.v_pan, v.v_is_verified, v.v_gst ,  f.furi_id, f.furi, f.f_type FROM `e_tender_vendor` as e INNER JOIN `vendor_details` as v ON e.vd_id=v.vd_id INNER JOIN `file_uri` as f ON e.etd_id=f.etd_id WHERE et_id =  ?
