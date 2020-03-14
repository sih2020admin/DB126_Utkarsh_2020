var express = require('express');
var router = express.Router();
const assert = require('assert');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'softmandev123@gmail.com',
    pass: 'reverb254'
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

    			con.query('Select * from aadhar_details where aadharno= ?',[usrn],function(error,results,fields){
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




							// database part
							var dt= new Date(Date.now()+90000);
							
							dt=dt.toISOString().slice(0, 19).replace('T', ' ')
							console.log(dt, new Date(Date.now()))
							con.query('INSERT INTO `OTP` (`aadharno`, `otp`, `validtill`, `isUsed`, `reference_id`) VALUES (?,?,?, 0 , 1)',[usrn,otp,dt],function(error,results,fields){
    							if (error) {
				      				console.log("error: otp db ",error)
				      
							     }
							     else{
							     	console.log("session ",usrn,otp); 
							     	console.log("sucess otp db ")
							     }
							     	

			    			});


							res.sendStatus(200);

							// res.status(200).send({
				   //             "phone number":results[0].phone_number
				   //             ,"email":results[0].email
				   //           });



					     }
					     else{
					     	console.log("error"); 
					     	res.sendStatus(404);
				           
					 	}

				     }

    			});

    			
			});
	
router.post('/verifyOTP',(req,res)=>{

				var usrn= Number(req.body.aadharno);
				var d = new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' ');
				console.log("verify OTP called :"+req.body.aadharno+"  req body otp: "+req.body.OTP,d);


				con.query('Select validtill , otp , otpid from OTP where isused = 0 and aadharno= ? and validtill > ?',[usrn,d],function(error,results,fields){
    				if (error) {
				      console.log("error: otp db ",error)
				      res.sendStatus(404);
				      
				     }
				     else{
				     	console.log(results[0])
				     	if(results.length > 0 && results[0].otp==req.body.OTP  ){

				     		console.log(Date.now(),'\n',	results[0].validtill,'\n' , Date.now() < Date(results[0].validtill))
				     		
				     		con.query('UPDATE `OTP` SET `isUsed` = "1" WHERE `OTP`.`otpid` = ? ',[results[0].otpid],function(error,results2,fields){
								    				if (error) {
												      console.log("error: otp db ",error)
								
												      
												     }
												     else{
												    
												     console.log("updated")

												     }
												     	

								    			});





				     		res.sendStatus(200);

				     	}else{
				     		res.sendStatus(404);
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
	
