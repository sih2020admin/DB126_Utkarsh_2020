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


exports.default = router;
