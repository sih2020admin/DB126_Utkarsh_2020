var username: string
var password: string
var title: string
var contact_name: string
var date_of_birth: string
var designation: string
var aadhaar_number: string
var contact_email: string
var contact_contact: string
var company_name: string
var company_address: string
var company_email: string
var mobile_number: string
var registration_number: string
var state: string
var city: string
var establishment_year: string
var pincode: string
var legal_status: string
var pan_number: string
var gst_register_number: string
var is_verified: string
load_years()
load_states()
load_legal_status()
$('#city').prop('disabled', true)

function clear_account_details() {
    $('#username').val('')
    $('#password').val('')
    $('#confirm_password').val('')
}
// loading years
function load_years() {
    const end_year: number = 1700
    const current_year: number = new Date().getFullYear()
    for (var i: number = current_year; i >= end_year; i--) {
        $('<option></option>', {
            value: i.toString(),
            text: i.toString(),
        }).appendTo('#establishment_year')
    }
}

// loading states from database
function load_states() {
    $.ajax({
        url: `/misc/get-state`,
        method: 'POST',
        async: true,
        success: (response) => {
            var message = response
            for (let i of message) {
                $('<option></option>', {
                    text: i.st_name,
                    value: i.st_id,
                }).appendTo('#state')
            }
        },
        statusCode: {
            400: () => {
                alert('some error')
            },
        },
        error: (xhr, error_type, exception) => {
            var error_message = xhr.responseText
            alert(`Problem connecting with ${error_message}`)
        },
    })
}

// loading cities dynamically by taking checking state field after each change
function load_cities(state_code: string) {
    $.ajax({
        url: `/misc/get-city`,
        method: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({
            state_code: state_code,
        }),
        success: (response) => {
            var message = response
            for (let i of message) {
                $('<option></option>', {
                    text: i.c_name,
                    value: i.c_id,
                }).appendTo('#city')
            }
        },
        statusCode: {
            400: () => {
                alert('some error')
            },
        },
        error: (xhr, error_type, exception) => {
            var error_message = xhr.responseText
            alert(`Problem connecting with ${error_message}`)
        },
    })
}
$('#state').change(() => {
    $('#city').prop('disabled', false)
    $('#city').empty()
    $('<option></option>', {
        text: '--select--',
        value: 'select',
    }).appendTo('#city')
    load_cities($('#state').val()?.toString()!)
})

// loading legal status field from databse
function load_legal_status() {
    $.ajax({
        url: `/misc/get-legal-status`,
        method: 'POST',
        async: true,
        success: (response) => {
            var message = response
            for (let i of message) {
                $('<option></option>', {
                    text: i.l_name,
                    value: i.l_id,
                }).appendTo('#legal_status')
            }
        },
        statusCode: {
            400: () => {
                alert('some error')
            },
        },
        error: (xhr, error_type, exception) => {
            var error_message = xhr.responseText
            alert(`Problem connecting with ${error_message}`)
        },
    })
}
// validation for contact details
$/* ('#submit_button').on('click', () => {
    title = $('#title').val()?.toString()!
    contact_name = $('#contact_name').val()?.toString()!
    date_of_birth = $('#date_of_birth').val()?.toString()!
    designation = $('#designation').val()?.toString()!
    aadhaar_number = $('#aadhaar_number').val()?.toString()!
    contact_email = $('#contact_email').val()?.toString()!
    contact_contact = $('#contact_contact').val()?.toString()!
    var check_contact = contact_validate(title, contact_name, date_of_birth, designation, aadhaar_number, contact_email, contact_contact)
    if (check_contact === true) {
        console.log(is_verified)
        if (is_verified != 'ok') {
            $('#error_para').text('Error : Aadhaar Number is not verified \n Click on verify to start verifying it')
        } else {
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
            }
            $.ajax({
                url: `/register/register-data`,
                method: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(abc),
                async: true,
                success: (response) => {
                    $('#error_para').html('Registration done<br>You will be redirected to login page in few seconds')
                    setTimeout(() => {
                        window.location.href = '/v1_login.html'
                    }, 3000)
                },
                error: (xhr, error_type, exception) => {
                    var error_message = xhr.responseText
                    alert(`${error_message}`)
                },
            })
        }
    }
}) */

