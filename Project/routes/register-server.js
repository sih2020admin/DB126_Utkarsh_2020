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
    var correspondence_email_id = contact_details.correspondence_email_id;
    var c_mobile_number = contact_details.contact_number;

    var v_username = account_details.username;
    var v_password = account_details.password;


    
    console.log("hello1");
    
    
        var sql1= "insert into `vendor_details`(`v_name`, `v_address`, `v_yoe`, `v_email`, `v_mobile`, `v_reg_no`, `v_state_id`, `v_dist_id`, `v_city_id`, `v_pincode`, `v_legal_id`, `v_pan`, `v_is_verified`,`v_gst`) VALUES (?,?,?, ?,?,?, ?,?,?, ?,?,?, ?,?); SELECT LAST_INSERT_ID() as vd_id;"

        db_1.default.query(sql1, [v_company_name,v_company_address ,v_establishment_year,v_email,v_mobile_number,v_registration_number,v_state,"-1",v_city,v_pincode,v_legal_status,v_pan,"0",v_registration_number,v_gst], function (error, result) {
            if (error) {
                console.log(error, error.code, error.message);
                if (error.code == "ER_DUP_ENTRY") {
                    console.log("duplicate entry");
                    var duplicate = error.message;
                    console.log("hello2");
                    response.status(400).send("Comapany Registration number/ GST number / PAN is already registered with us");
                }
                
            }
            else {
                console.log("hereis result look here",result);

                        var vd_id=JSON.parse(JSON.stringify(result[1]))[0].vd_id;
                        console.log("vd_id:",vd_id)

                        db_1.default.query("INSERT INTO `v_contact_details`(`vcd_name`, `vcd_title`, `vcd_dob`, `vcd_aadhar`, `vcd_contact`, `vcd_email`, `vcd_designation`, `vd_id`) VALUES (?,?,?,?, ?,?,?,?); SELECT LAST_INSERT_ID() as vcd_id;", [c_contact_name,c_title,c_date_of_birth,c_aadhaar_number , c_mobile_number , correspondence_email_id , c_designation,vd_id], function (error2, result2) {
                    if (error2) {
                        console.log(error2, error2.code, error2.message);
                        
                    }
                    else {
                        console.log(result2);

                        var vcd_id = JSON.parse(JSON.stringify(result2[1]))[0].vcd_id;
                        console.log("vcd_id:",vcd_id)

                        db_1.default.query("INSERT INTO `log_in_details`( `user_name`, `password`, `role_id`, `vcd_id`) VALUES (?,?, ?,?);", [v_username,v_password,"2",vcd_id], function (error3, result3) {
                            if (error3) {
                                console.log(error3, error3.code, error3.message);
                                if (error3.code == "ER_DUP_ENTRY") {
                                console.log("duplicate entry");
                                var duplicate = error3.message;
                                console.log("hello3");



                                db_1.default.query("DELETE FROM `v_contact_details` WHERE vcd_id = ?; DELETE FROM `vendor_details` WHERE vd_id=?;", [vcd_id,vd_id], function (error, result) {
                                    if (error) {
                                        console.log(error, error.code, error.message);
                                        
                                    }
                                    else {
                                        console.log(result);
                                        response.status(400).send("Username allready taken");
                                        
                                        // response.status(200).send("Successfully registered");
                                    }
                                });

                                
                            }
                                
                            }
                            else {
                                console.log(result3);
                                
                                response.status(200).send("Successfully registered");
                            }
                        });
                        
                        
                    }
                });

                // response.status(200).send("Successfully registered");
            }
        });
    
    //response.sendFile(path.join(__dirname + '/../views/index.html'));})
});

exports.default = router;
