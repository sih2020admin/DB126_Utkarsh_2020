"use strict";
var _a;
var xhr = new XMLHttpRequest();
var xhr1 = new XMLHttpRequest();
var message;
load_years();
load_states();
load_legal_status();
function load_years() {
    var end_year = 1700;
    var current_year = new Date().getFullYear();
    var year = document.getElementById("establishment_year");
    for (var i = current_year; i >= end_year; i--) {
        var option = document.createElement("option");
        option.text = i.toString();
        option.value = i.toString();
        year.add(option);
    }
}
function load_states() {
    var state = document.getElementById("state");
    var url = "http://localhost:8081/misc/get-state";
    xhr1.open('POST', url, true);
    xhr1.setRequestHeader('Content-Type', 'application/json');
    xhr1.onload = function () {
        if (this.status == 200) {
            message = JSON.parse(this.responseText);
            for (var _i = 0, message_1 = message; _i < message_1.length; _i++) {
                var i = message_1[_i];
                var option = document.createElement("option");
                option.text = i.state_name;
                option.value = i.st_id;
                state.add(option);
            }
        }
        else if (this.status == 400) {
            message = this.responseText;
            alert(message);
        }
        else {
            alert(message);
        }
    };
    xhr1.onerror = function () {
        alert("Check your network or try again later");
    };
    xhr1.send();
}
function load_legal_status() {
    var legal = document.getElementById("legal_status");
    var url = "http://localhost:8081/misc/get-legal-status";
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (this.status == 200) {
            message = JSON.parse(this.responseText);
            for (var _i = 0, message_2 = message; _i < message_2.length; _i++) {
                var i = message_2[_i];
                var option = document.createElement("option");
                option.text = i.l_name;
                option.value = i.l_id;
                legal.add(option);
            }
        }
        else if (this.status == 400) {
            message = this.responseText;
            alert(message);
        }
        else {
            alert(message);
        }
    };
    xhr.onerror = function () {
        alert("Check your network or try again later");
    };
    xhr.send();
}
(_a = document.getElementById("submit_button")) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
    var state = document.getElementById("state");
    console.log(state.value);
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