// validation for account_details
$('#account_button').on('click', () => {
    username = $('#username').val()?.toString()!
    password = $('#password').val()?.toString()!
    var confirm_password: string = $('#confirm_password').val()?.toString()!
    var check_account: boolean = account_validate(username, password, confirm_password)
    if (check_account === true) {
        //clear_account_details()
        $.ajax({
            url: '/misc/check-username',
            method: 'POST',
            async: true,
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                username,
            }),
            success: (response) => {
                if (response === 'ok') {
                    $('.account_details').hide()
                    $('.company_details').fadeTo('fast', 1)
                    $('#error_para').html('')
                } else if (response === 'Username already exists') {
                    $('#error_para').html(response)
                } else {
                    $('#error_para').html(response)
                }
            },
            error: (xhr, error_type, exception) => {
                var error_message = xhr.responseText
                console.log(`${error_message}`)
            },
        })
    }
})
// validation of company details
$('#company_button').on('click', () => {
    company_name = $('#company_name').val()?.toString()!
    company_address = $('#company_address').val()?.toString()!
    company_email = $('#company_email').val()?.toString()!
    mobile_number = $('#mobile_number').val()?.toString()!
    registration_number = $('#registration_number').val()?.toString()!
    state = $('#state').val()?.toString()!
    city = $('#city').val()?.toString()!
    establishment_year = $('#establishment_year').val()?.toString()!
    pincode = $('#pincode').val()?.toString()!
    legal_status = $('#legal_status').val()?.toString()!
    pan_number = $('#pan_number').val()?.toString()!
    gst_register_number = $('#gst_register_number').val()?.toString()!
    var check_company = company_validate(company_name, company_address, company_email, mobile_number, registration_number, state, city, establishment_year, pincode, legal_status, pan_number, gst_register_number)
    if (check_company === true) {
        $.ajax({
            url: '/misc/check-company',
            method: 'POST',
            async: true,
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                gst_register_number,
                pan_number,
                registration_number,
            }),
            success: (response) => {
                if (response === '') {
                    $('.company_details').hide()
                    $('.contact__details').fadeTo('fast', 1)
                    //$('.submit_button').fadeTo('fast', 1)
                    $('.submit_button').hide()
                    $('#error_para').html('')
                } else {
                    $('#error_para').html(response)
                }
            },
            error: (xhr, error_type, exception) => {
                var error_message = xhr.responseText
                console.log(`${error_message}`)
            },
        })
    }
})

$('#verify_button').on('click', () => {
    title = $('#title').val()?.toString()!
    contact_name = $('#contact_name').val()?.toString()!
    date_of_birth = $('#date_of_birth').val()?.toString()!
    designation = $('#designation').val()?.toString()!
    aadhaar_number = $('#aadhaar_number').val()?.toString()!
    contact_email = $('#contact_email').val()?.toString()!
    contact_contact = $('#contact_contact').val()?.toString()!
    var check_contact = contact_validate(title, contact_name, date_of_birth, designation, aadhaar_number, contact_email, contact_contact)
    if (check_contact === true) {
        $('#error_para').text('An OTP has been sent to your Mobile Number and Email Address.<br>Please enter it in the below field')
        $('#verify_button').hide()
        $('#otp').show()
        $('#otp_button').show()
        $('#aadhaar_number').prop('disabled', true)
        $.ajax({
            url: `${location.protocol}//${location.hostname}:8082/verify`,
            method: 'POST',
            async: true,
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                aadharno: aadhaar_number,
            }),
            success: (response) => {
                console.log(response)
                $('#verify_button').hide()
                $(".contact__details").hide()
                $('#otp').show()
                $('#otp_button').show()
                console.log("Got a request from server and OTP generated")
            },
            error: (xhr, error_type, exception) => {
                var error_message = xhr.responseText
                alert(`${error_message}`)
                $('#aadhaar_number').prop('disabled', false)
            },
        })
    }
})

$('#otp_button').on('click', () => {
    var aadhar = $('#aadhaar_number').val()?.toString()!
    var otp = $('#otp').val()?.toString()!
    $('#otp').val("")
    console.log(aadhar, otp)
    $.ajax({
        url: `${location.protocol}//${location.hostname}:8082/verifyOTP`,
        method: 'POST',
        async: true,
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({
            aadharno: aadhar,
            OTP: otp,
        }),
        success: (response) => {
            console.log(response)
            console.log('OTP matched')
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
            }
            $.ajax({
                url: `/register/register-data`,
                method: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(abc),
                async: true,
                success: (response) => {
                    console.log(response)
                    console.log("Registered Successfully")
                    $('#error_para').html('Registration done<br>You will be redirected to login page in few seconds')
                    window.location.href = '/v1_login.html'
                },
                error: (xhr, error_type, exception) => {
                    var error_message = xhr.responseText
                    alert('error_message')

                },
            })
        },
        error: (xhr, error_type, exception) => {
            var error_message = xhr.responseText
            alert(`Problem connecting with ${error_message}`)
            $('#aadhaar_number').prop('disabled', false)
        },
    })
})

/* $('#contact__details_previous').on('click', () => {
    $('.contact__details').hide()
    $('.submit_button').hide()
    $('.company_details').fadeTo('slow', 1)
})

$('#company_button_back').on('click', () => {
    $('.company_details').hide()
    $('.account_details').fadeTo('slow', 1)
}) */

