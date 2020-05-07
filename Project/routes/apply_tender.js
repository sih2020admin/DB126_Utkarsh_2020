	"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var db_1 = __importDefault(require("./db"));
var router = express_1.default.Router();
var unirest = require('unirest');


router.post('/apply_tender', function (req, res) {

    	var et_id= req.body.et_id;
    	var vd_id= req.body.vd_id;
    	var vcd_id= req.body.vcd_id;
    	var bid_amt= req.body.bid_amt;
    	console.log("apply tender desc called "+et_id)
	
				
	db_1.default.query('INSERT INTO `e_tender_vendor`(`et_id`, `vd_id`, `vcd_id`, `bidding_amt`) VALUES (?,?,?,?); 	 select LAST_INSERT_ID("etd_id");',[et_id,vd_id,vcd_id,bid_amt], function (error, results, fields) {
		if (error) {
	      		console.log("error",error);
	      		res.sendStatus(400);
	     	}else{
	       		if(results.length >0){
	       			console.log(results[0].insertId)
	       			res.send('{"etd_id":'+results[0].insertId+'}');
       			}
       			else{
         			//does not exists
         			res.sendStatus(400);
       			}
      		}
    	});
});






router.post('/apply_tender_s3', function (req, res) {

      var etd_id= req.body.etd_id;

      console.log("apply tender s3 called "+etd_id)
  
        
  db_1.default.query('UPDATE `e_tender_vendor` SET `status` = "111" WHERE `etd_id` = ?;',[etd_id], function (error, results, fields) {
    if (error) {
            console.log("error",error);
            res.sendStatus(400);
        }
    else{
            console.log(results)
              res.sendStatus(200);
        }
      });
});




router.post('/enter_file_uri1_db', function (req, res) {

      var etd_id= req.body.etd_id;
      var ftype= req.body.f_type;
      var furi= req.body.f_uri;

      console.log("enter file1 db tender s3 called "+etd_id)
  
        
  db_1.default.query('INSERT INTO `file_uri`(`furi1`, `etd_id`, `f_type`) VALUES (?,?,?)',[furi,etd_id,ftype], function (error, results, fields) {
    if (error) {
            console.log("error",error);
            res.sendStatus(400);
        }
    else{
            console.log(results)
              res.sendStatus(200);
        }
      });
});


router.post('/enter_file_uri2_db', function (req, res) {

      var etd_id= req.body.etd_id;
      var ftype= req.body.f_type;
      var furi= req.body.f_uri;

      console.log("enter file2 db tender s3 called "+etd_id)
  
        
  db_1.default.query('UPDATE `file_uri` SET `furi2` = ? WHERE etd_id = ? ',[furi,etd_id], function (error, results, fields) {
    if (error) {
            console.log("error",error);
            res.sendStatus(400);
        }
    else{
            console.log(results)
              res.sendStatus(200);
        }
      });
});





exports.default = router;
