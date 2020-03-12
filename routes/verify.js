var express = require('express');
var router = express.Router();
const assert = require('assert');





var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'softmandev123@gmail.com',
    pass: '#######'
  }
});


var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "viraj",
  password: "qwerty",
  database:"aadharDB"
});

function getRandomInt() {
  min = Math.ceil(100000);
  max = Math.floor(999999);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}


con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

router.post('/verify',(req,res,next)=>{

				console.log("verify called "+req.body.aadharno);
				var usrn= Number(req.body.aadharno);
    // 			var password = req.body.password;

    			con.query('Select * from aadhar_details where id= ?',[usrn],function(error,results,fields){
    				if (error) {
				      console.log(error);
				      console.log("error");
				      res.sendStatus(404);
				      
				     }
				     else{
				     	console.log(results, results.length)

				     	if(results.length > 0){

				     		console.log("number",results[0].phone_number," email",results[0].email)
					     	

					     	const otp= getRandomInt();

					     	



					  	// var mailOptions = {
							 // from: 'AADHAR UIDAI',
							 //   to: results[0].email,
							 //   subject: 'Aadhar Authentication OTP',
							 //   text: 'OTP for Your Aadhar Authentication is '+otp
							 // };

							 // transporter.sendMail(mailOptions, function(error, info){
							 //   if (error) {
							 //     console.log(error);
							 //   } else {
							 //     console.log('Email sent: ' + info.response);
							 //   }
							 // }); 



// session part
							// req.session.aadhar = req.body.aadharno;
							// req.session.otp = otp;	
							// console.log("session ",req.session.aadhar,req.session.otp); 
							// req.session.cookie.expires = new Date(Date.now() + 90000)
							// req.session.save();


							// database part
							var dt= new Date(Date.now()+90000);
							
							// dt.setSeconds( dt.getSeconds() + 90 );
							dt=dt.toISOString().slice(0, 19).replace('T', ' ')
							console.log(dt, new Date(Date.now()))
							con.query('REPLACE INTO OTP (aadharno ,otp ,validtill ) VALUES(?,?,?)',[usrn,otp,dt],function(error,results,fields){
    							if (error) {
				      				console.log("error: otp db ",error)
				      
							     }
							     else{
							     	console.log("session ",usrn,otp); 
							     	console.log("sucess otp db ")
							     }
							     	

			    			});




							res.status(200).send({
				               "phone number":results[0].phone_number
				               ,"email":results[0].email
				             });



					     }
					     else{
					     	console.log("error"); 
					     	res.sendStatus(404);
				           
					 	}

				     }

    			});

    			
			});
	
router.post('/verifyOTP',(req,res)=>{

				// con.query('DELETE FROM OTP WHERE validtill < NOW()',function(error,results,fields){
			 //    				if (error) {
				// 			      console.log("error: otp db in deleting",error)
							      
				// 			     }
				// 			     else{
				// 			     	console.log("sucess: time otp db in deleting")
							      

				// 			     }
				// 			     });

				console.log("verify OTP called :"+req.body.aadharno+"  req body otp: "+req.body.OTP);
				var usrn= Number(req.body.aadharno);

				con.query('Select * from OTP where aadharno= ?',[usrn],function(error,results,fields){
    				if (error) {
				      console.log("error: otp db ",error)
				      res.sendStatus(404);
				      
				     }
				     else{
				     	if(results.length > 0 && results[0].otp==req.body.OTP  ){

				     		// console.log("otp from db",results[0].otp,"\n dtae from db",Date(results[0].validtill),"\n dtae now", new Date(Date.now()))
				     		con.query('delete from OTP where aadharno= ?',[usrn],function(error,results,fields){
			    				if (error) {
							      console.log("error: otp db in deleting",error)
							      
							     }
							     else{

							     }
							     	

			    			});
				     		res.sendStatus(200);
				     	}else{
				     		res.sendStatus(404);
				     	}

				     }
				     	

    			});

			});

module.exports= router;
	
