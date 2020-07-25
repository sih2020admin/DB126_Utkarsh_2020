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

var key=process.env["ENCRYPTION_KEY"];


router.post('/gettenderlist_bid', function (req, res) {  // to be call from admin approve tender

	// var dept_id = req.body.dept_id
	var dept_id = req.signedCookies.ad_dept_id_e;

	console.log("gettenderlist_bid called ",dept_id,req.body)	

	db_1.default.query('SELECT `et_id`, `et_title`, `et_tender_fee`, `et_tender_ref_no`, `et_tender_desc`, `et_last_date_apply`, `et_bidding_date`, `et_file_uri` FROM `e_tender_details` INNER JOIN department ON e_tender_details.dept_id = department.dept_id WHERE is_delete = 0 and e_tender_details.dept_id = ? and e_tender_details.et_bidding_date <= CURRENT_DATE and (is_approved = 0 or is_approved = 1 or is_approved = 2) ',[dept_id], function (error, results, fields) {
		if (error) {
	      		console.log("error",error);
	      		res.sendStatus(400);
	      		// console.log("gettenderlist deptcalled0")	
	     	}
	     else{
	     		// console.log(results)
	       		if(results.length >0){
	       			// console.log("gettenderlist dept called1")	
		  			res.send(results);

       			}
       			else{
         			
         			// console.log("gettenderlist  dept called2")	
         			res.sendStatus(404);
       			}
      		}
    	});
});



// 'SELECT et_id,et_title,et_tender_fee,et_tender_ref_no,et_bidding_date FROM  e_tender_details WHERE et_id = '" + request.query['et_id'] + "';\n                                            SELECT * FROM (SELECT vendor_details.vd_id,vcd_name ,vcd_dob ,vcd_aadhar,vcd_contact,vcd_email,vcd_designation,v_name,v_address,v_yoe,v_email,v_mobile,v_reg_no,v_legal_id,v_pan,v_gst FROM v_contact_details,vendor_details WHERE v_contact_details.vd_id=vendor_details.vd_id) AS hello WHERE vd_id= '" + request.signedCookies['vd_id_e'] + "';\n                                            SELECT * FROM (SELECT file_uri.etd_id,furi1,furi2,txn_id,txn_amount,txn_timestamp,bank_name ,resp_message FROM file_uri,payment_transactions WHERE file_uri.etd_id=payment_transactions.etd_id) AS hello WHERE etd_id= '" + request.query['etd_id'] + "';\n                                            SELECT bidding_amt,location,timestamp from e_tender_vendor WHERE vd_id='" + request.signedCookies['vd_id_e'] + "' and vcd_id='" + request.signedCookies['vcd_id_e'] + "'and etd_id='" + request.query['etd_id'] + "' and et_id='" + request.query['et_id'] + "'"

