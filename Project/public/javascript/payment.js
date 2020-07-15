"use strict";
var baseURL = `${location.protocol}//${location.host}`;
function append_to_form(name, value) {
    $('<input>', {
        type: 'hidden',
        name,
        value,
    }).appendTo('#body_content');
}
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var et_id = urlParams.get('et_id')?.toString();
var etd_id = urlParams.get('etd_id')?.toString();
var code = urlParams.get('code');
if (code !== null) {
    $('#tsc_status').text('Transaction has failed');
}
append_to_form('etd_id', etd_id);
append_to_form('et_id', et_id);
$('#bg_tsc_button').on('click', (e) => {
    e.preventDefault();
    let check_form = 0;
    let amount = $('#amount1').val()?.toString();
    let email = $('#email').val()?.toString();
    let mobile = $('#mobile').val()?.toString();
    check_form = form_validate(amount, email, mobile);
    if (check_form === 1) {
        $('#body_content').submit();
    }
});
function form_validate(amount, email, mobile) {
    console.log(amount, email, mobile);
    if (amount === '') {
        $('#error-para').text('Amount field cannot be empty');
        return 0;
    }
    if (email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) === null) {
        $('#error-para').text('Invalid Email Address');
        return 0;
    }
    if (mobile.match(/^\d{10}$/) == null) {
        $('#error-para').text('Invalid Mobile Number');
        return 0;
    }
    $('#error-para').text('Success');
    return 1;
}
