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
var gst_register_number:string
var is_verified:string
load_years()
load_states()
load_legal_status()
$("#city").prop("disabled", true);
// loading years
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

// loading states from database
function load_states(){
    $.ajax({
        url:"http://localhost:8081/misc/get-state",
        method:"POST",
        async:true,
        success:(response)=>{
            var message = response
            for (let i of message){
                $("<option></option>",{
                    "text":i.st_name,
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

// loading cities dynamically by taking checking state field after each change
function load_cities(state_code:string){
    $.ajax({
        url:"http://localhost:8081/misc/get-city",
        method:"POST",
        contentType:"application/json; charset=utf-8",
        data:JSON.stringify({
            state_code:state_code
        }),
        success:(response)=>{
            var message = response
            console.log(message)
            for (let i of message){
                $("<option></option>",{
                    "text":i.c_name,
                    "value":i.c_id
                }).appendTo("#city")
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
$("#state").change(()=>{
    $("#city").prop("disabled", false);
    $("#city").empty()
    $("<option></option>",{
        "text":"--select--",
        "value":"select"
    }).appendTo("#city")
    load_cities($("#state").val()?.toString()!)
})


// loading legal status field from databse
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
// validation for contact details
$("#submit_button").on("click",()=>{
    title = $("#title").val()?.toString()!
    contact_name = $("#contact_name").val()?.toString()!
    date_of_birth = $("#date_of_birth").val()?.toString()!
    designation = $("#designation").val()?.toString()! 
    aadhaar_number = $("#aadhaar_number").val()?.toString()!
    contact_email = $("#contact_email").val()?.toString()!
    contact_contact = $("#contact_contact").val()?.toString()!
    var check_contact = contact_validate(title,contact_name,date_of_birth,designation,aadhaar_number,contact_email,contact_contact)
    console.log(title)
    if(check_contact === 1){
        console.log(is_verified)
        if(is_verified !="ok"){
            $("#error_para").text("Error : Aadhaar Number is not verified \n Click on verify to start verifying it")

        }else{
            var abc ={
                account_details:{
                    username:username,
                    password:password
                },
                company_details:{
                    company_name:company_name,
                    company_address:company_address,
                    company_email:company_email,
                    mobile_number:mobile_number,
                    registration_number:registration_number,
                    state:state,
                    city:city,
                    establishment_year:establishment_year,
                    pincode:pincode,
                    legal_status:legal_status,
                    pan_number:pan_number,
                    gst_register_number:gst_register_number
                },
                contact_details:{
                    title:title,
                    contact_name:contact_name,
                    date_of_birth:date_of_birth,
                    designation:designation,
                    aadhaar_number:aadhaar_number,
                    contact_email:contact_email,
                    contact_contact:contact_contact
                }
            }
            $.ajax({
                url:"http://localhost:8081/register/register-data",
                method:"POST",
                contentType:"application/json; charset=utf-8",
                data:JSON.stringify(abc),
                async:true,
                success:(response)=>{
                    alert(response)
                    alert("got some response from server")
                },
                error:(xhr,error_type,exception)=>{
                    var error_message = xhr.responseText
                    alert(`${error_message}`)
                }
            })
        }
        
    }

})

// validation for account_details
$("#account_button").on("click",()=>{
    username= $("#username").val()?.toString()!;
    password= $("#password").val()?.toString()!;
    var confirm_password:string = $("#confirm_password").val()?.toString()!;
    var check_account:number = account_validate(username,password,confirm_password)
    if (check_account === 1){
        $(".account_details").hide()
        $(".company_details").fadeTo("fast",1)
    }

})
// validation of company details
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
    gst_register_number = $("#gst_register_number").val()?.toString()!
    var check_company = company_validate(company_name,company_address,company_email,mobile_number,
        registration_number,state,city,establishment_year,pincode,legal_status,pan_number,gst_register_number)
    if( check_company === 1){
        $(".company_details").hide()
        $(".contact__details").fadeTo("fast",1)
        $(".submit_button").fadeTo("fast",1)
    }
})

$("#verify_button").on("click",()=>{
    var aadhaar = $("#aadhaar_number").val()?.toString()!
    if(aadhaar === ""){
        $("#error_para").text("Error : Aadhaar Number Field cannot be empty")

    }
    else if(aadhaar.length<12 || aadhaar.length>12){
        $("#error_para").text("Error : Aadhaar Number has inappropriate length")
    }
    else{
        $("#otp").show()
        $("#otp_button").show()
        $("#aadhaar_number").prop("disabled", true);
        $.ajax({
            url:"http://localhost:8082/verify",
            method:"POST",
            async:true,
            contentType:"application/json; charset=utf-8",
            data:JSON.stringify({
                aadharno:aadhaar
            }),
            success:(response)=>{
                console.log(response)
                alert("got some response from server")
            },
            error:(xhr,error_type,exception)=>{
                var error_message = xhr.responseText
                alert(`${error_message}`)
                $("#aadhaar_number").prop("disabled", false);
            }
        })
    }
})

$("#otp_button").on("click",()=>{
    var aadhar = $("#aadhaar_number").val()?.toString()!
    var otp = $("#otp").val()?.toString()!
    console.log(aadhar,otp)
    $.ajax({
        url:"http://localhost:8082/verifyOTP",
        method:"POST",
        async:true,
        contentType:"application/json; charset=utf-8",
        data:JSON.stringify({
            aadharno:aadhar,
            OTP:otp
        }),
        success:(response)=>{
            console.log(response)
            is_verified = "ok"
            alert("got some response from server")
        },
        error:(xhr,error_type,exception)=>{
            var error_message = xhr.responseText
            alert(`Problem connecting with ${error_message}`)
            $("#aadhaar_number").prop("disabled", false);

        }
    })
})

$("#contact__details_previous").on("click",()=>{

    $(".contact__details").hide()
    $(".submit_button").hide()
    $(".company_details").fadeTo("slow",1)


})

$("#company_button_back").on("click",()=>{
    $(".company_details").hide()
    $(".account_details").fadeTo("slow",1)

})

function account_validate(username: string ,password: string,confirm_password: string):number{
    if (username === ""){
        $("#error_para").text("Error : Username field cannot be empty")
        //$("#username").attr('style', "border-radius: 5px; border:#FF0000 1px solid;");
        //$("#username").focus()
        return 0
    }
    if(username.length < 7 || username.length >15){
        $("#error_para").text("Error : Username should be greater than six characters and less than 15 characters")
        return 0
    }
    if(/[^a-zA-Z0-9]/.test(username)==true){
        $("#error_para").text("Error : Username contains inappropriate characters")
        return 0
    }
    if(password === ""){
        $("#error_para").text("Error : Password field cannot be empty")
        return 0
    }
    
    if(password.length<5 || password.length>15){
        $("#error_para").text("Error : Password has to be greater than six characters and less than 15 characters")
        return 0
    }
    if(confirm_password === ""){
        $("#error_para").text("Error : Confirm Password field cannot be empty")
        return 0
    }
    if(password !== confirm_password){
        $("#error_para").text("Error : Password and Confirm Password fields do not match each other")
        return 0
    }

    $("#error_para").text("Success")
    return 1

}

function company_validate(company_name:string,company_address:string,company_email:string,mobile_number:string,registration_number:string,
    state:string,city:string,establishment_year:string,pincode:string,legal_status:string,pan_number:string,gst_register_number:string):number{
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
    if(mobile_number.length < 10 || mobile_number.length >10 ){
        $("#error_para").text("Error : Mobile Number Field has inappropriate length")
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
    if(city === "select"){
        $("#error_para").text("Error : City field has inappropriate value")
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
    if(pincode.length < 6 || pincode.length > 6){
        $("#error_para").text("Error : Pincode Number has inappropriate length")
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
    if(pan_number.length <10 || pan_number.length > 10){
        $("#error_para").text("Error : Pan Number has inappropriate length")
        return 0
    }
    if(gst_register_number === ""){
        $("#error_para").text("Error : GST Registration field  cannot be empty")
        return 0
    }
    if(gst_register_number.length < 15 || gst_register_number.length > 15){
        $("#error_para").text("Error : GST Registration Number has inappropriate length")
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