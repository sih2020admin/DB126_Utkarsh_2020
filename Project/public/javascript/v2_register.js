"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
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
var is_verified;

    

$('#city').prop('disabled', true);
function clear_account_details() {
    $('#username').val('');
    $('#password').val('');
    $('#confirm_password').val('');
}
// loading cities dynamically by taking checking state field after each change
function load_cities(state_code) {
    $.ajax({
        url: "/misc/get-city",
        method: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({
            state_code: state_code,
        }),
        success: function (response) {
            var e_2, _a;
            var message = response;
            try {
                for (var message_2 = __values(message), message_2_1 = message_2.next(); !message_2_1.done; message_2_1 = message_2.next()) {
                    var i = message_2_1.value;
                    $('<option></option>', {
                        text: i.c_name,
                        value: i.c_name,
                    }).appendTo('#city');
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (message_2_1 && !message_2_1.done && (_a = message_2.return)) _a.call(message_2);
                }
                finally { if (e_2) throw e_2.error; }
            }
        },
        statusCode: {
            400: function () {
                alert('some error');
            },
        },
        error: function (xhr, error_type, exception) {
            var error_message = xhr.responseText;
            alert("Problem connecting with " + error_message);
        },
    });
}
$('#state').change(function () {
    var _a;
    $('#city').prop('disabled', false);
    $('#city').empty();
    $('<option></option>', {
        text: '--select--',
        value: 'select',
    }).appendTo('#city');
    load_cities((_a = $('#state').val()) === null || _a === void 0 ? void 0 : _a.toString());
});
// validation for account_details
$('#account_button').on('click', function () {
    var _a, _b, _c;
    username = (_a = $('#username').val()) === null || _a === void 0 ? void 0 : _a.toString();
    password = (_b = $('#password').val()) === null || _b === void 0 ? void 0 : _b.toString();
    var confirm_password = (_c = $('#confirm_password').val()) === null || _c === void 0 ? void 0 : _c.toString();
    var check_account = account_validate(username, password, confirm_password);
    if (check_account === true) {
        //clear_account_details()
        $.ajax({
            url: '/misc/check-username',
            method: 'POST',
            async: true,
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                username: username,
            }),
            success: function (response) {
                if (response === 'ok') {
                    $('.account_details').hide();
                    $('.company_details').fadeTo('fast', 1);
                    $('#error_para').html('');
                    document.getElementById("first").classList.add("active");
                }
                else if (response === 'Username already exists') {
                    $('#error_para').html(response);
                }
                else {
                    $('#error_para').html(response);
                }
            },
            error: function (xhr, error_type, exception) {
                var error_message = xhr.responseText;
                console.log("" + error_message);
            },
        });
    }
});
// validation of company details
$('#company_button').on('click', function () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    company_name = (_a = $('#company_name').val()) === null || _a === void 0 ? void 0 : _a.toString();
    company_address = (_b = $('#company_address').val()) === null || _b === void 0 ? void 0 : _b.toString();
    company_email = (_c = $('#company_email').val()) === null || _c === void 0 ? void 0 : _c.toString();
    mobile_number = (_d = $('#mobile_number').val()) === null || _d === void 0 ? void 0 : _d.toString();
    registration_number = (_e = $('#registration_number').val()) === null || _e === void 0 ? void 0 : _e.toString();
    state = (_f = $('#state').val()) === null || _f === void 0 ? void 0 : _f.toString();
    city = (_g = $('#city').val()) === null || _g === void 0 ? void 0 : _g.toString();
    establishment_year = (_h = $('#establishment_year').val()) === null || _h === void 0 ? void 0 : _h.toString();
    pincode = (_j = $('#pincode').val()) === null || _j === void 0 ? void 0 : _j.toString();
    legal_status = (_k = $('#legal_status').val()) === null || _k === void 0 ? void 0 : _k.toString();
    pan_number = (_l = $('#pan_number').val()) === null || _l === void 0 ? void 0 : _l.toString();
    gst_register_number = (_m = $('#gst_register_number').val()) === null || _m === void 0 ? void 0 : _m.toString();
    var check_company = company_validate(company_name, company_address, company_email, mobile_number, registration_number, state, city, establishment_year, pincode, legal_status, pan_number, gst_register_number);
    if (check_company === true) {
        $.ajax({
            url: '/misc/check-company',
            method: 'POST',
            async: true,
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                gst_register_number: gst_register_number,
                pan_number: pan_number,
                registration_number: registration_number,
            }),
            success: function (response) {
                if (response === '') {
                    $('.company_details').hide();
                    $('.contact__details').fadeTo('fast', 1);
                    document.getElementById("second").classList.add("active");
                    //$('.submit_button').fadeTo('fast', 1)
                    $('.submit_button').hide();
                    $('#error_para').html('');
                }
                else {
                    $('#error_para').html(response);
                }
            },
            error: function (xhr, error_type, exception) {
                var error_message = xhr.responseText;
                console.log("" + error_message);
            },
        });
    }
});
$('#contact_button').on('click', function () {
    var _a, _b, _c, _d, _e, _f, _g;
    title = (_a = $('#title').val()) === null || _a === void 0 ? void 0 : _a.toString();
    contact_name = (_b = $('#contact_name').val()) === null || _b === void 0 ? void 0 : _b.toString();
    date_of_birth = (_c = $('#date_of_birth').val()) === null || _c === void 0 ? void 0 : _c.toString();
    designation = (_d = $('#designation').val()) === null || _d === void 0 ? void 0 : _d.toString();
    // aadhaar_number = (_e = $('#aadhaar_number').val()) === null || _e === void 0 ? void 0 : _e.toString();
    contact_email = (_f = $('#contact_email').val()) === null || _f === void 0 ? void 0 : _f.toString();
    contact_contact = (_g = $('#contact_contact').val()) === null || _g === void 0 ? void 0 : _g.toString();
    var check_contact = contact_validate(title, contact_name, date_of_birth, designation, aadhaar_number, contact_email, contact_contact);
    if (check_contact === true) {
        
        $('.contact__details').hide();
        $('.aadhar__details').fadeTo('fast', 1);
        document.getElementById("third").classList.add("active");
        //$('.submit_button').fadeTo('fast', 1)
        // $('.submit_button').hide();
        $('#error_para').html('');

    }
});

