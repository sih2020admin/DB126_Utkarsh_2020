"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var db_1 = __importDefault(require("./db"));
var router = express_1.default.Router();
var unirest = require('unirest');


router.post('/login', function (req, res) {

    console.log("login called"); 
    var username= req.body.username;
    var password= req.body.password;
			
	db_1.default.query('SELECT * FROM  log_in_details WHERE user_name = ?',[username], function (error, results, fields) {
     if (error) {
      console.log(error);
      res.status(404);
     }else{
       if(results.length >0){
          //User exists
          if(results[0].password == password){
             //Users password match
             
             	var aadharno;
             	var vcd = results[0].v_id;

             	//fetch aadhar number
				db_1.default.query('SELECT vcd_aadhar FROM  v_contact_details WHERE vcd_id = ?',[vcd], function (error, results, fields) {
				     if (error) {
				      console.log(error);
				      res.status(404);
				     }else{
				     		aadharno= results[0].vcd_aadhar
				     		console.log("fetched "+aadharno);

				     		//send to aadhar api
				     		var req = unirest('POST', 'http://localhost:8082/verify')
								  .headers({
								    'Content-Type': 'application/json'
								  })
								  .send(JSON.stringify({"aadharno":aadharno}))
								  .end(function (resp) { 
								    if (res.error) 
								    	{throw new Error(resp.error);
								    	res.sendStatus(404); }

								    console.log(res.raw_body);
								    res.send(results[0]);
								  });
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
