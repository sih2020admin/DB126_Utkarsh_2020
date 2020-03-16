import { Router,Request,Response } from "express"
import { Connection } from "mysql"
import express from "express"
import connection from "./db"

const router:Router = express.Router()

router.post('/register-data',(request:Request,response:Response)=>{
    console.log("hello")
    console.log(request.body)
    /* var duplicate:string = ""
    var check_company: number= 1
    var check_contact:number = 1
    var company_details = request.body.company_details
    var contact_details = request.body.contact_details
    var email_id:string = company_details.email_id
    var correspondence_email_id:string= company_details.correspondence_email_id
    var mobile_number:string = company_details.mobile_number
    var company_name :string= company_details.company_name
    var registration_number :string= company_details.registration_number
    var company_address:string = company_details.company_address
    var city:string = company_details.city
    var establishment_year:string = company_details.establishment_year
    var legal_status:string = company_details.legal_status
    var title:string = contact_details.title
    var contact_name:string = contact_details.contact_name
    var date_of_birth:string = contact_details.date_of_birth
    var designation:string = contact_details.designation
    var aadhaar_number:string = contact_details.aadhaar_number
    var gst_register_number:string = contact_details.gst_register_number
    console.log("hello1")
    console.log(company_details)
    check_company = check_company_details(email_id,correspondence_email_id,mobile_number,company_name,registration_number,company_address,city,establishment_year,legal_status)
    check_contact = check_contact_details(title,contact_name,date_of_birth,designation,aadhaar_number,gst_register_number)
    if (check_contact == 1 && check_company == 1) {
        connection.query("insert into user values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[email_id,correspondence_email_id,mobile_number,company_name,registration_number,company_address,city,establishment_year,legal_status,title,contact_name,date_of_birth,designation,aadhaar_number,gst_register_number],(error,result)=>{
            if (error){
                console.log(error,error.code,error.message)
                if (error.code == "ER_DUP_ENTRY"){
                    console.log("duplicate entry")
                    duplicate = error.message
                    console.log("hello2")
                    var user_duplicate_message:string = duplicate.substring(duplicate.indexOf("key")+5,duplicate.length-1)
                    if(user_duplicate_message == "PRIMARY"){
                        response.send("Email address is already registered with us")
                    }
                    else{
                        user_duplicate_message = user_duplicate_message.replace(/_/g," ")
                        response.send(user_duplicate_message + " is already registered with us")
                    }
                }
                else if(error.code == "1366"){
                    response.send("Some Mandatory fields are empty")
                }
                else{
                    response.send("some error")
                }
            }
            else{
                console.log(result)
                
                response.status(200).send("Successfully registered")   
            }
        })
    }
    else{
        response.sendStatus(400)
    }
 */    //response.sendFile(path.join(__dirname + '/../views/index.html'));})
})

/* function check_company_details(email_id,correspondence_email_id,mobile_number,company_name,registration_number,company_address,city,establishment_year,legal_status){
    console.log(email_id)
    return 1

    console.log(company_details)
}

function check_contact_details(title,contact_name,date_of_birth,designation,aadhaar_number,gst_register_number){
    console.log(title)
    return 1
} */
export default router

/* router.post('/register-data', function (request, response) {
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
    
    
        var sql1= "insert into `vendor_details`(`v_name`, `v_address`, `v_yoe`, `v_email`, `v_mobile`, `v_reg_no`, `v_state_id`, `v_dist_id`, `v_city_id`, `v_pincode`, `v_legal_id`, `v_pan`, `v_is_verified`) VALUES (?,?,?, ?,?,?, ?,?,?, ?,?,?, ?); SELECT LAST_INSERT_ID() as vd_id;"

        db_1.default.query(sql1, [v_company_name,v_company_address ,v_establishment_year,v_email,v_mobile_number,v_registration_number,v_state,"-1",v_city,v_pincode,v_legal_status,v_pan,"0",v_registration_number], function (error, result) {
            if (error) {
                console.log(error, error.code, error.message);
                if (error.code == "ER_DUP_ENTRY") {
                    console.log("duplicate entry");
                    var duplicate = error.message;
                    console.log("hello2");
                    response.status(400).send("Comapany Registration number is already registered with us");
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
 */