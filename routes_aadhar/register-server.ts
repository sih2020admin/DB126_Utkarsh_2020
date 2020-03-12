import { Router,Request,Response } from "express"
import { Connection } from "mysql"

const express = require('express')
const router:Router = express.Router()
const connection:Connection = require('./db')

router.post('/register-data',(request:Request,response:Response)=>{
    console.log("hello")
    var duplicate:string = ""
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
    /* check_company = check_company_details(email_id,correspondence_email_id,mobile_number,company_name,registration_number,company_address,city,establishment_year,legal_status)
    check_contact = check_contact_details(title,contact_name,date_of_birth,designation,aadhaar_number,gst_register_number) */
    if (check_contact == 1 && check_company == 1) {
        connection.query("insert into user values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[email_id,correspondence_email_id,mobile_number,company_name,registration_number,company_address,city,establishment_year,legal_status,title,contact_name,date_of_birth,designation,aadhaar_number,gst_register_number],(error,result)=>{
            if (error){
                console.log(error)
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
            }
            else{
                console.log(result)
                
                response.status(200).send({"message":"Successfully registered"})   
            }
        })
    }
    else{
        response.sendStatus(400)
    }
    //response.sendFile(path.join(__dirname + '/../views/index.html'));})
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
module.exports = router