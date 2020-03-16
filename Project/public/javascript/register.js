"use strict";
<<<<<<< HEAD
var username;
var password;
var title;
var contact_name;
var date_of_birth;
var designation;
var aadhaar_number;
var contact_email;
var contact_contact;
var company_name;
var company_address;
var company_email;
var mobile_number;
var registration_number;
var state;
var city;
var establishment_year;
var pincode;
var legal_status;
var pan_number;
=======
>>>>>>> deb319e33dbf6cbbc734e6d1ffae1a3704eca409
load_years();
load_states();
load_legal_status();
function load_years() {
    var end_year = 1700;
    var current_year = new Date().getFullYear();
    for (var i = current_year; i >= end_year; i--) {
        $("<option></option>", {
            "value": i.toString(),
            "text": i.toString()
        }).appendTo("#establishment_year");
    }
}
function load_states() {
    $.ajax({
        url: "http://localhost:8081/misc/get-state",
        method: "POST",
        async: true,
        success: function (response) {
            var message = response;
            for (var _i = 0, message_1 = message; _i < message_1.length; _i++) {
                var i = message_1[_i];
                $("<option></option>", {
                    "text": i.state_name,
                    "value": i.st_id
                }).appendTo("#state");
            }
        },
        statusCode: {
            400: function () {
                alert("some error");
            }
        },
        error: function (xhr, error_type, exception) {
            var error_message = xhr.responseText;
            alert("Problem connecting with " + error_message);
        }
    });
}
function load_legal_status() {
    $.ajax({
        url: "http://localhost:8081/misc/get-legal-status",
        method: "POST",
        async: true,
        success: function (response) {
            var message = response;
            for (var _i = 0, message_2 = message; _i < message_2.length; _i++) {
                var i = message_2[_i];
                $("<option></option>", {
                    "text": i.l_name,
                    "value": i.l_id
                }).appendTo("#legal_status");
            }
        },
        statusCode: {
            400: function () {
                alert("some error");
            }
        },
        error: function (xhr, error_type, exception) {
            var error_message = xhr.responseText;
            alert("Problem connecting with " + error_message);
        }
    });
}
<<<<<<< HEAD
$("#submit_button").on("click", function () {
    var _a, _b, _c, _d, _e, _f, _g;
    title = (_a = $("#title").val()) === null || _a === void 0 ? void 0 : _a.toString();
    contact_name = (_b = $("#contact_name").val()) === null || _b === void 0 ? void 0 : _b.toString();
    date_of_birth = (_c = $("#date_of_birth").val()) === null || _c === void 0 ? void 0 : _c.toString();
    designation = (_d = $("#designation").val()) === null || _d === void 0 ? void 0 : _d.toString();
    aadhaar_number = (_e = $("#aadhaar_number").val()) === null || _e === void 0 ? void 0 : _e.toString();
    contact_email = (_f = $("#contact_email").val()) === null || _f === void 0 ? void 0 : _f.toString();
    contact_contact = (_g = $("#contact_contact").val()) === null || _g === void 0 ? void 0 : _g.toString();
    var check_contact = contact_validate(title, contact_name, date_of_birth, designation, aadhaar_number, contact_email, contact_contact);
    if (check_contact === 1) {
        var abc = {
            account_details: {
                username: username,
                password: password
            },
            company_details: {},
            contact__details: {
                title: title,
                contact_name: company_name,
                date_of_birth: date_of_birth,
                designation: designation,
                aadhaar_number: aadhaar_number,
                contact_email: company_email,
                contact_contact: contact_contact
            }
        };
        console.log(abc);
        $.ajax({
            url: "http://localhost:8081/register/register-data",
            method: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(abc),
            async: true,
            success: function (response) {
                alert("got some response from server");
            },
            error: function (xhr, error_type, exception) {
                var error_message = xhr.responseText;
                alert("Problem connecting with " + error_message);
            }
        });
    }
});
$("#account_button").on("click", function () {
    var _a, _b, _c;
    username = (_a = $("#username").val()) === null || _a === void 0 ? void 0 : _a.toString();
    password = (_b = $("#password").val()) === null || _b === void 0 ? void 0 : _b.toString();
    var confirm_password = (_c = $("#confirm_password").val()) === null || _c === void 0 ? void 0 : _c.toString();
    var check_account = account_validate(username, password, confirm_password);
    if (check_account === 1) {
        $(".company_details").show();
        $(".account_details").hide();
    }
    // $(".account_details").hide()
    //$(".company_details").show()
    //var state = $("#state :selected").text()
=======
$("#account_button").on("click", function () {
    $(".account_details").hide();
    $(".company_details").show();
    //var state = $("#state :selected").text()
    //console.log(state)
>>>>>>> deb319e33dbf6cbbc734e6d1ffae1a3704eca409
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
});
$("#company_button").on("click", function () {
<<<<<<< HEAD
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    company_name = (_a = $("#company_name").val()) === null || _a === void 0 ? void 0 : _a.toString();
    company_address = (_b = $("#company_address").val()) === null || _b === void 0 ? void 0 : _b.toString();
    company_email = (_c = $("#company_email").val()) === null || _c === void 0 ? void 0 : _c.toString();
    mobile_number = (_d = $("#mobile_number").val()) === null || _d === void 0 ? void 0 : _d.toString();
    registration_number = (_e = $("#registration_number").val()) === null || _e === void 0 ? void 0 : _e.toString();
    state = (_f = $("#state").val()) === null || _f === void 0 ? void 0 : _f.toString();
    city = (_g = $("#city").val()) === null || _g === void 0 ? void 0 : _g.toString();
    establishment_year = (_h = $("#establishment_year").val()) === null || _h === void 0 ? void 0 : _h.toString();
    pincode = (_j = $("#pincode").val()) === null || _j === void 0 ? void 0 : _j.toString();
    legal_status = (_k = $("#legal_status").val()) === null || _k === void 0 ? void 0 : _k.toString();
    pan_number = (_l = $("#pan_number").val()) === null || _l === void 0 ? void 0 : _l.toString();
    var check_company = company_validate(company_name, company_address, company_email, mobile_number, registration_number, state, city, establishment_year, pincode, legal_status, pan_number);
    if (check_company === 1) {
        $(".company_details").hide();
        $(".contact__details").show();
        $(".submit_button").show();
    }
});
$("#contact__details_previous").on("click", function () {
    $(".contact__details").hide();
    $(".company_details").show();
    $(".submit_button").hide();
});
function account_validate(username, password, confirm_password) {
    var reg = /^[a-zA-Z0-9_]{5,}[a-zA-Z]+[0-9]*$/;
    if (username === "") {
        console.log("emppty");
        $("#error_para").text("Error : Username field cannot be empty");
        return 0;
    }
    if (password === "") {
        $("#error_para").text("Error : Password field cannot be empty");
        return 0;
    }
    if (confirm_password === "") {
        $("#error_para").text("Error : Confirm Password field cannot be empty");
        return 0;
    }
    if (username.length < 7 || username.length > 15) {
        $("#error_para").text("Error : Username should be greater than six characters and less than 15 characters");
        return 0;
    }
    if (reg.test(username) == false) {
        $("#error_para").text("Error : Username contains inappropriate characters");
        return 0;
    }
    if (password.length < 5) {
        $("#error_para").text("Error : Password has to be greater than four characters ");
        return 0;
    }
    if (password !== confirm_password) {
        $("#error_para").text("Error : Password and Confirm Password fields do not match each other");
        return 0;
    }
    $("#error_para").text("Success");
    return 1;
}
function company_validate(company_name, company_address, company_email, mobile_number, registration_number, state, city, establishment_year, pincode, legal_status, pan_number) {
    if (company_name === "") {
        $("#error_para").text("Error : Company Name field cannot be empty");
        return 0;
    }
    if (company_address === "") {
        $("#error_para").text("Error : Company Address field cannot be empty");
        return 0;
    }
    if (company_email === "") {
        $("#error_para").text("Error : Company Email Address cannot be empty");
        return 0;
    }
    if (mobile_number === "") {
        $("#error_para").text("Error :Company Mobile Number cannot be empty");
        return 0;
    }
    if (registration_number === "") {
        $("#error_para").text("Error : Registration Number field cannot be empty");
        return 0;
    }
    if (state === "select") {
        $("#error_para").text("Error : State field has inappropriate value");
        return 0;
    }
    if (city === "") {
        $("#error_para").text("Error : City field cannot be empty");
        return 0;
    }
    if (establishment_year === "select") {
        $("#error_para").text("Error : Establishment year field has inappropriate value");
        return 0;
    }
    if (pincode === "") {
        $("#error_para").text("Error : Pincode field cannot be empty");
        return 0;
    }
    if (legal_status === "select") {
        $("#error_para").text("Error : Legal Status field has inappropriate field");
        return 0;
    }
    if (pan_number === "") {
        $("#error_para").text("Error : Pan Number field cannot be empty");
        return 0;
    }
    $("#error_para").text("Success");
    return 1;
}
function contact_validate(title, contact_name, date_of_birth, designation, aadhaar_number, contact_email, contact_contact) {
    if (title === "select") {
        $("#error_para").text("Error : Title field has an inappropriate value");
        return 0;
    }
    if (contact_name === "") {
        $("#error_para").text("Error :  Contact Name field cannot be empty value");
        return 0;
    }
    if (date_of_birth === "") {
        $("#error_para").text("Error : Date of Birth field cannot be empty");
        return 0;
    }
    if (designation === "") {
        $("#error_para").text("Error : Designation field cannot be empty");
        return 0;
    }
    if (aadhaar_number === "") {
        $("#error_para").text("Error : Aadhaar Number field cannot be empty or has invalid characters");
        return 0;
    }
    if (contact_email === "") {
        $("#error_para").text("Error : Email Address field cannot be empty or has invalid characters");
        return 0;
    }
    if (contact_contact === "") {
        $("#error_para").text("Error : Mobile Number field cannot be empty or has invalid characters");
        return 0;
    }
    if (aadhaar_number.length < 12 || aadhaar_number.length > 12) {
        $("#error_para").text("Error : Aadhaar Number has inappropriate length");
        return 0;
    }
    if (contact_contact.length < 10 || contact_contact.length > 10) {
        $("#error_para").text("Error : Mobile Number has inappropriate length");
        return 0;
    }
    if (/^[0-9]+$/.test(contact_contact) == false) {
        $("#error_para").text("Error : Mobile Number has invalid characters");
        return 0;
    }
    $("#error_para").text("Success");
    return 1;
}
=======
    $(".company_details").hide();
    $(".contact__details").show();
});
>>>>>>> deb319e33dbf6cbbc734e6d1ffae1a3704eca409
