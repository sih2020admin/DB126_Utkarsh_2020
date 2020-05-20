"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var db_1 = __importDefault(require("./db"));
var router = express_1.default.Router();

//Email
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
    },
});






router.post('/get_application', function (req, res) {  // to be call from see tender or apply tender

	var et_id = req.body.et_id;
	console.log("get applications called"+et_id)	

	//imp to mention where status = 111

	db_1.default.query('SELECT e.etd_id, e.et_id, e.vd_id, e.vcd_id, e.bidding_amt, e.is_approved, e.date_of_approval ,et.et_title,et.et_tender_fee,et.et_tender_ref_no,et.et_tender_desc,et.et_last_date_apply ,et.et_bidding_date ,et.et_file_uri, v.v_name, v.v_address, v.v_yoe, v.v_email, v.v_mobile, v.v_reg_no, v.v_state_id, v.v_dist_id, v.v_city_id, v.v_pincode, v.v_legal_id, v.v_pan, v.v_is_verified, v.v_gst ,vc.vcd_name,vc.vcd_title,vc.vcd_dob,vc.vcd_aadhar , vc.vcd_contact,vc.vcd_email,vc.vcd_email,vc.vcd_designation, f.furi_id, f.furi1,f.furi2, f.f_type , p.txn_id , p.order_id ,p.txn_amount , p.resp_message , p.resp_code,p.refund_amount , p.txn_timestamp , p.bank_txn_id , p.gateway_name , p.bank_name , p.payment_mode  FROM `e_tender_vendor` as e INNER JOIN e_tender_details as et ON et.et_id=e.et_id INNER JOIN `vendor_details` as v ON e.vd_id=v.vd_id INNER JOIN v_contact_details as vc ON e.vcd_id = vc.vcd_id INNER JOIN `file_uri` as f ON e.etd_id=f.etd_id INNER JOIN payment_transactions as p ON p.etd_id = e.etd_id WHERE et.et_id = ?', [et_id],function (error, results, fields) {
		if (error) {
	      		console.log("error",error);
	      		res.sendStatus(400);
	      		console.log("gettenderlist called0")	
	     	}
	     else{
	     	// console.log(results.length	,results)
	       		if(results.length >0){
					//console.log("gettenderlist called1")
					//console.log("results", results);
					//console.log("results vcd_id", results[0].vcd_id);
					file_status_digi(results);
		  			res.send(results);

       			}
       			else{
         			
         			console.log("gettenderlist called2")	
         			res.sendStatus(404);
       			}
      		}
    	});
});


router.post('/approve_tender_application', function (req, res) {  // to be call from see tender or apply tender

	var et_id = req.body.et_id;
	var etd_id = req.body.etd_id;
	console.log("approve applications called"+et_id+etd_id)	


	db_1.default.query('START TRANSACTION ; UPDATE `e_tender_details` SET `is_approved` = 1 WHERE et_id =  ?; UPDATE `e_tender_vendor` SET `is_approved` = 1, `date_of_approval`=CURRENT_DATE  WHERE etd_id =  ?; 	SELECT `vcd_contact`, `vcd_email` FROM `v_contact_details` WHERE vcd_id IN (SELECT `vcd_id`FROM `e_tender_vendor` WHERE etd_id=?);	 COMMIT;',
	 [et_id,etd_id,etd_id],function (error, results, fields) {
		if (error) {
	      		console.log("error",error);
	      		res.sendStatus(400);
	      		// console.log("gettenderlist called0")	
	     	}
	     else{
					 console.log("result ",results[3][0].vcd_email)
					//  console.log("result2 ",results[1])
					//  console.log("result3 ",results[3])	
					   var mailOptions = {
					    from: 'E-tender',
					    to: results[3][0].vcd_email ,
					    subject: 'Congratulations your tender has been approved',
					    text: 'Your application has been approved for tender no: ET00'+et_id+'. Your application ID is AP00'+etd_id+' . \nThank You.',
					}
					
					transporter.sendMail(mailOptions, function (error, info) {
					    if (error) {
					        console.log(error);
					        //res.sendStatus(400);
					    } else {
					        console.log('Email sent: ' + info.response);
					    }
					});
         			res.sendStatus(200);
       			
      		}
    	});
});


