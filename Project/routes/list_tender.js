"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var db_1 = __importDefault(require("./db"));
var router = express_1.default.Router();







router.post('/gettenderlist', function (req, res) {  // to be call from see tender or apply tender

	console.log("gettenderlist called")	
	

	db_1.default.query('SELECT `et_id`, `et_title`, `et_tender_fee`, `et_tender_ref_no`, `et_tender_desc`, `et_last_date_apply`, `et_bidding_date`, `et_file_uri`, `dept_name` FROM `e_tender_details` INNER JOIN department ON e_tender_details.dept_id = department.dept_id WHERE is_delete = 0 and e_tender_details.et_last_date_apply >= CURRENT_DATE', function (error, results, fields) {
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

// router.post('/gettenderlist_bid', function (req, res) {  // to be call from admin approve tender

// 	var dept_id = req.body.dept_id
// 	console.log("gettenderlist_bid called ",dept_id,req.body)	

// 	db_1.default.query('SELECT `et_id`, `et_title`, `et_tender_fee`, `et_tender_ref_no`, `et_tender_desc`, `et_last_date_apply`, `et_bidding_date`, `et_file_uri` FROM `e_tender_details` INNER JOIN department ON e_tender_details.dept_id = department.dept_id WHERE is_delete = 0 and e_tender_details.dept_id = ? and e_tender_details.et_bidding_date <= CURRENT_DATE and is_approved = 0',[dept_id], function (error, results, fields) {
// 		if (error) {
// 	      		console.log("error",error);
// 	      		res.sendStatus(400);
// 	      		// console.log("gettenderlist deptcalled0")	
// 	     	}
// 	     else{
// 	     		// console.log(results)
// 	       		if(results.length >0){
// 	       			// console.log("gettenderlist dept called1")	
// 		  			res.send(results);

//        			}
//        			else{
         			
//          			// console.log("gettenderlist  dept called2")	
//          			res.sendStatus(404);
//        			}
//       		}
//     	});
// });


router.post('/tender_dept', function (req, res) {  // to be call from admin crud page

	var dept_id = req.body.dept_id
	console.log("gettenderlist_dept called ",dept_id,req.body)	

	db_1.default.query('SELECT `et_id`, `et_title`, `et_tender_fee`, `et_tender_ref_no`, `et_tender_desc`, `et_last_date_apply`, `et_bidding_date`, `et_file_uri`, `is_approved`, `dept_name` FROM `e_tender_details` INNER JOIN department ON e_tender_details.dept_id = department.dept_id WHERE is_delete = 0 and e_tender_details.dept_id = ?  ',[dept_id], function (error, results, fields) {
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
         			res.sendStatus(404);
       			}
      		}
    	});
});



exports.default = router;