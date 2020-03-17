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
	
				
	db_1.default.query('SELECT * FROM  e_tender_details WHERE et_id = ?',[id], function (error, results, fields) {
		if (error) {
	      		//console.log("error");
	      		res.status(400);
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


exports.default = router;
