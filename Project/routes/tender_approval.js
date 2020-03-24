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


	db_1.default.query('SELECT * FROM `e_tender_vendor` INNER JOIN `vendor_details` ON e_tender_vendor.vd_id=vendor_details.vd_id WHERE et_id =  ?',
	 [et_id],function (error, results, fields) {
		if (error) {
	      		console.log("error",error);
	      		res.sendStatus(400);
	      		// console.log("gettenderlist called0")	
	     	}
	     else{
	       		if(results.length >0){
	       			// console.log("gettenderlist called1")	
		  			res.send(results);

       			}
       			else{
         			
         			// console.log("gettenderlist called2")	
         			res.sendStatus(404);
       			}
      		}
    	});
});


router.post('/approve_tender_application', function (req, res) {  // to be call from see tender or apply tender

	var et_id = req.body.et_id;
	var etd_id = req.body.etd_id;
	console.log("approve applications called"+et_id+etd_id)	


	db_1.default.query('UPDATE `e_tender_vendor` SET `is_approved` = 1 WHERE etd_id =  ?',
	 [etd_id],function (error, results, fields) {
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