var express = require('express');
var router = express.Router();
const assert = require('assert');

//MySql Connection
var mysql = require('mysql');
var con = mysql.createConnection({
  	host: "localhost",
  	user: "viraj",
  	password: "qwerty",
  	database:"aadharDB"
});
con.connect(function(err) {
  	if (err) throw err;
  	console.log("Connected!");
});

//Email
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
	service: 'gmail',
  	auth: {
    		user: 'generixteam2019@gmail.com',
    		pass: 'Lifeisgud'
  	}
});


function getRandomInt() {
  	min = Math.ceil(100000);
  	max = Math.floor(999999);
  	return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

router.post('/verify',(req,res,next)=>{

	var usrn= Number(req.body.aadharno);
	con.query('Select * from aadhar_details where aadharno= ?',[usrn],function(error,results,fields){
		if (error) {
		      //console.log("error");
		      res.sendStatus(400);
		}
	     	else{
			if(results.length > 0){
				//console.log("number",results[0].phone_number," email",results[0].email)
				const otp= getRandomInt();

				 var mailOptions = {
					from: 'generixteam2019@gmail.com',
					to: results[0].email,
				    	subject: 'Aadhar Authentication OTP',
				    	text: ' Aadhar OTP  for authentication is '+ otp
				};
				transporter.sendMail(mailOptions, function(error, info){
					if (error) {
					      console.log(error);
					} else {
					      console.log('Email sent: ' + info.response);
				    	}
				 }); 

				// database part
				var dt= new Date(Date.now()+90000);
				dt=dt.toISOString().slice(0, 19).replace('T', ' ')
				//console.log(dt, new Date(Date.now()))
				con.query('INSERT INTO `OTP` (`aadharno`, `otp`, `validtill`, `isUsed`, `reference_id`) VALUES (?,?,?, 0 , 1)',[usrn,otp,dt],function(error,results,fields){
					if (error) {
				      		//console.log("error: otp db ",error);
						res.sendStatus(400);
				      	}else{
			     			//console.log("session ",usrn,otp);
						console.log("Aadhar OTP:",otp);  
			     			//console.log("sucess otp db ");
						res.sendStatus(200);
				     	}
				});
		     	}
			else{
			     	//console.log("error"); 
			     	res.sendStatus(400);
		           }
		}
	});
});
	
router.post('/verifyOTP',(req,res)=>{

	var usrn= Number(req.body.aadharno);
	var d = new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' ');
	//console.log("verify OTP called :"+req.body.aadharno+"  req body otp: "+req.body.OTP,d);

	con.query('Select validtill , otp , otpid from OTP where isused = 0 and aadharno= ? and validtill > ?',[usrn,d],function(error,results,fields){
		if (error) {
		      //console.log("error: otp db ",error)
		      res.sendStatus(400);
		 }
		 else{
		 		var n =results.length-1;
		     	if(results.length > 0 && results[n].otp==req.body.OTP  ){
				//console.log(Date.now(),'\n',	results[0].validtill,'\n' , Date.now() < Date(results[0].validtill))
		     		con.query('UPDATE OTP SET isUsed = "1" WHERE OTP.otpid = ? ',[results[n].otpid],function(error,results2,fields){
	    				if (error) {
						//console.log("error: otp db ",error);
					}else{
					    	//console.log("updated");
						res.sendStatus(200);
					}
			     	});
			}else{
				res.sendStatus(400);
			}
		}
				     	

	});

});


router.get('/getCategories', function (req, res) {
	console.log("get categories")
	con.query('SELECT email,aadharno FROM aadhar_details', function (error, results) {
		if (error) throw error;
		res.json(results);
  	});
});

module.exports= router;





// INSERT INTO `OTP` (`otpid`, `aadharno`, `otp`, `validtill`, `isUsed`, `reference_id`) VALUES ('1', '123412341234', '456123', '2020-03-12 09:22:19', '0', '4') 

// 
	