function verify_aadhar(){
    var _e; 
    aadhaar_number = (_e = $('#aadhaar_number').val()) === null || _e === void 0 ? void 0 : _e.toString();
    if (aadhaar_number === '') {
        $('#error_para').text('Error : Aadhaar Number field cannot be empty or has invalid characters');
        return false;
    }
    if (aadhaar_number.match(/^\d{12}$/) === null) {
        $('#error_para').text('Error : Invalid Aadhaar Number');
        return false;
    }

    $('#error_para').text('An OTP has been sent to your Mobile Number and Email Address.Please enter it in the below field');
        // $('#verify_button').hide();
        // $('#otp').show();
        // $('#otp_button').show();
        $('#aadhaar_number').prop('disabled', true);
        $.ajax({
            url: "/sms/send",
            method: 'POST',
            async: true,
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                aadharno: aadhaar_number,
            }),
            success: function (response) {
                console.log(response);
                $('#verify_button').hide();
                // $(".contact__details").hide();
                $('#iotp').show();
                $('#otp').show();
		$('#otp_label').show();
                $('#otp_button').show();
                $('#change_aadhar_button').show();
                $('#resend_button').show();
                console.log("Got a request from server and OTP generated");
            },
            error: function (xhr, error_type, exception) {
                var error_message = xhr.responseText;
                alert("" + error_message);
                $('#aadhaar_number').prop('disabled', false);
            },
        });
}

