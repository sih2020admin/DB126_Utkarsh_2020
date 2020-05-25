	"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
// var data_structure_1 = require("./data-structure");
var db_1 = __importDefault(require("./db"));
var router = express_1.default.Router();
var unirest = require('unirest');

//Email
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
    },
});


router.post('/apply_tender', function (req, res) {

    	var et_id= req.body.et_id;
    	// var vd_id= req.body.vd_id;
    	// var vcd_id= req.body.vcd_id;
      var bid_amt= req.body.bid_amt;
      var vd_id = req.signedCookies.vd_id_e;
      var vcd_id = req.signedCookies.vcd_id_e;
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

router.post('/apply_tender_s3', function (req, res) {

      var etd_id= req.body.etd_id;

      console.log("apply tender s3 called "+etd_id)
  
        
  db_1.default.query('UPDATE `e_tender_vendor` SET `status` = "111" WHERE `etd_id` = ?;',[etd_id], function (error, results, fields) {
    if (error) {
            console.log("error",error);
            res.sendStatus(400);
        }
    else{
            console.log(results)
              res.sendStatus(200);
        }
      });
});

router.post('/confirm_tender_s5', function (req, res) {

  var etd_id= req.body.etd_id;

  console.log("confirm tender called "+etd_id)

    
db_1.default.query('UPDATE `e_tender_vendor` SET `status` = "1111" WHERE `etd_id` = ?;',[etd_id], function (error, results, fields) {
if (error) {
        console.log("error",error);
        res.sendStatus(400);
    }
else{
        console.log(results)
        //   var mailOptions = {
          //     from: 'E-tender',
          //     to: ,
          //     subject: 'Confirmation Of Your Application to tender',
          //     text: 'Your application has been sucesfully submitted. Your application ID is AP00'+etd_id+' . \nThank You.',
          // }
        
          // transporter.sendMail(mailOptions, function (error, info) {
          //     if (error) {
          //         console.log(error);
          //         //res.sendStatus(400);
          //     } else {
          //         console.log('Email sent: ' + info.response);
          //     }
          // });
          res.sendStatus(200);
    }
  });
});




router.post('/enter_file_uri1_db', function (req, res) {

      var etd_id= req.body.etd_id;
      var ftype= req.body.f_type;
      var furi= req.body.f_uri;

      console.log("enter file1 db tender s3 called "+etd_id)
  
        
  db_1.default.query('INSERT INTO `file_uri`(`furi1`, `etd_id`, `f_type`) VALUES (?,?,?)',[furi,etd_id,ftype], function (error, results, fields) {
    if (error) {
            console.log("error",error);
            res.sendStatus(400);
        }
    else{
            console.log(results)
              res.sendStatus(200);
        }
      });
});


router.post('/enter_file_uri2_db', function (req, res) {

      var etd_id= req.body.etd_id;
      var ftype= req.body.f_type;
      var furi= req.body.f_uri;

      console.log("enter file2 db tender s3 called "+etd_id)
  
        
  db_1.default.query('UPDATE `file_uri` SET `furi2` = ? WHERE etd_id = ? ',[furi,etd_id], function (error, results, fields) {
    if (error) {
            console.log("error",error);
            res.sendStatus(400);
        }
    else{
            console.log(results)
              res.sendStatus(200);
        }
      });
});





router.post('/preview_pdf', function (req, res) {

  
  console.log("prview pdf called ",req.body.result0[0].et_tender_ref_no)
var et_ref = req.body.result0[0].et_tender_ref_no;
var title = req.body.result0[0].et_title;    
var fee = req.body.result0[0].et_tender_fee;
var bid_date = req.body.result0[0].et_bidding_date;
var vcd_name = req.body.result1[0].vcd_name;     
var vcd_dob = req.body.result1[0].vcd_dob;      
var vcd_designation = req.body.result1[0].vcd_designation;
var vcd_aadhar = req.body.result1[0].vcd_aadhar;   
var vcd_email = req.body.result1[0].vcd_email;    
var vcd_contact = req.body.result1[0].vcd_contact;  
var v_name = req.body.result1[0].v_name;
var v_legal_id = req.body.result1[0].v_legal_id;
var v_yoe = req.body.result1[0].v_yoe;
var v_reg_no = req.body.result1[0].v_reg_no;
var v_gst = req.body.result1[0].v_gst;
var v_pan = req.body.result1[0].v_pan;
var v_email = req.body.result1[0].v_email;
var v_mobile = req.body.result1[0].v_mobile; 
var v_address = req.body.result1[0].v_address;
var furi1 = req.body.result2[0].furi1;
var furi2 = req.body.result2[0].furi2;    
var txn_id = req.body.result2[0].txn_id;
var txn_amount = req.body.result2[0].txn_amount; 
var txn_timestamp = req.body.result2[0].txn_timestamp;
var bank_name = req.body.result2[0].bank_name;   
var resp_message    = req.body.result2[0].resp_message;


    

    
  res.sendStatus(200);  
});




exports.default = router;
