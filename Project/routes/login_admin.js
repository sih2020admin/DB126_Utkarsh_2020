"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var db_1 = __importDefault(require("./db"));
var router = express_1.default.Router();
var unirest = require('unirest');


router.post('/loginadmin', function (req, res) {

    console.log("login called"); 
    var username= req.body.username;
    var password= req.body.password;
			
	db_1.default.query('SELECT * FROM  log_in_details WHERE role_id= 1 and user_name = ?',[username], function (error, results, fields) {
     if (error) {
      console.log(error);
      res.status(404);
     }else{
       if(results.length >0){
          //User exists
          if(results[0].password == password){
             //Users password match
             
             	var aadharno;
             	var ad_id = results[0].vcd_id;

             	//fetch aadhar number
				db_1.default.query('SELECT * FROM `admin_detail` WHERE ad_id = 1; ',[ad_id], function (error, results, fields) {
				     if (error) {
				      console.log(error);
				      res.status(404);
				     }else{
				     		res.send(results[0]);
				     }
				     });


				
             
          }
	        else{
            //Users password do not match
            res.sendStatus(404);
          }
       }
       else{
         //User does not exist
         res.sendStatus(404);
       }
      }
    });



});



exports.default = router;