function account_validate(username: string, password: string, confirm_password: string): boolean {
    if (username === '') {
        $('#error_para').text('Error : Username field cannot be empty')
        //$("#username").attr('style', "border-radius: 5px; border:#FF0000 1px solid;");
        //$("#username").focus()
        return false
    }
    if (username.length < 7 || username.length > 15) {
        $('#error_para').text('Error : Username should be greater than six characters and less than 15 characters')
        return false
    }
    if (username.match(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/) === null) {
        $('#error_para').text('Error : Username contains inappropriate characters')
        return false
    }
    if (password === '') {
        $('#error_para').text('Error : Password field cannot be empty')
        return false
    }
    if (password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,15}/) === null) {
        $('#error_para').html('Password Field should contain at least : <br> - One Uppercase Character [A-Z]<br> - One Lowercase Character [a-z]<br> - One Number [0-9]<br> - One Special Character <br> Length of Password should be around 7 to 15 Characters')
        return false
    }
    if (confirm_password === '') {
        $('#error_para').text('Error : Confirm Password field cannot be empty')
        return false
    }
    if (password !== confirm_password) {
        $('#error_para').text('Error : Password and Confirm Password fields do not match each other')
        return false
    }
    return true
}

function company_validate(
    company_name: string,
    company_address: string,
    company_email: string,
    mobile_number: string,
    registration_number: string,
    state: string,
    city: string,
    establishment_year: string,
    pincode: string,
    legal_status: string,
    pan_number: string,
    gst_register_number: string
): boolean {
    if (company_name === '') {
        $('#error_para').text('Error : Company Name field cannot be empty')
        return false
    }
    if (company_address === '') {
        $('#error_para').text('Error : Company Address field cannot be empty')
        return false
    }
    if (company_email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) === null) {
        $('#error_para').text('Error : Invalid Email Address')
        return false
    }
    if (mobile_number.match(/^\d{10}$/) === null) {
        $('#error_para').text('Error : Invalid Mobile Number')
        return false
    }
    if (registration_number === '') {
        $('#error_para').text('Error : Company Registration Number field cannot be empty')
        return false
    }
    if (registration_number.length > 21 || registration_number.length < 21) {
        $('#error_para').text('Error : Invalid Company Registration Number ')
        return false
    }
    if (state === 'select') {
        $('#error_para').text('Error : State field has inappropriate value')
        return false
    }
    if (city === 'select') {
        $('#error_para').text('Error : City field has inappropriate value')
        return false
    }
    if (establishment_year === 'select') {
        $('#error_para').text('Error : Establishment year field has inappropriate value')
        return false
    }
    if (pincode.match(/^\d{6}$/) === null) {
        $('#error_para').text('Error : Invalid Pincode Field')
        return false
    }
    if (legal_status === 'select') {
        $('#error_para').text('Error : Legal Status field has inappropriate field')
        return false
    }
    if (pan_number === '') {
        $('#error_para').text('Error : Pan Number field cannot be empty')
        return false
    }
    if (pan_number.length < 10 || pan_number.length > 10) {
        $('#error_para').text('Error : Pan Number has inappropriate length')
        return false
    }
    if (gst_register_number === '') {
        $('#error_para').text('Error : GST Registration field  cannot be empty')
        return false
    }
    if (gst_register_number.length !== 15) {
        $('#error_para').text('Error : GST Registration Number has inappropriate length')
        return false
    }
    return true
}

function contact_validate(title: string, contact_name: string, date_of_birth: string, designation: string, aadhaar_number: string, contact_email: string, contact_contact: string): boolean {
    if (title === 'select') {
        $('#error_para').text('Error : Title field has an inappropriate value')
        return false
    }
    if (contact_name === '') {
        $('#error_para').text('Error :  Contact Name field cannot be empty value')
        return false
    }
    if (date_of_birth === '') {
        $('#error_para').text('Error : Date of Birth field cannot be empty')
        return false
    }
    if (designation === '') {
        $('#error_para').text('Error : Designation field cannot be empty')
        return false
    }
    if (aadhaar_number === '') {
        $('#error_para').text('Error : Aadhaar Number field cannot be empty or has invalid characters')
        return false
    }
    if (contact_email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) === null) {
        $('#error_para').text('Error : Invalid Email Address')
        return false
    }
    if (contact_contact === '') {
        $('#error_para').text('Error : Mobile Number field cannot be empty or has invalid characters')
        return false
    }
    if (aadhaar_number.match(/^\d{12}$/) === null) {
        $('#error_para').text('Error : Invalid Aadhaar Number')
        return false
    }
    if (contact_contact.match(/^\d{10}$/) === null) {
        $('#error_para').text('Error : Invalid Mobile Number')
        return false
    }
    $('#error_para').text('Success')
    return true
}
