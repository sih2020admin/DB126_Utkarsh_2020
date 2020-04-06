var et_id = location.toString().split("=%20")[1]
declare var alertify:any
var baseURL:string = `${location.protocol}//${location.host}`
$.ajax({
    url:`${baseURL}/get_application`,
    async:true,
    method:"POST",
    data:{
        et_id
    },
    success:(response)=>{
        var count = 1
        for (let x of response){
            console.log(response)
            $( "<div></div>", {
                class:"vendor_details",
                id:count,
                html:`  <div class="hello"><label for="v_name${count}">Name</label><p id="v_name${count}"> ${x.v_name}</p></div>
                        <label for="v_mobile${count}">Mobile Number</label><p id="v_mobile${count}"> ${x.v_mobile}</p>
                        <label for="v_reg_no${count}">Register Number</label><p id="v_reg_no${count}"> ${x.v_reg_no}</p>
                        <label for="v_email${count}">Email Address</label><p id="v_email${count}"> ${x.v_email}</p>
                        <label for="v_gst${count}">GST Number</label><p id="v_gst${count}"> ${x.v_gst}</p>
                        <label for="v_pan${count}">Pan Number</label><p id="v_pan${count}"> ${x.v_pan}</p>
                        <label for="v_yoe${count}">Year of Establishment</label><p id="v_yoe${count}"> ${x.v_yoe}</p>
                        <label for="v_address${count}">Address</label><p id="v_address${count}"> ${x.v_address}</p>
                        <input type="hidden" id="et_id${count}" value="${x.et_id}">                       
                         <input type="hidden" id="etd_id${count}" value="${x.etd_id}">
                        <label for="v_pincode${count}">Pincode</label><p id="v_pincode${count}"> ${x.v_pincode}</p>
                        <button id=approve_button${count} onclick=approve(${count})>Approve</button>`
              }).appendTo("#main_content");
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

function approve(value:string){
    alertify.confirm('Final Confirmation', 'Would you like to approve this application for this tender?', function(){ 
        $.ajax({
            url:`${baseURL}/approve_tender_application`,
            async:true,
            method:"POST",
            data:{
                et_id:$(`#et_id${value}`).val(),
                etd_id:$(`#etd_id${value}`).val()
            },
            success:(response)=>{
                alertify.success('Done')

                /* if (response === "ok"){
                    alertify.success('Done')
                        //alert("this tender has been approved and no further approval can be performed on this tendor")
                } */
                },
            error:(xhr,error_type,exception)=>{
                if (xhr.status == 0){
                    console.log("No response from Server")
                    alertify.error('No response from server')
                    //alert("No response from server")
                }
                if(xhr.status == 400 ){
                    console.log("Bad Request")
                    alertify.error('Bad Request')
                    //alert("Bad Request")
                }
            }
        })
         },
         function(){ alertify.error('Cancel')}).set('labels', {ok:'Yes', cancel:'No'});
    
               
}
