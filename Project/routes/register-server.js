"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var db_1 = __importDefault(require("./db"));
var router = express_1.default.Router();

router.post('/register-data', function (request, response) {
    console.log("register data called" );

    // var duplicate = "";
    // var check_company = 1;
    // var check_contact = 1;

    var company_details = request.body.company_details;
    var contact_details = request.body.contact_details;
    var account_details = request.body.account_details;

    var v_email = company_details.email_id;
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
    var correspondence_email_id = company_details.correspondence_email_id;
    var v_mobile_number = contact_details.contact_number;

    var v_username = account_details.username;
    var v_password = account_details.password;


    
    console.log("hello1");
    console.log(company_details);
    
        db_1.default.query("insert into user values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [email_id, correspondence_email_id, mobile_number, company_name, registration_number, company_address, city, establishment_year, legal_status, title, contact_name, date_of_birth, designation, aadhaar_number, gst_register_number], function (error, result) {
            if (error) {
                console.log(error, error.code, error.message);
                if (error.code == "ER_DUP_ENTRY") {
                    console.log("duplicate entry");
                    duplicate = error.message;
                    console.log("hello2");
                    var user_duplicate_message = duplicate.substring(duplicate.indexOf("key") + 5, duplicate.length - 1);
                    if (user_duplicate_message == "PRIMARY") {
                        response.send("Email address is already registered with us");
                    }
                    else {
                        user_duplicate_message = user_duplicate_message.replace(/_/g, " ");
                        response.send(user_duplicate_message + " is already registered with us");
                    }
                }
                else if (error.code == "1366") {
                    response.send("Some Mandatory fields are empty");
                }
                else {
                    response.send("some error");
                }
            }
            else {
                console.log(result);
                response.status(200).send("Successfully registered");
            }
        });
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
exports.default = router;
