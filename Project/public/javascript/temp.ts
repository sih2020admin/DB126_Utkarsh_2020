$("#tender_select_button").on("click",()=>{
    var dept_id = $("#department").val()?.toString()!
    $.ajax({
        url:"http://localhost:8081/gettenderlist_bid",
        method:"POST",
        async:true,
        data:{
            dept_id
        },
        success:(response)=>{
            console.log(response)
        },
        error:(xhr,error_type,exception)=>{
            var error_message = xhr.responseText
            alert(`Problem connecting with ${error_message}`)
        }
    })
})


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
