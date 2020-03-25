"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var db_1 = __importDefault(require("./db"));
var router = express_1.default.Router();







router.post('/create_tender', function (req, res) {

	console.log("craete tender called",req.body.et_title)	
	var et_title	 = req.body.et_title
	var et_tender_fee	 = req.body.et_tender_fee
	var et_tender_ref_no	 = req.body.et_tender_ref_no
	var et_tender_desc	 = req.body.et_tender_desc
	var et_last_date_apply	 = req.body.et_last_date_apply
	var et_bidding_date	 = req.body.et_bidding_date
	var et_file_uri	 = req.body.et_file_uri
	var dept_id	 = req.body.dept_id



	db_1.default.query('BEGIN TRANSACTION INSERT INTO `e_tender_details` ( `et_title`, `et_tender_fee`, `et_tender_ref_no`, `et_tender_desc`, `et_last_date_apply`, `et_bidding_date`, `et_file_uri`, `is_delete`, `dept_id`) VALUES ( ?, ?, ?,?,?,?, ?, 0, ?); COMMIT',[et_title ,et_tender_fee ,et_tender_ref_no ,et_tender_desc ,et_last_date_apply ,et_bidding_date ,et_file_uri ,dept_id] ,function (error, results, fields) {
		if (error) {
	      		console.log("error",error);
	      		if (error.code == "ER_DUP_ENTRY") {
	      			res.status(400)
	      			res.send("Duplicate entry")
	      		}
	      		else res.sendStatus(400);
	      		// console.log("gettenderlist called0")	
	     	}
	     else{
	       		res.sendStatus(200);
      		}
    	});
});




router.post('/update_tender', function (req, res) {

	console.log("update tender called",req.body.et_id)
	var et_id = req.body.et_id	
	var et_title	 = req.body.et_title
	var et_tender_fee	 = req.body.et_tender_fee
	var et_tender_ref_no	 = req.body.et_tender_ref_no
	var et_tender_desc	 = req.body.et_tender_desc
	var et_last_date_apply	 = req.body.et_last_date_apply
	var et_bidding_date	 = req.body.et_bidding_date
	var et_file_uri	 = req.body.et_file_uri



	db_1.default.query("UPDATE `e_tender_details` SET `et_title`= ? ,`et_tender_fee`= ? ,`et_tender_ref_no`= ?,`et_tender_desc`= ?,`et_last_date_apply`= ?,`et_bidding_date`= ? ,`et_file_uri`= ?  WHERE et_id = ? ;",[et_title ,et_tender_fee ,et_tender_ref_no ,et_tender_desc ,et_last_date_apply ,et_bidding_date ,et_file_uri ,et_id] ,function (error, results, fields) {
		if (error) {
	      		console.log("error",error);
	      		res.sendStatus(400);
	      		// console.log("gettenderlist called0")	
	     	}
	     else{
	       		res.sendStatus(200);
      		}
    	});
});

router.post('/delete_tender', function (req, res) {

	console.log("update tender called",req.body.et_id)
	var et_id = req.body.et_id	
	
	db_1.default.query("UPDATE `e_tender_details` SET `is_delete`= 1  WHERE et_id = ? ;",[et_id] ,function (error, results, fields) {
		if (error) {
	      		console.log("error",error);
	      		res.sendStatus(400);
	      		// console.log("gettenderlist called0")	
	     	}
	     else{
	       		res.sendStatus(200);
      		}
    	});
});





exports.default = router;
