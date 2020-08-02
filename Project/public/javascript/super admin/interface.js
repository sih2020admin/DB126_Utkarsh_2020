$.post('/super-admin/approve-vendor').then((result) => {
    for (let i = 0; i < result.length; i++) {
        $('<div></div>', {
            class: 'cont',
            html: ` 
                    <h2>Company Details</h2><br>
                    <table>
                    <tr>
                    <td class="fields">Company Name</td><td>${result[i]["v_name"]}</td><br>
                    <td class="fields">Company Address</td><td>${result[i]["v_address"]}</td><br>
                    </tr>
                    <tr>
                    <td class="fields">Year of Establishment</td><td>${result[i]["v_yoe"]}</td><br>
                    <td class="fields">Email Address</td><td>${result[i]["v_email"]}</td><br>
                    </tr>
                    <tr>
                    <td class="fields">Mobile Number</td><td>${result[i]["v_mobile"]}</td><br>
                    <td class="fields">Company Identification Number</td><td>${result[i]["v_reg_no"]}</td><br>
                    </tr>
                    <tr>
                    <td class="fields">GST Number</td><td>${result[i]["v_gst"]}</td><br>
                    <td class="fields">Legal Status</td><td>${result[i]["v_legal_id"]}</td><br>
                    </tr>
                    <tr>
                    <td class="fields">Pan Number</td><td>${result[i]["v_pan"]}</td><br>
                    <td class="fields">State</td><td>${result[i]["v_state_id"]}</td><br>
                    </tr>
                    <tr>
                    <td class="fields">City</td><td>${result[i]["v_city_id"]}</td><br>
                    <td class="fields">Pincode</td><td>${result[i]["v_pincode"]}</td><br>
                    </tr></table>
                    <br><h2>Vendor Details</h2><br>
                    <table>
                    <tr>
                    <td class="fields">Name</td><td>${result[i]["vcd_name"]}</td><br>
                    <td class="fields">Title</td><td>${result[i]["vcd_title"]}</td><br>
                    </tr>
                    <tr>
                    <td class="fields">Date of Birth</td><td>${result[i]["v_dob"]}</td><br>
                    <td class="fields">Aadhaar</td><td>${result[i]["vcd_aadhar"]}</td><br>
                    </tr>
                    <tr>
                    <td class="fields">Mobile Number</td><td>${result[i]["vcd_contact"]}</td><br>
                    <td class="fields">Email Addresse</td><td>${result[i]["vcd_email"]}</td><br>
                    </tr>
                    <tr>
                    <td class="fields">Designation</td><td>${result[i]["vcd_designation"]}</td><br>
                    <td class="fields">File URL</td><a href="${result[i]["furi"]}">Link</a><br><br>
                    </tr>
                    </table>
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
