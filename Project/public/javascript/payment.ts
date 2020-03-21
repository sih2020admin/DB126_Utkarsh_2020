/* $(document).on("submit", "form", function(e){
    return false
    e.preventDefault();
});
 */
$("#bg_tsc_button").on("click",()=>{
    let check_form = 0
    let amount = $("#amount").val()?.toString()! 
    let email = $("#email").val()?.toString()!
    let mobile = $("#mobile").val()?.toString()!
    $("#body_content").submit()

    check_form = form_validate(amount,email,mobile)
    if (check_form === 1){
        $("#body_content").submit()
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
})

function form_validate(amount:string,email:string,mobile:string){
    
    console.log(amount,email,mobile)
    if(amount === ""){
        $("#error-para").text("Amount field cannot be empty")
        return 0
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
    if(email === ""){
        $("#error-para").text("Email field cannot be empty")
        return 0
    }
    if(mobile === ""){
        $("#error-para").text("Mobile field cannot be empty")
        return 0
    }
    $("#error-para").text("Success")
    return 1
}
