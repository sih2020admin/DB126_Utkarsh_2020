"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var db_1 = __importDefault(require("./db"));
var router = express_1.default.Router();

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
    },
});


router.post('/register-data', function (request, response) {
    console.log("register data called" );
    
    var company_details = request.body.company_details;
    var contact_details = request.body.contact_details;
    var account_details = request.body.account_details;

    var v_email = company_details.company_email;
    var v_mobile_number = company_details.mobile_number;
    var v_company_name = company_details.company_name;
    var v_registration_number = company_details.registration_number;
    var v_company_address = company_details.company_address;
    var v_city = company_details.city;
    var v_establishment_year = company_details.establishment_year;
    var v_legal_status = company_details.legal_status;
    var v_state = company_details.state;
    var v_pincode = company_details.pincode;
    var v_gst = company_details.gst_register_number;
    var v_pan = company_details.pan_number;

    var c_title = contact_details.title;
    var c_contact_name = contact_details.contact_name;
    var c_date_of_birth = contact_details.date_of_birth;
    var c_designation = contact_details.designation;
    var c_aadhaar_number = contact_details.aadhaar_number;
    var correspondence_email_id = contact_details.contact_email;
    var c_mobile_number = contact_details.contact_contact;

    var v_username = account_details.username;
    var v_password = account_details.password;

    console.log("hello1");
    var sql= "START TRANSACTION;                                                                                                                                     INSERT INTO `vendor_details`(`v_name`, `v_address`, `v_yoe`, `v_email`, `v_mobile`, `v_reg_no`, `v_state_id`, `v_dist_id`, `v_city_id`, `v_pincode`, `v_legal_id`, `v_pan`, `v_is_verified`,`v_gst`) VALUES (?,?,?, ?,?,?, ?,?,?, ?,?,?, ?,?);                                                                   INSERT INTO `v_contact_details`(`vcd_name`, `vcd_title`, `vcd_dob`, `vcd_aadhar`, `vcd_contact`, `vcd_email`, `vcd_designation`, `vd_id`) VALUES (?,?,?,?, ?,?,?,LAST_INSERT_ID());                                                                                                                                             INSERT INTO `log_in_details`( `user_name`, `password`, `role_id`, `vcd_id`) VALUES (?,?, ?,LAST_INSERT_ID());                                                   COMMIT;"

        db_1.default.query(sql, [v_company_name,  v_company_address ,  v_establishment_year,  v_email,  v_mobile_number,  v_registration_number,  v_state,  "-1", v_city,v_pincode,  v_legal_status,  v_pan,  "0", v_gst    , c_contact_name,  c_title,  c_date_of_birth,  c_aadhaar_number , c_mobile_number , correspondence_email_id , c_designation  ,  v_username,  v_password,  "2"  ], function (error, result) {
            if (error) {
                console.log(error, error.code, error.message);
                if (error.code == "ER_DUP_ENTRY") {
                    console.log("duplicate entry");
                    var duplicate = error.message;
                    console.log("hello2");
                    if(error.index == 1)
                   	{ response.status(400).send("Company Registration number/ GST number / PAN is already registered with us");}
                   else if(error.index ==3)
                   	{ response.status(400).send("Username allready taken");}
                }     
            }
            else {

                var mailOptions = {
                    from: 'E-Tendering',
                    to: correspondence_email_id,
                    subject: 'Registration Confirmation on E-tendering Site',
                    text: 'Welcome to E-Tendering Site\nYou are all set. Now you can apply for tenders from various departments to grow your business.\nLOG IN TO YOUR NEW ACCOUNT http://165.22.210.37:8081/v1_login.html \nOur best wishes,Team Utkarsh.',
                }
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                        //res.sendStatus(400);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });

               response.status(200).send("Successfully registered"); 
            }
        });
    });

exports.default = router;