$('#verify_button').on('click' ,function(){
    verify_aadhar();
});
$('#change_aadhar_button').on('click' ,function(){
    $('#aadhaar_number').prop('disabled', false);
    $('#verify_button').show();
    // $(".contact__details").hide();
    $('#iotp').hide();
    $('#otp').hide();
    $('#otp_button').hide();
    $('#change_aadhar_button').hide();
    $('#resend_button').hide();
});
$('#resend_button').on('click' ,function(){
    verify_aadhar();
});
$('#otp_button').on('click', function () {
    var _a, _b;
    var aadhar = (_a = $('#aadhaar_number').val()) === null || _a === void 0 ? void 0 : _a.toString();
    var otp = (_b = $('#otp').val()) === null || _b === void 0 ? void 0 : _b.toString();
    var _e; 
    // aadhaar_number = (_e = $('#aadhaar_number').val()) === null || _e === void 0 ? void 0 : _e.toString();
    if (otp === '') {
        $('#error_para').text('Error : Invalid OTP');
        return false;
    }
    if (otp.match(/^\d{6}$/) === null) {
        $('#error_para').text('Error : Invalid OTP');
        return false;
    }
    $('#otp').val("");
    console.log(aadhar, otp);
    $.ajax({
        url: "/verifyOTP",
        method: 'POST',
        async: true,
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({
            aadharno: aadhar,
            OTP: otp,
        }),
        success: function (response) {
            console.log(response);
            console.log('OTP matched');
            var abc = {
                account_details: {
                    username: username,
                    password: password,
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
                    gst_register_number: gst_register_number,
                },
                contact_details: {
                    title: title,
                    contact_name: contact_name,
                    date_of_birth: date_of_birth,
                    designation: designation,
                    aadhaar_number: aadhaar_number,
                    contact_email: contact_email,
                    contact_contact: contact_contact,
                },
            };
            $.ajax({
                url: "/register/register-data",
                method: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(abc),
                async: true,
                success: function (response) {
                    console.log(response);
                    console.log("Registered Successfully");
                    $('#error_para').html('Registration done<br>You will be redirected to login page in few seconds');
                    document.getElementById("fourth").classList.add("active");
                    Swal.fire({
                        title: 'Succesful',
                        text: 'Successfully registered',
                        icon: 'success',
                        showCancelButton: true,
                        confirmButtonColor: '#663EFD',
                        cancelButtonColor: '#a6a6a6',
                        confirmButtonText: 'Login',
                    }).then((result) => {window.location.href = '/login'})
                    
                   
                },
                error: function (xhr, error_type, exception) {
                    var error_message = xhr.responseText;
                    alert('error_message');
                },
            });
        },
        error: function (xhr, error_type, exception) {
            var error_message = xhr.responseText;
            alert("Problem connecting with " + error_message);
            $('#aadhaar_number').prop('disabled', false);
        },
    });
});
function account_validate(username, password, confirm_password) {
    if (username === '') {
        var all_invalids = document.getElementsByClassName("invalid");
        while (all_invalids.length)
            all_invalids[0].classList.remove("invalid");
        document.getElementById('username').classList.add("invalid")
        $('#error_para').text('Error : Username field cannot be empty');
        //$("#username").attr('style', "border-radius: 5px; border:#FF0000 1px solid;");
        //$("#username").focus()
        return false;
    }
    if (username.length < 7 || username.length > 15) {
        var all_invalids = document.getElementsByClassName("invalid");
        while (all_invalids.length)
            all_invalids[0].classList.remove("invalid");
        document.getElementById('username').classList.add("invalid")
        $('#error_para').text('Error : Username should be greater than six characters and less than 15 characters');
        return false;
    }
    if (username.match(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/) === null) {
        var all_invalids = document.getElementsByClassName("invalid");
        while (all_invalids.length)
            all_invalids[0].classList.remove("invalid");
        document.getElementById('username').classList.add("invalid")
        $('#error_para').text('Error : Username contains inappropriate characters');
        return false;
    }
    if (password === '') {
        var all_invalids = document.getElementsByClassName("invalid");
        while (all_invalids.length)
            all_invalids[0].classList.remove("invalid");
        document.getElementById('password').classList.add("invalid")
        $('#error_para').text('Error : Password field cannot be empty');
        return false;
    }
    if (password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,15}/) === null) {
        var all_invalids = document.getElementsByClassName("invalid");
        while (all_invalids.length)
            all_invalids[0].classList.remove("invalid");
        document.getElementById('password').classList.add("invalid")
        $('#error_para').html('Password Field should contain at least : <br> - One Uppercase Character [A-Z]<br> - One Lowercase Character [a-z]<br> - One Number [0-9]<br> - One Special Character <br> Length of Password should be around 7 to 15 Characters');
        return false;
    }
    if (confirm_password === '') {
        var all_invalids = document.getElementsByClassName("invalid");
        while (all_invalids.length)
            all_invalids[0].classList.remove("invalid");
        document.getElementById('confirm_password').classList.add("invalid")
        $('#error_para').text('Error : Confirm Password field cannot be empty');
        return false;
    }
    if (password !== confirm_password) {
        var all_invalids = document.getElementsByClassName("invalid");
        while (all_invalids.length)
            all_invalids[0].classList.remove("invalid");
        document.getElementById('confirm_password').classList.add("invalid")
        document.getElementById('password').classList.add("invalid")
        $('#error_para').text('Error : Password and Confirm Password fields do not match each other');
        return false;
    }
    return true;
}
function company_validate(company_name, company_address, company_email, mobile_number, registration_number, state, city, establishment_year, pincode, legal_status, pan_number, gst_register_number) {
    var mob = /^[1-9]{1}[0-9]{9}$/;
    var letters = /^[a-z]*$/i;
    if (company_name === '') {
        var all_invalids = document.getElementsByClassName("invalid");
        while (all_invalids.length)
            all_invalids[0].classList.remove("invalid");
        document.getElementById('company_name').classList.add("invalid")
        $('#error_para').text('Error : Company Name field cannot be empty');
        return false;
    }
    if (company_address === '') {
        var all_invalids = document.getElementsByClassName("invalid");
        while (all_invalids.length)
            all_invalids[0].classList.remove("invalid");
        document.getElementById('company_address').classList.add("invalid")
        $('#error_para').text('Error : Company Address field cannot be empty');
        return false;
    }
    if (company_email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) === null) {
        var all_invalids = document.getElementsByClassName("invalid");
        while (all_invalids.length)
            all_invalids[0].classList.remove("invalid");
        document.getElementById('company_email').classList.add("invalid")
        $('#error_para').text('Error : Invalid Email Address');
        return false;
    }
    if (mobile_number.match(/^\d{10}$/) === null) {
        var all_invalids = document.getElementsByClassName("invalid");
        while (all_invalids.length)
            all_invalids[0].classList.remove("invalid");
        document.getElementById('mobile_number').classList.add("invalid")
        $('#error_para').text('Error : Invalid Mobile Number');
        return false;
    }
