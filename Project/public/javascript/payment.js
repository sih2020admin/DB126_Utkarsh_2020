"use strict";
/* $(document).on("submit", "form", function(e){
    return false
    e.preventDefault();
});
 */
$("#bg_tsc_button").on("click", function () {
    var _a, _b, _c;
    var check_form = 0;
    var amount = (_a = $("#amount").val()) === null || _a === void 0 ? void 0 : _a.toString();
    var email = (_b = $("#email").val()) === null || _b === void 0 ? void 0 : _b.toString();
    var mobile = (_c = $("#mobile").val()) === null || _c === void 0 ? void 0 : _c.toString();
    $("#body_content").submit();
    check_form = form_validate(amount, email, mobile);
    if (check_form === 1) {
        $("#body_content").submit();
    }
    /* $.ajax({
        url:"http://localhost:8081/payment",
        method:"POST",
        async:true,
        contentType:"application/json; charset=utf-8",
        data:JSON.stringify({
            tscid:$("#tscid").val()?.toString()!,
            amount:$("#amount").val()?.toString()!,
            email:$("#email").val()?.toString()!,
            mobile:$("#mobile").val()?.toString()!
        }),
        success:(response)=>{

            alert("got some response from server")
        },
        error:(xhr,error_type,exception)=>{
            var error_message = xhr.responseText
            alert(`${error_message}`)
            $("#aadhaar_number").prop("disabled", false);
        }
    }) */
});
function form_validate(amount, email, mobile) {
    console.log(amount, email, mobile);
    if (amount === "") {
        $("#error-para").text("Amount field cannot be empty");
        return 0;
    }
    /* if(/^[0-9\.]/.test(mobile) == true){
        $("#error-para").text("Invalid Amount")
        return 0
    }
    if(amount.split(".").length > 2){
        $("#error-para").text("Invalid Amount")
        return 0
    }
    if(amount.split(".")[1].length > 2){
        $("#error-para").text("Invalid Amount")
        return 0
    } */
    if (email === "") {
        $("#error-para").text("Email field cannot be empty");
        return 0;
    }
    if (mobile === "") {
        $("#error-para").text("Mobile field cannot be empty");
        return 0;
    }
    $("#error-para").text("Success");
    return 1;
}
