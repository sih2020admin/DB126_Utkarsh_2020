"use strict";
$("#bg_tsc_button").on("click", function (e) {
    var _a, _b, _c;
    e.preventDefault();
    var check_form = 0;
    var amount = (_a = $("#amount").val()) === null || _a === void 0 ? void 0 : _a.toString();
    var email = (_b = $("#email").val()) === null || _b === void 0 ? void 0 : _b.toString();
    var mobile = (_c = $("#mobile").val()) === null || _c === void 0 ? void 0 : _c.toString();
    check_form = form_validate(amount, email, mobile);
    if (check_form === 1) {
        $("#body_content").submit();
    }
});
function form_validate(amount, email, mobile) {
    console.log(amount, email, mobile);
    if (amount === "") {
        $("#error-para").text("Amount field cannot be empty");
        return 0;
    }
    if (email === "") {
        $("#error-para").text("Email field cannot be empty");
        return 0;
    }
    if (mobile === "") {
        $("#error-para").text("Mobile field cannot be empty");
        return 0;
    }
    if (mobile.length < 10 || mobile.length > 10) {
        $("#error-para").text("Invalid Mobile Number");
        return 0;
    }
    $("#error-para").text("Success");
    return 1;
}
