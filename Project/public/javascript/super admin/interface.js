$.post('/super-admin/approve-vendor').then((result) => {
    for (let i = 0; i < result.length; i++) {
        $('<div></div>', {
            class: 'cont',
            html: ` 
                    <h2>Company Details</h2>
                    <label class="fields" >Company Name</label><label>${result[i]["v_name"]}</label><br>
                    <label class="fields" >Company Address</label><label>${result[i]["v_address"]}</label><br>
                    <label class="fields" >Year of Establishment</label><label>${result[i]["v_yoe"]}</label><br>
                    <label class="fields" >Email Address</label><label>${result[i]["v_email"]}</label><br>
                    <label class="fields" >Mobile Number</label><label>${result[i]["v_mobile"]}</label><br>
                    <label class="fields" >Company Identification Number</label><label>${result[i]["v_reg_no"]}</label><br>
                    <label class="fields" >GST Number</label><label>${result[i]["v_gst"]}</label><br>
                    <label class="fields" >Legal Status</label><label>${result[i]["v_legal_id"]}</label><br>
                    <label class="fields" >Pan Number</label><label>${result[i]["v_pan"]}</label><br>
                    <label class="fields" >State</label><label>${result[i]["v_state_id"]}</label><br>
                    <label class="fields" >City</label><label>${result[i]["v_city_id"]}</label><br>
                    <label class="fields" >Pincode</label><label>${result[i]["v_pincode"]}</label><br>
                    <h2>Vendor Details</h2>
                    <label>Name</label><label>${result[i]["vcd_name"]}</label><br>
                    <label>Title</label><label>${result[i]["vcd_title"]}</label><br>
                    <label>Date of Birth</label><label>${result[i]["v_dob"]}</label><br>
                    <label>Aadhaar</label><label>${result[i]["vcd_aadhar"]}</label><br>
                    <label>Mobile Number</label><label>${result[i]["vcd_contact"]}</label><br>
                    <label>Email Addresse</label><label>${result[i]["vcd_email"]}</label><br>
                    <label>Designation</label><label>${result[i]["vcd_designation"]}</label><br>
                    <label>File URL</label><a href="${result[i]["furi"]}">Link</a><br><br>
                    <div class="butts">
                    <button data-vd_id="${result[i]["vd_id"]}" data-vcd_id="${result[i]["vcd_id"]}">Approve</button>
                    <button>Disapprove</button></div>
                 `,
        }).appendTo('#container')
    }
})
$('#container').click((e)=>{
    console.log(e.target.getAttribute('data-vd_id'),e.target.getAttribute('data-vcd_id'))
})