/*    if (mobile_number.test(contact_contact) == false)  {
        var all_invalids = document.getElementsByClassName("invalid");
        while (all_invalids.length)
            all_invalids[0].classList.remove("invalid");
        document.getElementById('mobile_number').classList.add("invalid")
        $('#error_para').text('Error : Invalid Mobile Number');
        return false;
    }*/
    if (registration_number === '') {
        var all_invalids = document.getElementsByClassName("invalid");
        while (all_invalids.length)
            all_invalids[0].classList.remove("invalid");
        document.getElementById('registration_number').classList.add("invalid")
        $('#error_para').text('Error : Company Registration Number field cannot be empty');
        return false;
    }
    if (registration_number.length > 21 || registration_number.length < 15) {
        var all_invalids = document.getElementsByClassName("invalid");
        while (all_invalids.length)
            all_invalids[0].classList.remove("invalid");
        document.getElementById('registration_number').classList.add("invalid")
        $('#error_para').text('Error : Invalid Company Registration Number ');
        return false;
    }
    if (state === 'select') {
        var all_invalids = document.getElementsByClassName("invalid");
        while (all_invalids.length)
            all_invalids[0].classList.remove("invalid");
        document.getElementById('state').classList.add("invalid")
        $('#error_para').text('Error : State field has inappropriate value');
        return false;
    }
    if (city === 'select') {
        var all_invalids = document.getElementsByClassName("invalid");
        while (all_invalids.length)
            all_invalids[0].classList.remove("invalid");
        document.getElementById('city').classList.add("invalid")
        $('#error_para').text('Error : City field has inappropriate value');
        return false;
    }
    if (establishment_year === 'select') {
        var all_invalids = document.getElementsByClassName("invalid");
        while (all_invalids.length)
            all_invalids[0].classList.remove("invalid");
        document.getElementById('establishment_year').classList.add("invalid")
        $('#error_para').text('Error : Establishment year field has inappropriate value');
        return false;
    }
    if (pincode.match(/^\d{6}$/) === null) {
        var all_invalids = document.getElementsByClassName("invalid");
        while (all_invalids.length)
            all_invalids[0].classList.remove("invalid");
        document.getElementById('pincode').classList.add("invalid")
        $('#error_para').text('Error : Invalid Pincode Field');
        return false;
    }
   /* if (pincode.test(contact_contact) == false) {
        var all_invalids = document.getElementsByClassName("invalid");
        while (all_invalids.length)
            all_invalids[0].classList.remove("invalid");
        document.getElementById('pincode').classList.add("invalid")
        $('#error_para').text('Error : Invalid Pincode Field');
        return false;
    }*/
    if (legal_status === 'select') {
        var all_invalids = document.getElementsByClassName("invalid");
        while (all_invalids.length)
            all_invalids[0].classList.remove("invalid");
        document.getElementById('legal_status').classList.add("invalid")
        $('#error_para').text('Error : Legal Status field has inappropriate field');
        return false;
    }
    if (pan_number === '') {
        var all_invalids = document.getElementsByClassName("invalid");
        while (all_invalids.length)
            all_invalids[0].classList.remove("invalid");
        document.getElementById('pan_number').classList.add("invalid")
        $('#error_para').text('Error : Pan Number field cannot be empty');
        return false;
    }
    if (pan_number.length < 10 || pan_number.length > 10) {
        var all_invalids = document.getElementsByClassName("invalid");
        while (all_invalids.length)
            all_invalids[0].classList.remove("invalid");
        document.getElementById('pan_number').classList.add("invalid")
        $('#error_para').text('Error : Pan Number has inappropriate length');
        return false;
    }
    if (gst_register_number === '') {
        var all_invalids = document.getElementsByClassName("invalid");
        while (all_invalids.length)
            all_invalids[0].classList.remove("invalid");
        document.getElementById('gst_register_number').classList.add("invalid")
        $('#error_para').text('Error : GST Registration field  cannot be empty');
        return false;
    }
    if (gst_register_number.length !== 15) {
        var all_invalids = document.getElementsByClassName("invalid");
        while (all_invalids.length)
            all_invalids[0].classList.remove("invalid");
        document.getElementById('gst_register_number').classList.add("invalid")
        $('#error_para').text('Error : GST Registration Number has inappropriate length');
        return false;
    }
    return true;
}
function contact_validate(title, contact_name, date_of_birth, designation, aadhaar_number, contact_email, contact_contact) {
    var mob = /^[1-9]{1}[0-9]{9}$/;
    var letters = /^[a-z]*$/i;
    if (title === 'select') {
        var all_invalids = document.getElementsByClassName("invalid");
        while (all_invalids.length)
            all_invalids[0].classList.remove("invalid");
        document.getElementById('title').classList.add("invalid")
        $('#error_para').text('Error : Title field has an inappropriate value');
        return false;
    }
    if (contact_name === '') {
        var all_invalids = document.getElementsByClassName("invalid");
        while (all_invalids.length)
            all_invalids[0].classList.remove("invalid");
        document.getElementById('contact_name').classList.add("invalid")
        $('#error_para').text('Error :  Contact Name field cannot be empty value');
        return false;
    }
    if (! contact_name.match(letters)) {
        var all_invalids = document.getElementsByClassName("invalid");
        while (all_invalids.length)
            all_invalids[0].classList.remove("invalid");
        document.getElementById('contact_name').classList.add("invalid")
        $('#error_para').text('Error :  Contact Name Invalid');
        return false;
    }
    if (date_of_birth === '') {
        var all_invalids = document.getElementsByClassName("invalid");
        while (all_invalids.length)
            all_invalids[0].classList.remove("invalid");
        document.getElementById('date_of_birth').classList.add("invalid")
        $('#error_para').text('Error : Date of Birth field cannot be empty');
        return false;
    }
    if (designation === '') {
        var all_invalids = document.getElementsByClassName("invalid");
        while (all_invalids.length)
            all_invalids[0].classList.remove("invalid");
        document.getElementById('designation').classList.add("invalid")
        $('#error_para').text('Error : Designation field cannot be empty');
        return false;
    }
    if (! designation.match(letters)){
        var all_invalids = document.getElementsByClassName("invalid");
        while (all_invalids.length)
            all_invalids[0].classList.remove("invalid");
        document.getElementById('designation').classList.add("invalid")
        $('#error_para').text('Error : Designation field Invalid');
        return false;
    }
    
    if (contact_email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) === null) {
        var all_invalids = document.getElementsByClassName("invalid");
        while (all_invalids.length)
            all_invalids[0].classList.remove("invalid");
        document.getElementById('contact_email').classList.add("invalid")
        $('#error_para').text('Error : Invalid Email Address');
        return false;
    }
    if (contact_contact === '') {
        var all_invalids = document.getElementsByClassName("invalid");
        while (all_invalids.length)
            all_invalids[0].classList.remove("invalid");
        document.getElementById('contact_contact').classList.add("invalid")
        $('#error_para').text('Error : Mobile Number field cannot be empty or has invalid characters');
        return false;
    }
   
    if (contact_contact.match(/^\d{10}$/) === null) {
        var all_invalids = document.getElementsByClassName("invalid");
        while (all_invalids.length)
            all_invalids[0].classList.remove("invalid");
        document.getElementById('contact_contact').classList.add("invalid")
        $('#error_para').text('Error : Invalid Mobile Number');
        return false;
    }
    /*if (mob.test(contact_contact) == false){
        var all_invalids = document.getElementsByClassName("invalid");
        while (all_invalids.length)
            all_invalids[0].classList.remove("invalid");
        document.getElementById('contact_contact').classList.add("invalid")
        $('#error_para').text('Error : Invalid Mobile Number');
        return false;
    }*/
    $('#error_para').text('Success');
    return true;
}
