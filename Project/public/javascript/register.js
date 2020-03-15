"use strict";
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
$("#account_button").on("click", function () {
    $(".account_details").hide();
    $(".company_details").show();
    //var state = $("#state :selected").text()
    //console.log(state)
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
    $(".company_details").hide();
    $(".contact__details").show();
});
