"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var db_1 = __importDefault(require("./db"));
var router = express_1.default.Router();







router.post('/gettenderlist', function (req, res) {

	console.log("gettenderlist called")	
	var td_date= new Date(Date.now())	

	db_1.default.query('SELECT * FROM `e_tender_details` INNER JOIN department ON e_tender_details.dept_id = department.dept_id WHERE is_delete = 0 and e_tender_details.et_last_date_apply >= CURRENT_DATE', function (error, results, fields) {
		if (error) {
	      		console.log("error",error);
	      		res.sendStatus(400);
	      		console.log("gettenderlist called0")	
	     	}
	     else{
	       		if(results.length >0){
	       			console.log("gettenderlist called1")	
		  			res.send(results);

       			}
       			else{
         			
         			console.log("gettenderlist called2")	
         			res.sendStatus(404);
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


router.post('/tender_dept', function (req, res) {

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



exports.default = router;