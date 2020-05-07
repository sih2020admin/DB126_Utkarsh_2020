var express = require('express');
var router = express.Router();
const assert = require('assert');

//MySql Connection
var mysql = require('mysql')
var con = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: "",
    database: 'aadharDB',
});
con.connect(function (err) {
    if (err){
	console.log("Not Connected To Mysql!!!");
    }
    console.log('Connected To Mysql !!!');
});

//Email
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
    },
});

//SMS
const accountSid = 'ACb6efbe87d9f5fca5440bbc802d064fe9'; 
const authToken = '4664d67664a57f3b6b6fd4055ed2f825'; 
const client = require('twilio')(accountSid, authToken); 

//OTP Generation
function getRandomInt() {
    min = Math.ceil(100000);
    max = Math.floor(999999);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

router.post('/verify',(req,res)=>{
    var usrn = Number(req.body.aadharno);
    console.log("verify called "+usrn);

    con.query('SELECT * FROM aadhar_details WHERE aadharno= ? ',[usrn],function (error,results){
        if (error) {
            console.log("error");
            res.sendStatus(400);
        } else {
            if (results.length > 0) {
                //console.log("number",results[0].phone_number," email",results[0].email);
                const otp = getRandomInt();
                
                //SMS sending
                var smsOptions = {
                    from: '+17622142266',       
                    to: '+91' + results[0].phone_number, 
                    body: 'Aadhar OTP  for Authentication is ' + otp + ' and is valid for 5 minutes.', 
                }
                client.messages.create(smsOptions,function(error,message){
                    if(error){
                        console.log("error");
                        res.sendStatus(400);
                    }else{
                        console.log("SMS sent:" + message.sid);
                    }
                });

                //Email sending
                var mailOptions = {
                    from: 'Aadhar UIDAI',
                    to: results[0].email,
                    subject: 'Aadhar Authentication OTP',
                    text: ' Aadhar OTP  for Authentication is ' + otp + ' and is valid for 5 minutes.',
                }
                //console.log(otp);
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });

                // Database part
                var dt = new Date(Date.now() + 300000);
                dt = dt.toISOString().slice(0, 19).replace('T', ' ');
                //console.log(dt, new Date(Date.now()))
                con.query('INSERT INTO `OTP` (`aadharno`, `otp`, `validtill`, `isUsed`, `reference_id`) VALUES (?,?,?, 0 , 1)', [usrn, otp, dt], function (error, results, fields) {
                    if (error) {
                        //console.log("error: otp db ",error);
                        res.sendStatus(400);
                    } else {
                        //console.log("session ",usrn,otp);
                        console.log('Aadhar OTP:', otp);
                        //console.log("sucess otp db ");
                        res.sendStatus(200);
                    }
                })
            } else {
                //console.log("error");
                res.sendStatus(400)
            }
        }
    })
})

router.post('/verifyOTP', (req, res) => {
    var usrn = Number(req.body.aadharno)
    var d = new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' ')
    //console.log("verify OTP called :"+req.body.aadharno+"  req body otp: "+req.body.OTP,d);

    con.query('Select validtill , otp , otpid from OTP where isused = 0 and aadharno= ? and validtill > ?', [usrn, d], function (error, results, fields) {
        if (error) {
            //console.log("error: otp db ",error)
            res.sendStatus(400)
        } else {
            var n = results.length - 1
            if (results.length > 0 && results[n].otp == req.body.OTP) {
                //console.log(Date.now(),'\n',	results[0].validtill,'\n' , Date.now() < Date(results[0].validtill))
                con.query('UPDATE OTP SET isUsed = "1" WHERE OTP.otpid = ? ', [results[n].otpid], function (error, results2, fields) {
                    if (error) {
                        //console.log("error: otp db ",error);
                    } else {
                        //console.log("updated");
                        res.sendStatus(200)
                    }
                })
            } else {
                res.sendStatus(400)
            }
        }
    })
})

router.get('/getCategories', function (req, res) {
    console.log('get categories')
    con.query('SELECT email,aadharno FROM aadhar_details', function (error, results) {
        if (error) throw error
        res.json(results)
    })
})
module.exports = router
