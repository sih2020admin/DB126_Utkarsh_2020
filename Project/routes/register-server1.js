"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var db_1 = __importDefault(require("./db"));
var router = express_1.default.Router();
router.post('/register-data', function (request, response) {
    console.log("hello");
    var account_details = request.body.account_details;
    var company_details = request.body.company_details;
    var contact_details = request.body.contact_details;
    console.log(account_details, company_details, contact_details);
    var username = account_details.username;
    var password = account_details.password;
    var title = contact_details.title;
    var contact_name = contact_details.contact_name;
    var date_of_birth = contact_details.date_of_birth;
    var designation = contact_details.designation;
    var aadhaar_number = contact_details.aadhaar_number;
    var contact_email = contact_details.contact_email;
    var contact_contact = contact_details.contact_contact;
    var company_name = company_details.company_name;
    var company_address = company_details.company_address;
    var company_email = company_details.company_email;
    var mobile_number = company_details.mobile_number;
    var registration_number = company_details.registration_number;
    var state = company_details.state;
    var city = company_details.city;
    var establishment_year = company_details.establishment_year;
    var pincode = company_details.pincode;
    var legal_status = company_details.legal_status;
    var pan_number = company_details.pan_number;
    var gst_register_number = company_details.gst_register_number;
    console.log(username, password);
    console.log(title, contact_name, date_of_birth, designation, aadhaar_number, contact_email, contact_contact);
    var sql1 = "insert into `vendor_details`(`v_name`, `v_address`, `v_yoe`, `v_email`, `v_mobile`, `v_reg_no`, `v_state_id`, `v_dist_id`, `v_city_id`, `v_pincode`, `v_legal_id`, `v_pan`, `v_is_verified`,`v_gst`) VALUES (?,?,?, ?,?,?, ?,?,?, ?,?,?, ?,?); SELECT LAST_INSERT_ID() as vd_id;";
    db_1.default.query(sql1, [company_name, company_address, establishment_year, company_email, mobile_number, registration_number, state, "-1", city, pincode, legal_status, pan_number, "0", gst_register_number], function (error, result) {
        if (error) {
            console.log(error, error.code, error.message);
            if (error.code == "ER_DUP_ENTRY") {
                console.log("duplicate entry");
                var duplicate = error.message;
                console.log("hello2");
                response.status(400).send("Company Registration number/ GST number / PAN is already registered with us");
            }
        }
        else {
            console.log("here is result look here", result);
            var vd_id = JSON.parse(JSON.stringify(result[1]))[0].vd_id;
            console.log("vd_id:", vd_id);
            db_1.default.query("INSERT INTO `v_contact_details`(`vcd_name`, `vcd_title`, `vcd_dob`, `vcd_aadhar`, `vcd_contact`, `vcd_email`, `vcd_designation`, `vd_id`) VALUES (?,?,?,?, ?,?,?,?); SELECT LAST_INSERT_ID() as vcd_id;", [contact_name, title, date_of_birth, aadhaar_number, contact_contact, contact_email, designation, vd_id], function (error2, result2) {
                if (error2) {
                    console.log(error2, error2.code, error2.message);
                }
                else {
                    console.log(result2);
                    var vcd_id = JSON.parse(JSON.stringify(result2[1]))[0].vcd_id;
                    console.log("vcd_id:", vcd_id);
                    db_1.default.query("INSERT INTO `log_in_details`( `user_name`, `password`, `role_id`, `vcd_id`) VALUES (?,?, ?,?);", [username, password, "2", vcd_id], function (error3, result3) {
                        if (error3) {
                            console.log(error3, error3.code, error3.message);
                            if (error3.code == "ER_DUP_ENTRY") {
                                console.log("duplicate entry");
                                var duplicate = error3.message;
                                console.log("hello3");
                                db_1.default.query("DELETE FROM `v_contact_details` WHERE vcd_id = ?; DELETE FROM `vendor_details` WHERE vd_id=?;", [vcd_id, vd_id], function (error, result) {
                                    if (error) {
                                        console.log(error, error.code, error.message);
                                    }
                                    else {
                                        console.log(result);
                                        response.status(400).send("Username allready taken");
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
        }
    });
});
exports.default = router;
