"use strict";
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
var gst_register_number;
load_years();
load_states();
load_legal_status();
$("#city").prop("disabled", true);
// loading years
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
// loading states from database
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
                    "text": i.st_name,
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
// loading cities dynamically by taking checking state field after each change
function load_cities(state_code) {
    $.ajax({
        url: "http://localhost:8081/misc/get-city",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
            state_code: state_code
        }),
        success: function (response) {
            var message = response;
            console.log(message);
            for (var _i = 0, message_2 = message; _i < message_2.length; _i++) {
                var i = message_2[_i];
                $("<option></option>", {
                    "text": i.c_name,
                    "value": i.c_id
                }).appendTo("#city");
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
$("#state").change(function () {
    var _a;
    $("#city").prop("disabled", false);
    $("#city").empty();
    $("<option></option>", {
        "text": "--select--",
        "value": "select"
    }).appendTo("#city");
    load_cities((_a = $("#state").val()) === null || _a === void 0 ? void 0 : _a.toString());
});
// loading legal status field from databse
function load_legal_status() {
    $.ajax({
        url: "http://localhost:8081/misc/get-legal-status",
        method: "POST",
        async: true,
        success: function (response) {
            var message = response;
            for (var _i = 0, message_3 = message; _i < message_3.length; _i++) {
                var i = message_3[_i];
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
// validation for contact details
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
    console.log(title);
    if (check_contact === 1) {
        var abc = {
            account_details: {
                username: username,
                password: password
            },
            company_details: {
                company_name: company_name,
                company_address: company_address,
                company_email: company_email,
                mobile_number: mobile_number,
                registration_number: registration_number,
                state: state,
                city: city,
                establishment_year: establishment_year,
                pincode: pincode,
                legal_status: legal_status,
                pan_number: pan_number,
                gst_register_number: gst_register_number
            },
            contact_details: {
                title: title,
                contact_name: contact_name,
                date_of_birth: date_of_birth,
                designation: designation,
                aadhaar_number: aadhaar_number,
                contact_email: company_email,
                contact_contact: contact_contact
            }
        };
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
// validation for account_details
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
});
// validation of company details
$("#company_button").on("click", function () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
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
    gst_register_number = (_m = $("#gst_register_number").val()) === null || _m === void 0 ? void 0 : _m.toString();
    var check_company = company_validate(company_name, company_address, company_email, mobile_number, registration_number, state, city, establishment_year, pincode, legal_status, pan_number, gst_register_number);
    if (check_company === 1) {
        $(".company_details").hide();
        $(".contact__details").show();
        $(".submit_button").show();
    }
});
$("#verify_button").on("click", function () {
    var _a;
    var aadhaar = (_a = $("#aadhaar_number").val()) === null || _a === void 0 ? void 0 : _a.toString();
    if (aadhaar === "") {
        $("#error_para").text("Error : Aadhaar Number Filed cannot be empty");
    }
    else if (aadhaar.length < 12 || aadhaar.length > 12) {
        $("#error_para").text("Error : Aadhaar Number has inappropriate length");
    }
    else {
        $.ajax({
            url: "http://localhost:8082/verify",
            method: "POST",
            async: true,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                aadharno: aadhaar
            }),
            success: function (response) {
                console.log(response);
                alert("got some response from server");
            },
            error: function (xhr, error_type, exception) {
                var error_message = xhr.responseText;
                alert("Problem connecting with " + error_message);
            }
        });
    }
});
$("#otp_button").on("click", function () {
    var _a, _b;
    var aadhar = (_a = $("#aadhaar_number").val()) === null || _a === void 0 ? void 0 : _a.toString();
    var otp = (_b = $("#otp").val()) === null || _b === void 0 ? void 0 : _b.toString();
    console.log(aadhar, otp);
    $.ajax({
        url: "http://localhost:8082/verifyOTP",
        method: "POST",
        async: true,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
            aadharno: aadhar,
            OTP: otp
        }),
        success: function (response) {
            console.log(response);
            alert("got some response from server");
        },
        error: function (xhr, error_type, exception) {
            var error_message = xhr.responseText;
            alert("Problem connecting with " + error_message);
        }
    });
});
$("#contact__details_previous").on("click", function () {
    $(".contact__details").hide();
    $(".company_details").show();
    $(".submit_button").hide();
});
$("#company_button_back").on("click", function () {
    $(".account_details").show();
    $(".company_details").hide();
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
function company_validate(company_name, company_address, company_email, mobile_number, registration_number, state, city, establishment_year, pincode, legal_status, pan_number, gst_register_number) {
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
    if (city === "select") {
        $("#error_para").text("Error : City field has inappropriate value");
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
    if (gst_register_number === "") {
        $("#error_para").text("Error : GST Registration  field  cannot be empty");
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
