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
	
				
	db_1.default.query('SELECT * FROM  e_tender_vendor WHERE et_id = ? and vd_id=?',[et_id,vd_id], function (error, results, fields) {
		if (error) {
	      		//console.log("error");
	      		res.sendStatus(400);
	     	}else{
	       		if(results.length >0){
	       			res.send(results[0]);
       			}
       			else{
         			//does not exists
         			res.sendStatus(404);
       			}
      		}
    	});
});

exports.default = router;
