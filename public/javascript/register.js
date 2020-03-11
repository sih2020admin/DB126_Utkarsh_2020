"use strict";
var _a;
var xhr = new XMLHttpRequest();
var message;
(_a = document.getElementById("submit_button")) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    var email_id = (_a = document.getElementById("email_id")) === null || _a === void 0 ? void 0 : _a.value;
    var correspondence_email_id = (_b = document.getElementById("correspondence_email_id")) === null || _b === void 0 ? void 0 : _b.value;
    var mobile_number = (_c = document.getElementById("mobile_number")) === null || _c === void 0 ? void 0 : _c.value;
    var company_name = (_d = document.getElementById("company_name")) === null || _d === void 0 ? void 0 : _d.value;
    var registration_number = (_e = document.getElementById("registration_number")) === null || _e === void 0 ? void 0 : _e.value;
    var company_address = (_f = document.getElementById("company_address")) === null || _f === void 0 ? void 0 : _f.value;
    var city = (_g = document.getElementById("city")) === null || _g === void 0 ? void 0 : _g.value;
    var establishment_year = (_h = document.getElementById("establishment_year")) === null || _h === void 0 ? void 0 : _h.value;
    var legal_status = (_j = document.getElementById("legal_status")) === null || _j === void 0 ? void 0 : _j.value;
    var title = (_k = document.getElementById("title")) === null || _k === void 0 ? void 0 : _k.value;
    var contact_name = (_l = document.getElementById("company_name")) === null || _l === void 0 ? void 0 : _l.value;
    var date_of_birth = (_m = document.getElementById("date_of_birth")) === null || _m === void 0 ? void 0 : _m.value;
    var designation = (_o = document.getElementById("designation")) === null || _o === void 0 ? void 0 : _o.value;
    var aadhaar_number = (_p = document.getElementById("aadhaar_number")) === null || _p === void 0 ? void 0 : _p.value;
    var gst_registration_number = (_q = document.getElementById("gst_registration_number")) === null || _q === void 0 ? void 0 : _q.value;
    var url = "http://localhost:8081/register/register-data";
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (this.status == 200) {
            message = JSON.parse(this.responseText);
            alert(message);
        }
        else if (this.status == 400) {
            message = JSON.parse(this.responseText);
            alert(message);
        }
        else {
            alert(message);
        }
    };
    xhr.onerror = function () {
        alert("Check your network or try again later");
    };
    xhr.send(JSON.stringify({
        email_id: email_id,
        correspondence_email_id: correspondence_email_id,
        mobile_number: mobile_number,
        company_name: company_name,
        registration_number: registration_number,
        company_address: company_address,
        city: city,
        establishment_year: establishment_year,
        legal_status: legal_status,
        title: title,
        contact_name: contact_name,
        date_of_birth: date_of_birth,
        designation: designation,
        aadhaar_number: aadhaar_number,
        gst_registration_number: gst_registration_number
    }));
    console.log(title);
});
