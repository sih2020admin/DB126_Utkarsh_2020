var username:string;
var password:string;
var title:string;
var contact_name:string
var date_of_birth:string
var designation:string
var aadhaar_number:string
var contact_email:string
var contact_contact:string
var company_name:string
var company_address:string
var company_email:string
var mobile_number:string
var registration_number:string
var state:string
var city:string
var establishment_year:string
var pincode:string
var legal_status:string
var pan_number:string
load_years()
load_states()
load_legal_status()
function load_years(){
    const end_year:number = 1700
    const current_year:number = new Date().getFullYear()
    for (var i:number=current_year;i>= end_year;i--){
        $( "<option></option>", {
            "value": i.toString(),
            "text":i.toString()
          }).appendTo("#establishment_year");
    }
}

function load_states(){
    $.ajax({
        url:"http://localhost:8081/misc/get-state",
        method:"POST",
        async:true,

        success:(response)=>{
            var message = response
            for (let i of message){
                $("<option></option>",{
                    "text":i.state_name,
                    "value":i.st_id
                }).appendTo("#state")
            }
        },
        statusCode:{
            400:()=>{
                alert("some error")
            }
        },
        error:(xhr,error_type,exception)=>{
            var error_message = xhr.responseText
            alert(`Problem connecting with ${error_message}`)
        }
    })
}

function load_legal_status(){
    $.ajax({
        url:"http://localhost:8081/misc/get-legal-status",
        method:"POST",
        async:true,
        success:(response)=>{
            var message = response
            for (let i of message){
                $("<option></option>",{
                    "text":i.l_name,
                    "value":i.l_id
                }).appendTo("#legal_status")
            }
        },
        statusCode:{
            400:()=>{
                alert("some error")
            }
        },
        error:(xhr,error_type,exception)=>{
            var error_message = xhr.responseText
            alert(`Problem connecting with ${error_message}`)
        }
    }
    )
}


$("#submit_button").on("click",()=>{
    title = $("#title").val()?.toString()!
    contact_name = $("#contact_name").val()?.toString()!
    date_of_birth = $("#date_of_birth").val()?.toString()!
    designation = $("#designation").val()?.toString()! 
    aadhaar_number = $("#aadhaar_number").val()?.toString()!
    contact_email = $("#contact_email").val()?.toString()!
    contact_contact = $("#contact_contact").val()?.toString()!
    var check_contact = contact_validate(title,contact_name,date_of_birth,designation,aadhaar_number,contact_email,contact_contact)
    if(check_contact === 1){
        var abc ={
            account_details:{
                username:username,
                password:password
            },
            company_details:{

            },
            contact__details:{
                title:title,
                contact_name:company_name,
                date_of_birth:date_of_birth,
                designation:designation,
                aadhaar_number:aadhaar_number,
                contact_email:company_email,
                contact_contact:contact_contact
            }
        }
        console.log(abc)
        $.ajax({
            url:"http://localhost:8081/register/register-data",
            method:"POST",
            contentType:"application/json; charset=utf-8",
            data:JSON.stringify(abc),
            async:true,
            success:(response)=>{
                alert("got some response from server")
            },
            error:(xhr,error_type,exception)=>{
                var error_message = xhr.responseText
                alert(`Problem connecting with ${error_message}`)
            }
        })
    }

})
$("#account_button").on("click",()=>{
    username= $("#username").val()?.toString()!;
    password= $("#password").val()?.toString()!;
    var confirm_password:string = $("#confirm_password").val()?.toString()!;
    var check_account:number = account_validate(username,password,confirm_password)
    if (check_account === 1){
        $(".company_details").show()
        $(".account_details").hide()
    }
   // $(".account_details").hide()
    //$(".company_details").show()
    //var state = $("#state :selected").text()
    /* var email_id = (<HTMLInputElement>document.getElementById("email_id"))?.value;
    var correspondence_email_id  = (<HTMLInputElement>document.getElementById("correspondence_email_id"))?.value;
    var mobile_number = (<HTMLInputElement>document.getElementById("mobile_number"))?.value;
    var company_name = (<HTMLInputElement>document.getElementById("company_name"))?.value;
    var registration_number = (<HTMLInputElement>document.getElementById("registration_number"))?.value;
    var company_address = (<HTMLInputElement>document.getElementById("company_address"))?.value;
    var city = (<HTMLInputElement>document.getElementById("city"))?.value;
    var establishment_year = (<HTMLInputElement>document.getElementById("establishment_year"))?.value;
    var legal_status = (<HTMLInputElement>document.getElementById("legal_status"))?.value;
    var title = (<HTMLSelectElement>document.getElementById("title"))?.value;
    var contact_name = (<HTMLInputElement>document.getElementById("company_name"))?.value;
    var date_of_birth = (<HTMLInputElement>document.getElementById("date_of_birth"))?.value;
    var designation = (<HTMLInputElement>document.getElementById("designation"))?.value;
    var aadhaar_number = (<HTMLInputElement>document.getElementById("aadhaar_number"))?.value;
    var gst_registration_number = (<HTMLInputElement>document.getElementById("gst_registration_number"))?.value;
    var url:string = "http://localhost:8081/register/register-data";
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (this.status == 200) {
            message = this.responseText;
            alert(message)
        }
        else if (this.status == 400) { 
            message = this.responseText;
            alert(message)
        }
        else {
            alert(message)
        }
    };
    xhr.onerror=function(){
        alert("Check your network or try again later")
    }

    xhr.send(JSON.stringify({
        company_details:{
            email_id:email_id,
            correspondence_email_id:correspondence_email_id,
            mobile_number:mobile_number,
            company_name:company_name,
            registration_number :registration_number,
            company_address:company_address,
            city:city,
            establishment_year:establishment_year, 
            legal_status:legal_status
        },
        contact_details:{
            title:title,
            contact_name:contact_name,
            date_of_birth:date_of_birth,
            designation:designation,
            aadhaar_number:aadhaar_number,
            gst_register_number:gst_registration_number
        }

    })) */
})

