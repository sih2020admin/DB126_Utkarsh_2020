$("#tender_select_button").on("click",()=>{
    var dept_id = $("#department").val()?.toString()!
    $("#tender_list").empty()
    $.ajax({
        url:"http://localhost:8081/gettenderlist_bid",
        method:"POST",
        async:true,
        data:{
            dept_id
        },
        success:(response)=>{
            var count = 1
            for (let x of response){
                console.log(x)
                $( "<div></div>", {
                    class:"tender_content",
                    id:count,
                    html:`  <label for="et_id${count}">Tender No.</label><p id="et_id${count}"> ${x.et_id}</p>
                            <label for="et_title${count}">Tender Title</label><p id="et_title${count}"> ${x.et_title}</p>
                            <label for="et_tender_ref_no${count}">Tender No.</label><p id="et_tender_ref_no${count}"> ${x.et_tender_ref_no}</p>
                            <label for="et_tender_desc${count}">Tender Description</label><p id="et_tender_desc${count}"> ${x.et_tender_desc}</p>
                            <label for="et_tender_fee${count}">Tender Fee</label><p id="et_tender_fee${count}"> ${x.et_tender_fee}</p>
                            <label for="et_last_date_apply${count}">Last Date for Applying</label><p id="et_last_date_apply${count}"> ${x.et_last_date_apply}</p>
                            <label for="et_file_uri${count}">File URL</label><p id="et_file_uri${count}"> <a href=${x.et_file_uri} target="_blank">Link</a></p>
                            <label for="et_bidding_date${count}">Tender Bidding Date</label><p id="et_bidding_date${count}"> ${x.et_bidding_date}</p>
                            <button class="tender_button" onclick=apply(${count})>click me</button>`
                  }).appendTo("#tender_list");
                  count ++
            }
        },
        error:(xhr,error_type,exception)=>{
            if (xhr.status == 0){
                console.log("No response from Server")
                alert("No response from server")
            }
            if(xhr.status == 400 ){
                console.log("Bad Request")
                alert("Bad Request")
            }
        }
    })
})

function apply(value:string){
    open("payment.html","_blank")
}

