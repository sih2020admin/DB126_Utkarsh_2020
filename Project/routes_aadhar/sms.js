var express = require('express');
var router = express.Router();
const assert = require('assert');

//MySql Connection
var mysql = require('mysql')
var con = mysql.createConnection({
    host: 'localhost',
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: 'aadharDB',
});
con.connect(function (err) {
    if (err){
	console.log("Not Connected To Mysql!!!");
    }
    console.log('Connected To Mysql !!!');
});



//SMS
const accountSid = process.env.SID;
const authToken = process.env.AUTH_TOKEN;
console.log(accountSid,authToken)
const client = require('twilio')(accountSid, authToken); 

//OTP Generation
function getRandomInt() {
    min = Math.ceil(100000);
    max = Math.floor(999999);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

router.post('/send',(req,res)=>{
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
                    body: 'Aadhar OTP  for E-signing is ' + otp + ' and is valid for 5 minutes.', 
                }
                client.messages.create(smsOptions,function(error,message){
                    if(error){
                        console.log("SMS Error");
                        //res.sendStatus(400);
                    }else{
                        console.log("SMS sent:" + message.sid);
                    }
                });

                // Database part
                var dt = new Date(Date.now() + 300000);
                dt = dt.toISOString().slice(0, 19).replace('T', ' ');
                //console.log(dt, new Date(Date.now()))
                con.query('INSERT INTO `OTP` (`aadharno`, `otp`, `validtill`, `isUsed`, `reference_id`) VALUES (?,?,?, 0 , 2)', [usrn, otp, dt], function (error, results, fields) {
                    if (error) {
                        //console.log("error: otp db ",error);
                        res.sendStatus(400);
                    } else {
                        //console.log("session ",usrn,otp);
                        console.log('Aadhar OTP:', otp);
                        //console.log("sucess otp db ");
                        res.sendStatus(200);
                    }
                });
            } else {
                //console.log("error");
                res.sendStatus(400);
            }
        }
    });
});



module.exports = router
