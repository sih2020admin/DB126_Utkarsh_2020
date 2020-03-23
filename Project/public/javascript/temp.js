"use strict";
$("#tender_select_button").on("click", function () {
    var _a;
    var dept_id = (_a = $("#department").val()) === null || _a === void 0 ? void 0 : _a.toString();
    $.ajax({
        url: "http://localhost:8081/gettenderlist_bid",
        method: "POST",
        async: true,
        data: {
            dept_id: dept_id
        },
        success: function (response) {
            console.log(response);
        },
        error: function (xhr, error_type, exception) {
            var error_message = xhr.responseText;
            alert("Problem connecting with " + error_message);
        }
    });
});
/*
for(let x = 1 ; x<3 ; x++){
    $( "<div></div>", {
        class:"tender_content",
        id:x,
        html:`<button class="tender_button" onclick=apply(${x})>click me</button>`
      }).appendTo("#body_content");
}

function apply(app:string){
    
}
 */
