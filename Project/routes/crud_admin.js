"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var db_1 = __importDefault(require("./db"));
var router = express_1.default.Router();
var unirest = require('unirest');


router.post('/gettenderlist', function (req, res) {

	console.log("gettenderlist called")	
	var td_date= new Date(Date.now())	

	db_1.default.query('SELECT * FROM `e_tender_details` INNER JOIN department ON e_tender_details.dept_id = department.dept_id WHERE is_delete = 0 and e_tender_details.et_last_date_apply >= CURRENT_DATE', function (error, results, fields) {
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
         			res.sendStatus(400);
       			}
      		}
    	});
});



router.post('/gettenderlist_dept', function (req, res) {

	var dept_id = req.body.dept_id
	console.log("gettenderlist_dept called ",dept_id,req.body)	

	db_1.default.query('SELECT * FROM `e_tender_details` INNER JOIN department ON e_tender_details.dept_id = department.dept_id WHERE is_delete = 0 and e_tender_details.dept_id = ?  ',[dept_id], function (error, results, fields) {
		if (error) {
	      		console.log("error",error);
	      		res.sendStatus(400);
	      		// console.log("gettenderlist deptcalled0")	
	     	}
	     else{
	     		// console.log(results)
	       		if(results.length >0){
	       			// console.log("gettenderlist dept called1")	
		  			res.send(results);

       			}
       			else{
         			
         			// console.log("gettenderlist  dept called2")	
         			res.sendStatus(400);
       			}
      		}
    	});
});

router.post('/gettenderlist_bid', function (req, res) {

	var dept_id = req.body.dept_id
	console.log("gettenderlist_dept called ",dept_id,req.body)	

	db_1.default.query('SELECT * FROM `e_tender_details` INNER JOIN department ON e_tender_details.dept_id = department.dept_id WHERE is_delete = 0 and e_tender_details.dept_id = ? and e_tender_details.et_bidding_date <= CURRENT_DATE',[dept_id], function (error, results, fields) {
		if (error) {
	      		console.log("error",error);
	      		res.sendStatus(400);
	      		// console.log("gettenderlist deptcalled0")	
	     	}
	     else{
	     		// console.log(results)
	       		if(results.length >0){
	       			// console.log("gettenderlist dept called1")	
		  			res.send(results);

       			}
       			else{
         			
         			// console.log("gettenderlist  dept called2")	
         			res.sendStatus(400);
       			}
      		}
    	});
});


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



	db_1.default.query('INSERT INTO `e_tender_details` ( `et_title`, `et_tender_fee`, `et_tender_ref_no`, `et_tender_desc`, `et_last_date_apply`, `et_bidding_date`, `et_file_uri`, `is_delete`, `dept_id`) VALUES ( ?, ?, ?,?,?,?, ?, 0, ?);',[et_title ,et_tender_fee ,et_tender_ref_no ,et_tender_desc ,et_last_date_apply ,et_bidding_date ,et_file_uri ,dept_id] ,function (error, results, fields) {
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

	console.log("update tender called",req.body.et_title)
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
