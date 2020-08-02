$.post('/super-admin/approve-vendor').then((result) => {
    for (let i = 0; i < result.length; i++) {
        $('<div></div>', {
            class: 'vendor',
            html: ` 
                    <h2>Company Details</h2>
                    <label>Company Name</label><label>${result[i]["v_name"]}</label><br>
                    <label>Company Address</label><label>${result[i]["v_address"]}</label><br>
                    <label>Year of Establishment</label><label>${result[i]["v_yoe"]}</label><br>
                    <label>Email Address</label><label>${result[i]["v_email"]}</label><br>
                    <label>Mobile Number</label><label>${result[i]["v_mobile"]}</label><br>
                    <label>Company Identification Number</label><label>${result[i]["v_reg_no"]}</label><br>
                    <label>GST Number</label><label>${result[i]["v_gst"]}</label><br>
                    <label>Legal Status</label><label>${result[i]["v_legal_id"]}</label><br>
                    <label>Pan Number</label><label>${result[i]["v_pan"]}</label><br>
                    <label>State</label><label>${result[i]["v_state_id"]}</label><br>
                    <label>City</label><label>${result[i]["v_city_id"]}</label><br>
                    <label>Pincode</label><label>${result[i]["v_pincode"]}</label><br>
                    <h2>Vendor Details</h2>
                    <label>Name</label><label>${result[i]["vcd_name"]}</label><br>
                    <label>Title</label><label>${result[i]["vcd_title"]}</label><br>
                    <label>Date of Birth</label><label>${result[i]["v_dob"]}</label><br>
                    <label>Aadhaar</label><label>${result[i]["vcd_aadhar"]}</label><br>
                    <label>Mobile Number</label><label>${result[i]["vcd_contact"]}</label><br>
                    <label>Email Addresse</label><label>${result[i]["vcd_email"]}</label><br>
                    <label>Designation</label><label>${result[i]["vcd_designation"]}</label><br>
                    <label>File URL</label><a href="${result[i]["furi"]}">Link</a><br>
                    <button data-vd_id="${result[i]["vd_id"]}" data-vcd_id="${result[i]["vcd_id"]}">Approve</button>
                    <button>Disapprove</button>
                 `,
        }).appendTo('#container')
    }
})
$('#container').click((e)=>{
    console.log(e.target.getAttribute('data-vd_id'),e.target.getAttribute('data-vcd_id'))
})
