"use strict";
var _a, _b;
var baseURL = location.protocol + "//" + location.host;
function append_to_form(name, value) {
    $('<input>', {
        type: 'hidden',
        name: name,
        value: value,
    }).appendTo('#body_content');
}
var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var et_id = (_a = urlParams.get('et_id')) === null || _a === void 0 ? void 0 : _a.toString();
var etd_id = (_b = urlParams.get('etd_id')) === null || _b === void 0 ? void 0 : _b.toString();
var code = urlParams.get('code');
if (code !== null) {
    $('#tsc_status').text('Transaction has failed');
}
$.ajax({
    url: baseURL + "/tender_desc",
    method: 'POST',
    async: true,
    data: {
        et_id: et_id
    },
    success: function (response) {
        $('#amount1').val("" + response.et_tender_fee);
    },
    error: function (xhr, error_type, exception) {
        var error_message = xhr.responseText;
        alert("Problem connecting with " + error_message);
    },
});
append_to_form('etd_id', etd_id);
append_to_form('et_id', et_id);
$('#bg_tsc_button').on('click', function (e) {
    var _a, _b, _c;
    e.preventDefault();
    var check_form = 0;
    var amount = (_a = $('#amount1').val()) === null || _a === void 0 ? void 0 : _a.toString();
    var email = (_b = $('#email').val()) === null || _b === void 0 ? void 0 : _b.toString();
    var mobile = (_c = $('#mobile').val()) === null || _c === void 0 ? void 0 : _c.toString();
    check_form = form_validate(amount, email, mobile);
    if (check_form === 1) {
        $("#amount1").prop("disabled", false);
        $('#body_content').submit();
    }
});
function form_validate(amount, email, mobile) {
    console.log(amount, email, mobile);
    if (amount === '') {
        $('#error-para').text('Amount field cannot be empty');
        return 0;
    }
    if (email === '') {
        $('#error-para').text('Email field cannot be empty');
        return 0;
    }
    if (mobile === '') {
        $('#error-para').text('Mobile field cannot be empty');
        return 0;
    }
    if (mobile.length < 10 || mobile.length > 10) {
        $('#error-para').text('Invalid Mobile Number');
        return 0;
    }
    $('#error-para').text('Success');
    return 1;
}
