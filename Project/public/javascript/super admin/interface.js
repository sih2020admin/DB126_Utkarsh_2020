$.post('/super-admin/approve-vendor').then((result) => {
    for (let i = 0; i < result.length; i++) {
        $('<div></div>', {
            class: 'cont',
            html: ` <h2>Company Details</h2><br>
                    <table>
                    <tr>
                    <td class="fields">Company Name</td><td>${result[i]["v_name"]}</td>
                    <td class="fields">Company Address</td><td>${result[i]["v_address"]}</td>
                    </tr>
                    <tr>
                    <td class="fields">Year of Establishment</td><td>${result[i]["v_yoe"]}</td>
                    <td class="fields">Email Address</td><td>${result[i]["v_email"]}</td>
                    </tr>
                    <tr>
                    <td class="fields">Mobile Number</td><td>${result[i]["v_mobile"]}</td>
                    <td class="fields">Company Identification Number</td><td>${result[i]["v_reg_no"]}</td>
                    </tr>
                    <tr>
                    <td class="fields">GST Number</td><td>${result[i]["v_gst"]}</td>
                    <td class="fields">Legal Status</td><td>${result[i]["v_legal_id"]}</td>
                    </tr>
                    <tr>
                    <td class="fields">Pan Number</td><td>${result[i]["v_pan"]}</td>
                    <td class="fields">State</td><td>${result[i]["v_state_id"]}</td>
                    </tr>
                    <tr>
                    <td class="fields">City</td><td>${result[i]["v_city_id"]}</td>
                    <td class="fields">Pincode</td><td>${result[i]["v_pincode"]}</td>
                    </tr></table><br>
                    <h2>Vendor Details</h2><br>
                    <table>
                    <tr>
                    <td class="fields">Name</td><td>${result[i]["vcd_name"]}</td>
                    <td class="fields">Title</td><td>${result[i]["vcd_title"]}</td>
                    </tr>
                    <tr>
                    <td class="fields">Date of Birth</td><td>${result[i]["v_dob"]}</td>
                    <td class="fields">Aadhaar</td><td>${result[i]["vcd_aadhar"]}</td>
                    </tr>
                    <tr>
                    <td class="fields">Mobile Number</td><td>${result[i]["vcd_contact"]}</td>
                    <td class="fields">Email Addresse</td><td>${result[i]["vcd_email"]}</td>
                    </tr>
                    <tr>
                    <td class="fields">Designation</td><td>${result[i]["vcd_designation"]}</td>
                    <td class="fields">File URL</td><td><a href="${result[i]["furi"]}">Link</a></td>
                    </tr>
                    </table><br><br>
                    <div class="butts">
                    <button class="approve" data-vd_id="${result[i]["vd_id"]}" data-vcd_id="${result[i]["vcd_id"]}">Approve</button>
                    <button class="disapprove"  data-vd_id="${result[i]["vd_id"]}">Disapprove</button></div>
                 `,
        }).appendTo('#container')
    }
})
$('#container').click((e)=>{
    if(e.target.className === 'approve'){
        $.ajax({
            url: "/super-admin/approve-vendor1",
            method: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                vd_id: e.target.getAttribute('data-vd_id'),
            }),
            success:function(result){
                if(result === "Approved Successfully"){
                    location.reload()
                }
            },
            error: function (xhr, error_type, exception) {
                var error_message = xhr.responseText;
                console.log("" + error_message);
            },
        })
    }
    if(e.target.className === 'disapprove'){
        $.ajax({
            url: "/super-admin/disapprove-vendor",
            method: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                vd_id: e.target.getAttribute('data-vd_id'),
            }),
            success:function(result){
                if(result === 'ok'){
                    location.reload()
                }
            },
            error: function (xhr, error_type, exception) {
                var error_message = xhr.responseText;
                console.log("" + error_message);
            },
        })
    }
    /* $.ajax({
        url: "/super-admin/approve-vendor1",
        method: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({
            vd_id: e.target.getAttribute('data-vd_id'),
        }),
        success:function(result){

        }
    }) */
    //console.log(e.target.getAttribute('data-vd_id'),e.target.getAttribute('data-vcd_id'))
})