$("#company_button").on("click",()=>{

    company_name = $("#company_name").val()?.toString()!
    company_address = $("#company_address").val()?.toString()!
    company_email = $("#company_email").val()?.toString()!
    mobile_number = $("#mobile_number").val()?.toString()!
    registration_number = $("#registration_number").val()?.toString()!
    state = $("#state").val()?.toString()!
    city = $("#city").val()?.toString()!
    establishment_year = $("#establishment_year").val()?.toString()!
    pincode = $("#pincode").val()?.toString()!
    legal_status = $("#legal_status").val()?.toString()!
    pan_number = $("#pan_number").val()?.toString()!
    var check_company = company_validate(company_name,company_address,company_email,mobile_number,
        registration_number,state,city,establishment_year,pincode,legal_status,pan_number)
    if( check_company === 1){
        $(".company_details").hide()
        $(".contact__details").show()
        $(".submit_button").show()
    }
})
$("#contact__details_previous").on("click",()=>{

    $(".contact__details").hide()
    $(".company_details").show()
    $(".submit_button").hide()


})

function account_validate(username: string ,password: string,confirm_password: string):number{
    var reg:RegExp=/^[a-zA-Z0-9_]{5,}[a-zA-Z]+[0-9]*$/;
    if (username === ""){
        console.log("emppty")
        $("#error_para").text("Error : Username field cannot be empty")
        return 0
    }
    if(password === ""){
        $("#error_para").text("Error : Password field cannot be empty")
        return 0
    }
    if(confirm_password === ""){
        $("#error_para").text("Error : Confirm Password field cannot be empty")
        return 0
    }
    if(username.length < 7 || username.length >15){
        $("#error_para").text("Error : Username should be greater than six characters and less than 15 characters")
        return 0
    }
    if(reg.test(username)==false){
        $("#error_para").text("Error : Username contains inappropriate characters")
        return 0
    }
    if(password.length<5){
        $("#error_para").text("Error : Password has to be greater than four characters ")
        return 0
    }
    if(password !== confirm_password){
        $("#error_para").text("Error : Password and Confirm Password fields do not match each other")
        return 0
    }
    $("#error_para").text("Success")
    return 1

}

function company_validate(company_name:string,company_address:string,company_email:string,
    mobile_number:string,registration_number:string,state:string,city:string,establishment_year:string,pincode:string,legal_status:string,pan_number:string):number{
    if(company_name === ""){
        $("#error_para").text("Error : Company Name field cannot be empty")
        return 0
    }
    if(company_address === ""){
        $("#error_para").text("Error : Company Address field cannot be empty")
        return 0
    }
    if(company_email === ""){
        $("#error_para").text("Error : Company Email Address cannot be empty")
        return 0
    }
    if(mobile_number === ""){
        $("#error_para").text("Error :Company Mobile Number cannot be empty")
        return 0
    }
    if(registration_number === ""){
        $("#error_para").text("Error : Registration Number field cannot be empty")
        return 0
    }
    if(state === "select"){
        $("#error_para").text("Error : State field has inappropriate value")
        return 0
    }
    if(city === ""){
        $("#error_para").text("Error : City field cannot be empty")
        return 0
    }
    if(establishment_year === "select"){
        $("#error_para").text("Error : Establishment year field has inappropriate value")
        return 0
    }
    if(pincode === ""){
        $("#error_para").text("Error : Pincode field cannot be empty")
        return 0
    }
    if(legal_status === "select"){
        $("#error_para").text("Error : Legal Status field has inappropriate field")
        return 0
    }
    if(pan_number === ""){
        $("#error_para").text("Error : Pan Number field cannot be empty")
        return 0
    }
    $("#error_para").text("Success")
    return 1
}

function contact_validate(title:string,contact_name:string,date_of_birth:string,designation:string,aadhaar_number:string,contact_email:string,contact_contact:string):number{
    if(title === "select"){
        $("#error_para").text("Error : Title field has an inappropriate value")
        return 0
    }
    if(contact_name === ""){
        $("#error_para").text("Error :  Contact Name field cannot be empty value")
        return 0
    }
    if(date_of_birth === ""){
        $("#error_para").text("Error : Date of Birth field cannot be empty")
        return 0
    }
    if(designation === ""){
        $("#error_para").text("Error : Designation field cannot be empty")
        return 0
    }
    if(aadhaar_number === ""){
        $("#error_para").text("Error : Aadhaar Number field cannot be empty or has invalid characters")
        return 0
    }
    if(contact_email === ""){
        $("#error_para").text("Error : Email Address field cannot be empty or has invalid characters")
        return 0
    }
    if(contact_contact === ""){
        $("#error_para").text("Error : Mobile Number field cannot be empty or has invalid characters")
        return 0
    }
    if(aadhaar_number.length<12 || aadhaar_number.length>12){
        $("#error_para").text("Error : Aadhaar Number has inappropriate length")
        return 0
    }
    if(contact_contact.length<10 || contact_contact.length>10){
        $("#error_para").text("Error : Mobile Number has inappropriate length")
        return 0
    }
    if(/^[0-9]+$/.test(contact_contact) == false){
        $("#error_para").text("Error : Mobile Number has invalid characters")
        return 0
    }
    $("#error_para").text("Success")
    return 1
}