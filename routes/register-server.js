"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
var connection = require('./db');
router.get('/', function (request, response) {
    response.render('register');
});
router.post('/register-data', function (request, response) {
    var duplicate = "";
    var check_company = 1;
    var check_contact = 1;
    var company_details = request.body.company_details;
    var contact_details = request.body.contact_details;
    var email_id = company_details.email_id;
    var correspondence_email_id = company_details.correspondence_email_id;
    var mobile_number = company_details.mobile_number;
    var company_name = company_details.company_name;
    var registration_number = company_details.registration_number;
    var company_address = company_details.company_address;
    var city = company_details.city;
    var establishment_year = company_details.establishment_year;
    var legal_status = company_details.legal_status;
    var title = contact_details.title;
    var contact_name = contact_details.contact_name;
    var date_of_birth = contact_details.date_of_birth;
    var designation = contact_details.designation;
    var aadhaar_number = contact_details.aadhaar_number;
    var gst_register_number = contact_details.gst_register_number;
    /* check_company = check_company_details(email_id,correspondence_email_id,mobile_number,company_name,registration_number,company_address,city,establishment_year,legal_status)
    check_contact = check_contact_details(title,contact_name,date_of_birth,designation,aadhaar_number,gst_register_number) */
    if (check_contact == 1 && check_company == 1) {
        connection.query("insert into user values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [email_id, correspondence_email_id, mobile_number, company_name, registration_number, company_address, city, establishment_year, legal_status, title, contact_name, date_of_birth, designation, aadhaar_number, gst_register_number], function (error, result) {
            if (error) {
                if (error.code == "ER_DUP_ENTRY") {
                    console.log("duplicate entry");
                    duplicate = error.message;
                    var user_duplicate_message = duplicate.substring(duplicate.indexOf("key") + 5, duplicate.length - 1);
                    if (user_duplicate_message == "PRIMARY") {
                        response.send("Email address is already registered with us");
                    }
                    else {
                        user_duplicate_message = user_duplicate_message.replace(/_/g, " ");
                        response.send(user_duplicate_message + " is already registered with us");
                    }
                }
            }
            else {
                console.log(result);
                response.send("Successfully registered");
            }
        });
    }
    else {
        response.sendStatus(400);
    }
    //response.sendFile(path.join(__dirname + '/../views/index.html'));})
});
/* function check_company_details(email_id,correspondence_email_id,mobile_number,company_name,registration_number,company_address,city,establishment_year,legal_status){
    console.log(email_id)
    return 1

    console.log(company_details)
}

function check_contact_details(title,contact_name,date_of_birth,designation,aadhaar_number,gst_register_number){
    console.log(title)
    return 1
} */
module.exports = router;