router.post('/get_application2', function (req, res) {  // to be call from see tender or apply tender

	var et_id = req.body.et_id;
	console.log("get applications called" + et_id)

	//imp to mention where status = 111

	db_1.default.query(`SELECT e.etd_id, e.et_id, e.vd_id, e.vcd_id, cast( AES_DECRYPT(e.bidding_amt ,'${key}') as char ) as  bidding_amt, cast( AES_DECRYPT(e.is_approved ,'${key}') as char ) as  is_approved, e.date_of_approval ,et.et_title,et.et_tender_fee,et.et_tender_ref_no,et.et_tender_desc,et.et_last_date_apply ,et.et_bidding_date ,et.et_file_uri, v.v_name, v.v_address, v.v_yoe, v.v_email, v.v_mobile, v.v_reg_no, v.v_state_id, v.v_dist_id, v.v_city_id, v.v_pincode, v.v_legal_id, v.v_pan, v.v_is_verified, v.v_gst ,vc.vcd_name,vc.vcd_title,vc.vcd_dob,vc.vcd_aadhar , vc.vcd_contact,vc.vcd_email,vc.vcd_email,vc.vcd_designation, f.furi_id, cast( AES_DECRYPT(f.furi1 ,'${key}') as char ) as furi1,cast( AES_DECRYPT(f.furi2 ,'${key}') as char ) as furi2, f.f_type , p.txn_id , p.order_id ,p.txn_amount , p.resp_message , p.resp_code,p.refund_amount , p.txn_timestamp , p.bank_txn_id , p.gateway_name , p.bank_name , p.payment_mode  FROM e_tender_vendor as e INNER JOIN e_tender_details as et ON et.et_id=e.et_id INNER JOIN vendor_details as v ON e.vd_id=v.vd_id INNER JOIN v_contact_details as vc ON e.vcd_id = vc.vcd_id INNER JOIN file_uri as f ON e.etd_id=f.etd_id INNER JOIN payment_transactions as p ON p.etd_id = e.etd_id WHERE et.et_id = ? and e.status=AES_ENCRYPT("1111",'${key}');`, [et_id], function (error, results, fields) {
		if (error) {
			console.log("error", error);
			res.sendStatus(400);
			console.log("gettenderlist called0")
		}
		else {
			// console.log(results.length	,results)
			if (results.length > 0) {
				//console.log("gettenderlist called1")
				//console.log("results", results);
				//console.log("results vcd_id", results[0].vcd_id);
				file_status_digi(0, results, res);
				// res.send(results);

			}
			else {

				console.log("gettenderlist called2")
				res.sendStatus(404);
			}
		}
	});
});