exports.default = router;















// SELECT e.etd_id, e.et_id, e.vd_id, e.vcd_id, e.bidding_amt, e.is_approved, e.date_of_approval ,et.et_title,et.et_tender_fee,et.et_tender_ref_no,et.et_tender_desc,et.et_last_date_apply ,et.et_bidding_date ,et.et_file_uri, v.v_name, v.v_address, v.v_yoe, v.v_email, v.v_mobile, v.v_reg_no, v.v_state_id, v.v_dist_id, v.v_city_id, v.v_pincode, v.v_legal_id, v.v_pan, v.v_is_verified, v.v_gst ,vc.vcd_name,vc.vcd_title,vc.vcd_dob,vc.vcd_aadhar , vc.vcd_contact,vc.vcd_email,vc.vcd_email,vc.vcd_designation, f.furi_id, f.furi1,f.furi2, f.f_type , p.txn_id , p.order_id ,p.txn_amount , p.resp_message , p.resp_code,p.refund_amount , p.txn_timestamp , p.bank_txn_id , p.gateway_name , p.bank_name , p.payment_mode  FROM `e_tender_vendor` as e INNER JOIN e_tender_details as et ON et.et_id=e.et_id INNER JOIN `vendor_details` as v ON e.vd_id=v.vd_id INNER JOIN v_contact_details as vc ON e.vcd_id = vc.vcd_id INNER JOIN `file_uri` as f ON e.etd_id=f.etd_id INNER JOIN payment_transactions as p ON p.etd_id = e.etd_id WHERE et.is_approved="1" and et.dept_id = ?


// SELECT e.etd_id, e.et_id, e.vd_id, e.vcd_id, e.bidding_amt, e.is_approved, e.date_of_approval , v.v_name, v.v_address, v.v_yoe, v.v_email, v.v_mobile, v.v_reg_no, v.v_state_id, v.v_dist_id, v.v_city_id, v.v_pincode, v.v_legal_id, v.v_pan, v.v_is_verified, v.v_gst ,  f.furi_id, f.furi, f.f_type FROM `e_tender_vendor` as e INNER JOIN `vendor_details` as v ON e.vd_id=v.vd_id INNER JOIN `file_uri` as f ON e.etd_id=f.etd_id WHERE et_id =  ?
// SELECT e.etd_id, e.et_id, e.vd_id, e.vcd_id, e.bidding_amt, e.is_approved, e.date_of_approval , v.v_name, v.v_address, v.v_yoe, v.v_email, v.v_mobile, v.v_reg_no, v.v_state_id, v.v_dist_id, v.v_city_id, v.v_pincode, v.v_legal_id, v.v_pan, v.v_is_verified, v.v_gst ,  f.furi_id, f.furi1,f.furi2, f.f_type FROM `e_tender_vendor` as e INNER JOIN `vendor_details` as v ON e.vd_id=v.vd_id INNER JOIN `file_uri` as f ON e.etd_id=f.etd_id WHERE et_id =  ? and e.status="1111"

/* -----------------------------Start of digilocker code-------------------------- */

//below fn checks if file exists in user digi or not
function file_status_digi(results) {
	var vcd_id_ = results[0].vcd_id;

	console.log("results", results);
	console.log("results vcd_id", results[0].vcd_id);

	results[0].tech_uri = "Sanket";
	results[0].boq_uri = "Deshmukh";

	var options = {
        method: 'POST',
		uri: 'http://192.168.42.176:8082/',
		body: {
			vcd_id: vcd_id_
		},
		json:true,
		headers: {
            'Content-Type': 'application/json',
        },
    };

    rp(options)
        .then(function (body) {
            console.log('Success');
        })
        .catch(function (err) {
            console.log('Failure', err);
        });
	// console.log("Hurray\n");
}

/* -----------------------------End of digilocker code-------------------------- */