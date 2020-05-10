"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var db_1 = __importDefault(require("./db"));
var router = express_1.default.Router();
var unirest = require('unirest');


router.get('/',function (req ,res) {
	// body...
	res.redirect('/v7_homepage.html');
});




router.post('/login', function (req, res) {

        var username= req.body.username;
	var password= req.body.password;
	console.log("login called",username)			
	db_1.default.query('SELECT * FROM  log_in_details WHERE role_id=2 and user_name = ?;',[username], function (error, results, fields) {
		if (error) {
	      		//console.log("error");
	      		res.status(400);
	     	}else{
	       		if(results.length >0){
		  		if(results[0].password == password){
					//password  matched
		     			var aadharno;
					//console.log(results[0].vcd_id);
		     			var vcd_id = results[0].vcd_id;
					
		     			//fetch aadhar number
					db_1.default.query('SELECT vcd_aadhar,vd_id ,digi_access FROM  v_contact_details WHERE vcd_id = ?;',[vcd_id], function (error, results, fields) {
						if (error) {
					      		//console.log(error);
					      		res.status(400);
				     		}else{
				     			aadharno= results[0].vcd_aadhar;
				     			var vd_id = results[0].vd_id;
				     			var digi_access =results[0].digi_access
				     			//console.log("fetched "+aadharno);

					     		//send to aadhar api
					     		var req = unirest('POST', 'http://'+process.env.ADDRESS+':8082/verify').headers({'Content-Type': 'application/json'})
									.send(JSON.stringify({"aadharno":aadharno})).end(function (resp) { 
									  	if (resp.error){
											throw new Error(resp.error); 
									    		res.sendStatus(400); 
										}
										//console.log(resp.raw_body);	
									    	res.status(200).send({"aadhar":aadharno,"vd_id":vd_id,"vcd_id":vcd_id,"digi_access":digi_access});
									  });
					     }
					});


				}
	        		else{
            				//Users password do not match
            				res.sendStatus(400);
          			}
       			}
       			else{
         			//User does not exist
         			res.sendStatus(400);
       			}
      		}
    	});
});

router.post('/login/admin', function (req, res) {
	var username= req.body.username;
    var password= req.body.password;
	console.log("admin login called",username)	

	db_1.default.query('SELECT * FROM  log_in_details WHERE role_id= 1 and user_name = ?',[username], function (error, results, fields) {
     	if (error) {
      		res.status(400);
     	}else{
       		if(results.length >0){
          		//User exists
          		if(results[0].password == password){
					//Users password match
					var ad_id = results[0].ad_id;

					//fetch aadhar number
					db_1.default.query('SELECT ad_id,ad_dept_id, ad_org_id FROM `admin_detail` WHERE ad_id = ?; ',[ad_id], function (error, results, fields) {
						if (error) {
							res.status(400);
						}else{
							res.send(results[0]);
						}
					});
          		}
				else{
					//Users password do not match
					res.sendStatus(400);
				}	
       		}
			else{
				//User does not exist
				res.sendStatus(400);
			}
    	}	
	});
});

exports.default = router;