router.post('/approve_tender_application', function (req, res) {  // to be call from see tender or apply tender

	var et_id = req.body.et_id;
	var etd_id = req.body.etd_id;
	var key=process.env["ENCRYPTION_KEY"];
	console.log("approve applications called" + et_id + etd_id)


	db_1.default.query('START TRANSACTION ; UPDATE `e_tender_details` SET `is_approved` = 1 WHERE et_id =  ?; UPDATE `e_tender_vendor` SET `is_approved` = AES_ENCRYPT("1",?), `date_of_approval`=CURRENT_DATE  WHERE etd_id =  ?; 	SELECT `vcd_contact`, `vcd_email` FROM `v_contact_details` WHERE vcd_id IN (SELECT `vcd_id`FROM `e_tender_vendor` WHERE etd_id=?);	 COMMIT;',
		[et_id,key, etd_id, etd_id], function (error, results, fields) {
			if (error) {
				console.log("error", error);
				res.sendStatus(400);
				// console.log("gettenderlist called0")	
			}
			else {
				console.log("result ", results[3][0].vcd_email)
				//  console.log("result2 ",results[1])
				//  console.log("result3 ",results[3])	
				var mailOptions = {
					from: 'E-tender',
					to: results[3][0].vcd_email,
					subject: 'Congratulations your tender has been approved',
					text: 'Your application has been approved for tender no:' + et_id + '. Your application ID is AP00' + etd_id + ' . \nThank You.',
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

/* ----------------------------- start of Two stage approval process code -------------------------- */

//update application status in tech round
router.post('/update_application_status', function (req, res) {

	var etd_id = req.body.etd_id;
	var status = req.body.status;
	var reason = req.body.reason;
	console.log("update applications status tech called" + etd_id + " with status " + status)
	var key=process.env["ENCRYPTION_KEY"];
	
	db_1.default.query('UPDATE e_tender_vendor SET is_approved=AES_ENCRYPT('+status+',"'+key+'"),reasons=AES_ENCRYPT("'+reason+'","'+key+'") where etd_id="'+etd_id+'";', function (error, results, fields) {
		if (error) {
			console.log("error", error);
			res.sendStatus(400);
			console.log("gettenderlist called0")
		}
		else {
			res.sendStatus(200);
		}
	});
});

//get application at technical round in 2 stage approval process
router.post('/get_application', function (req, res) {

	var et_id = req.body.et_id;
	console.log("get applications status tech called" + et_id);
	var key=process.env["ENCRYPTION_KEY"];

	db_1.default.query('SELECT et.et_id, et.et_title, et.et_tender_fee, et.is_approved as approved,et.et_tender_ref_no, et.et_tender_desc, et.et_file_uri, et.et_bidding_date, v.vd_id,vc.vcd_id, vc.vcd_name, vc.vcd_dob, vc.vcd_aadhar, vc.vcd_contact, vc.vcd_email, vc.vcd_designation, v.v_name, v.v_address, v.v_yoe, v.v_email, v.v_mobile, v.v_reg_no, v.v_legal_id, v.v_pan, v.v_gst, f.etd_id,cast( AES_DECRYPT(f.furi1 ,"'+key+'") as char ) as furi1, cast( AES_DECRYPT(f.furi2 ,"'+key+'") as char ) as furi2, p.txn_id, p.txn_amount, p.txn_timestamp, p.bank_name, p.resp_message, cast( AES_DECRYPT(e.bidding_amt ,"'+key+'") as char ) as bidding_amt, e.location, cast( AES_DECRYPT(e.is_approved ,"'+key+'") as char ) as is_approved, e.timestamp FROM `e_tender_vendor` as e INNER JOIN e_tender_details as et ON et.et_id=e.et_id INNER JOIN `vendor_details` as v ON e.vd_id=v.vd_id INNER JOIN v_contact_details as vc ON e.vcd_id = vc.vcd_id INNER JOIN `file_uri` as f ON e.etd_id=f.etd_id INNER JOIN payment_transactions as p ON p.etd_id = e.etd_id WHERE et.et_id = ' + et_id + ';', function (error, results, fields) {
		if (error) {
			console.log("error", error);
			res.sendStatus(400);
			console.log("gettenderlist called0")
		}
		else {
			res.send(results);
		}
	});
});

//update stage of tender
router.post('/update_tender_stage', function (req, res) { 

	var et_id = req.body.et_id;
	var status = req.body.status;
	console.log("update applications status tech called" + et_id + " with status " + status);

	db_1.default.query('UPDATE e_tender_details SET is_approved="' + status +'" WHERE et_id = "' + et_id + '";', function (error, results, fields) {
		if (error) {
			console.log("error", error);
			res.sendStatus(400);
			console.log("gettenderlist called0")
		}
		else {
			res.sendStatus(200);
		}
	});
});

/* ----------------------------- End of Two stage approval process code -------------------------- */

/* -----------------------------Start of digilocker code Modified-------------------------- */

const rp = require('request-promise');
const { Stats } = require("fs");

//below fn checks if file exists in user digi or not
function file_status_digi(i, results, res) {
	console.log(i)
	if (i == results.length) {
		res.send(results);
	}
	else {
		var vcd_id = results[i].vcd_id;
		var furi1 = results[i].furi1;
		var furi2 = results[i].furi2;
		console.log(vcd_id, furi1, furi2);
		// console.log(results[i]);

		var options = {
			method: 'POST',
			uri: 'https://165.22.210.37:8081/refresh_token',
			body: {
				id: results[i].vcd_id
			},
			json: true,
			headers: {
				'Content-Type': 'application/json',
			},
			strictSSL: false
		};

		rp(options)
			.then(function () {
				var sql = "SELECT access FROM access_token WHERE id=" + vcd_id;
				db_1.default.query(sql, function (err, result) {
					if (err) {
						res.status(400).send({ error: "Database query failed to get access token" });
					}
					console.log("Data received");
					var access_token = result[0].access;
					console.log("access token", access_token)

					//creating options parameter for external server call
					var options = {
						method: 'GET',
						uri: 'https://165.22.210.37:8081/get_files?furi=' + furi1 + '&vcd_id=' + vcd_id,
						strictSSL: false
					};

					rp(options)
						.then(function () {
							results[i].tech_uri = 1
							//creating options parameter for external server call
							var options = {
								method: 'GET',
								uri: 'https://165.22.210.37:8081/get_files?furi=' + furi2 + '&vcd_id=' + vcd_id,
								strictSSL: false
							};

							rp(options)
								.then(function () {
									results[i].boq_uri = 1;
									// console.log("rslts1", results);
									file_status_digi(i + 1, results, res);
								})
								.catch(function (err) {
									console.log('Failure1', err);
									results[i].boq_uri = 0;
									// console.log("rslts2", results);
									file_status_digi(i + 1, results, res);
								});
						})
						.catch(function (err) {
							console.log('Failure2', err);
							results[i].tech_uri = 0;
							//creating options parameter for external server call
							var options = {
								method: 'GET',
								uri: 'https://165.22.210.37:8081/get_files?furi=' + furi2 + '&vcd_id=' + vcd_id,
								strictSSL: false
							};

							rp(options)
								.then(function () {
									results[i].boq_uri = 1;
									// console.log("rslts3", results);
									file_status_digi(i + 1, results, res);
								})
								.catch(function (err) {
									console.log('Failure3', err);
									results[i].boq_uri = 0;
									// console.log("rslts4", results);
									file_status_digi(i + 1, results, res);
								});
						});

				});
			})
			.catch(function (err) {
				console.log('Failure4', err);
			});
		console.log("Hurray\n");
	}

}

/* -----------------------------End of digilocker code-------------------------- */

/* ----------------------- Start of Check file API digilocker ---------------------------- */

//Below function will return current timestamp in IST
function getIST() {
    //getting Current Timestamp in IST
    var currentTime = new Date()
    var currentOffset = currentTime.getTimezoneOffset()
    var ISTOffset = 330 // IST offset UTC +5:30
    var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset) * 60000)

    // ISTTime now represents the time as per IST
    var hoursIST = ISTTime.getHours()
    var minutesIST = ISTTime.getMinutes()
    var secondsIST = ISTTime.getSeconds()
    var dateIST = ISTTime.getDate()
    var monthIST = ISTTime.getMonth() + 1 //gives 0 for january and so on.. hence added 1
    var yearIST = ISTTime.getFullYear()

    var date = '' + dateIST + '/' + monthIST + '/' + yearIST
    var time = '' + hoursIST + ':' + minutesIST + ':' + secondsIST

    return date + ';' + time
}

//get file from digilocker function
function check_file(res, vcd_id, furi) {
    //Get access token from database
    var sql = 'SELECT access FROM access_token WHERE id=' + vcd_id
    db_1.default.query(sql, function (err, result) {
        if (err) {
            res.status(400).send({ error: 'Database query failed' })
        }
        console.log('Got Access Token from DB')
        var access_token = result[0].access

        //creating options parameter for external server call
        var options = {
            method: 'GET',
            uri: 'https://api.digitallocker.gov.in/public/oauth2/1/file/' + furi,
            headers: {
                Authorization: 'Bearer ' + access_token,
            },
            // resolveWithFullResponse: true,
        }

		rp(options)
			.then(function() {
				// console.log("sending ok from check file");
                res.sendStatus(200);
			})
            /*.on('data', function (datachunk) {
				console.log("sending ok from check file", datachunk);
                res.sendStatus(200);
            })*/
            .catch(function (err) {
                console.log('Failure', err)
                res.status(400).send({ error: 'File Not Found' })
            })
    })
}

router.get('/check_files', (req, res) => {
    var furi = req.query.furi
    //var vd_id = req.query.vd_id;
    // var vcd_id = req.query.vcd_id
    var vcd_id = req.query.vcd_id;

    console.log("check files sankey", furi, vcd_id);

    /* ------------------------ Start of Refresh Token ----------------------------- */

    var refresh_token1
    var date, time

    //get timestamp of token from database
    var sql = 'SELECT date, time FROM access_token WHERE id=' + vcd_id
    db_1.default.query(sql, function (err, result) {
        if (err) {
            res.status(400).send({ error: "Database connection failed, can't get timestamp of access token" })
        } else {
            console.log('Got Timestamp of Access Token from DB')
            date = result[0].date
            time = result[0].time

            //get current timestamp in IST
            var temp = getIST()
            temp = temp.split(';')
            var cur_date = temp[0]
            var cur_time = temp[1]

            //get date, month, year from date and hr minute and sec from time
            date = date.split('/') //split date to get day, month and year
            var date_d = date[0]
            var date_m = date[1]
            var date_y = date[2]

            time = time.split(':') //split time to get hours, minutes and seconds
            var time_h = time[0]
            var time_m = time[1]
            var time_s = time[2]

            cur_date = cur_date.split('/') //split --current-- date to get day, month and year
            var cur_date_d = cur_date[0]
            var cur_date_m = cur_date[1]
            var cur_date_y = cur_date[2]

            cur_time = cur_time.split(':') //split --current-- time to get hours, minutes and seconds
            var cur_time_h = cur_time[0]
            var cur_time_m = cur_time[1]
            var cur_time_s = cur_time[2]

            var date = new Date(date_y, date_m, date_d, time_h, time_m, time_s) //structuring old date
            var cur_date = new Date(cur_date_y, cur_date_m, cur_date_d, cur_time_h, cur_time_m, cur_time_s) //structuring --current-- date

            //calculate time and day difference (time difference in minutes)
            var timeDifference = Math.abs(date.getTime() - cur_date.getTime())

            let differentDays = Math.ceil(timeDifference / (1000 * 3600 * 24))
            let differentTime = Math.ceil(timeDifference / (1000 * 60))

            //compare dates if difference is == 0 or 1 days (we are taking diffDay = 1 because we have use ceil function see below)
            //and compare time if difference is < 50 minutes don't refresh token
            // note: although token expires after 60 minutes we will refresh token after 50 minutes only
            if ((differentDays == 1 || differentDays == 0) && differentTime < 50) {
                check_file(res, vcd_id, furi)
            } else {
                //get refresh token from database... using which we can get new access token
                var sql = 'SELECT refresh FROM access_token WHERE id=' + vcd_id
                db_1.default.query(sql, function (err, result) {
                    if (err) {
                        res.status(400).send({ error: "Database connection failed, can't get refresh token from database" })
                    } else {
                        refresh_token1 = result[0].refresh

                        //creating options parameter for external server call
                        var options = {
                            method: 'POST',
                            uri: 'https://api.digitallocker.gov.in/public/oauth2/1/token',
                            form: {
                                refresh_token: refresh_token1,
                                grant_type: 'refresh_token',
                            },
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                                Authorization: 'Basic REM4RkI4Q0Y6YzBhZjE2NjFlZDA1Mjk0YjhmODM=',
                            },
                            json: true,
                        }
                        //sending request with above options to digilocker to get new access token
                        rp(options)
                            .then(function (body) {
                                console.log('Token has been refreshed successfully')
                                // console.log(body);

                                //getting Current Timestamp in IST
                                var temp = getIST()
                                temp = temp.split(';')
                                var date = temp[0]
                                var time = temp[1]

                                //Updating access and refresh token into database
                                var sql = "UPDATE access_token SET access = '" + body.access_token + "', refresh = '" + body.refresh_token + "', date = '" + date + "', time = '" + time + "' WHERE id=" + vcd_id
                                db_1.default.query(sql, function (err, result) {
                                    if (err) {
                                        res.status(400).send({ error: "Database query failed, can't update access token" })
                                    } else {
                                        check_file(res, vcd_id, furi)
                                    }
                                })
                            })
                            .catch(function (err) {
                                console.log('Failure', err)
                                if (err) throw err
                            })
                    }
                })
            }
        }
    })

    /* ------------------------------End of refresh Token ----------------------------------------- */
})

/* ------------------------ End of Check file API digilocker ---------------------------- */