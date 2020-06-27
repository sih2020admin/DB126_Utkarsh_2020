var vd_id = get_cookie('vd_id')
var vcd_id = get_cookie('vcd_id')
if (vd_id == '') {
    window.location.href = '/login'
    console.log('directed to login')
}
var state

function city() {
    document.getElementById('city').removeAttribute('disabled')
    var state_code = document.getElementById('state').value.split('-')
    var xhr1 = new XMLHttpRequest()
    url = '/misc/get-city'
    xhr1.open('POST', url)
    xhr1.setRequestHeader('Content-Type', 'application/json')
    xhr1.send(JSON.stringify({ state_code: state_code[0] }))
    xhr1.onload = function () {
        if (this.status == 200) {
            var result = JSON.parse(this.responseText)
            var option = ''
            for (var i = 0; i < result.length; i++) {
                option += '<option>' + result[i].c_name + '</option>'
            }
            document.getElementById('city').innerHTML = option
        } else if (this.status == 400) alert('Error 400')
        else alert('Some Error Occured')
    }
}

document.getElementById('edit1').onclick = function () {
    document.getElementById('edit1').style.display = 'none'

    document.getElementById('name').removeAttribute('readonly')
    document.getElementById('name').style.border = '2px solid #663EFD'
    document.getElementById('dob').setAttribute('type', 'date')
    document.getElementById('dob').removeAttribute('readonly')
    document.getElementById('dob').style.border = '2px solid #663EFD'
    document.getElementById('desg').removeAttribute('readonly')
    document.getElementById('desg').style.border = '2px solid #663EFD'
    document.getElementById('email').removeAttribute('readonly')
    document.getElementById('email').style.border = '2px solid #663EFD'
    document.getElementById('mobile').removeAttribute('readonly')
    document.getElementById('mobile').style.border = '2px solid #663EFD'
    document.getElementById('aadhar').style.border = 'none'

    document.getElementById('cname').removeAttribute('readonly')
    document.getElementById('cname').style.border = '2px solid #663EFD'
    document.getElementById('legal').removeAttribute('disabled')
    document.getElementById('yoe').removeAttribute('disabled')
    document.getElementById('reg').style.border = 'none'
    document.getElementById('gst').style.border = 'none'
    document.getElementById('pan').style.border = 'none'
    document.getElementById('mail').removeAttribute('readonly')
    document.getElementById('mail').style.border = '2px solid #663EFD'
    document.getElementById('ccontact').removeAttribute('readonly')
    document.getElementById('ccontact').style.border = '2px solid #663EFD'
    document.getElementById('state').removeAttribute('disabled')
    document.getElementById('add').removeAttribute('readonly')
    document.getElementById('add').style.border = '2px solid #663EFD'

    document.getElementById('save').style.display = 'inline-block'
    document.getElementById('cancel').style.display = 'inline-block'

    document.getElementById('save').style.display = 'inline-block'
    document.getElementById('cancel').style.display = 'inline-block'

    var s1 = document.querySelectorAll('Select').forEach((el) => el.classList.remove('hide'))
    // s1.classList.remove("hide");

    // State Generation From API
    var xhr1 = new XMLHttpRequest()
    url = '/misc/get-state'
    xhr1.open('POST', url)
    xhr1.setRequestHeader('Content-Type', 'application/json')
    xhr1.send()
    xhr1.onload = function () {
        if (this.status == 200) {
            var result = JSON.parse(this.responseText)
            var option = ''
            for (var i = 0; i < result.length; i++) {
                option += '<option>' + result[i].st_name + '</option>'
            }
            document.getElementById('state').innerHTML = option
            document.getElementById('state').value = state
        } else if (this.status == 400) alert('Error 400')
        else alert('Some Error Occured')
    }
}

function save() {
    var email = document.getElementById('email').value
    if (email.match(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/)) {
        console.log('You have entered a valid email address!')
        if (document.getElementById('mobile').value.length != 10) {
            document.getElementById('tc1').innerHTML = 'Personal Mobile No Is Invalid'
        } else {
            if (document.getElementById('mail').value.match(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/)) {
                if (document.getElementById('ccontact').value.length != 10) document.getElementById('tc1').innerHTML = 'Company Mobile No Is Invalid'
                else {
                    document.getElementById('icon1').className = 'fa fa-spinner fa-spin'
                    var xhr1 = new XMLHttpRequest()
                    url = '/edit/profile'
                    xhr1.open('POST', url)
                    xhr1.setRequestHeader('Content-Type', 'application/json')
                    xhr1.send(
                        JSON.stringify({
                            vd_id: vd_id,
                            name: document.getElementById('name').value,
                            dob: document.getElementById('dob').value,
                            desg: document.getElementById('desg').value,
                            email: document.getElementById('email').value,
                            mobile: document.getElementById('mobile').value,
                            cname: document.getElementById('cname').value,
                            legal: document.getElementById('legal').value,
                            yoe: document.getElementById('yoe').value,
                            mail: document.getElementById('mail').value,
                            ccontact: document.getElementById('ccontact').value,
                            state: document.getElementById('state').value,
                            city: document.getElementById('city').value,
                            add: document.getElementById('add').value,
                        })
                    )
                    xhr1.onload = function () {
                        if (this.status == 200) {
                            alert('Profile Successfully Updated')
                            location = '/profile'
                        } else if (this.status == 400) alert('Error 400')
                        else alert('Some Error Occured')
                    }
                }
            } else {
                document.getElementById('icon1').className = ''
                document.getElementById('tc1').innerHTML = 'Company  Email-Id Is Invalid'
            }
        }
    } else {
        document.getElementById('icon1').className = ''
        document.getElementById('tc1').innerHTML = 'Personal Email-Id Is Invalid'
    }
}

var xhr = new XMLHttpRequest()
xhr.open('POST', '/vendor_dashboard')
xhr.setRequestHeader('Content-Type', 'application/json')
var data = JSON.stringify({ vd_id: vd_id, vcd_id: vcd_id })
xhr.send(data)

xhr.onload = function () {
    if (this.status == 200) {
        var response,
            option = ''
        response = JSON.parse(this.responseText)

        /* document.getElementById('name').value = response[1][0].vcd_name
        document.getElementById('dob').value = response[1][0].vcd_dob
        document.getElementById('desg').value = response[1][0].vcd_designation
        document.getElementById('email').value = response[1][0].vcd_email
        document.getElementById('mobile').value = response[1][0].vcd_contact
        document.getElementById('aadhar').value = response[1][0].vcd_aadhar */

        document.getElementById('cname').value = response[0][0].v_name
        document.getElementById('legal').value = response[0][0].v_legal_id
        document.getElementById('yoe').value = response[0][0].v_yoe
        document.getElementById('reg').value = response[0][0].v_reg_no
        document.getElementById('gst').value = response[0][0].v_gst
        document.getElementById('pan').value = response[0][0].v_pan
        document.getElementById('mail').value = response[0][0].v_email
        document.getElementById('ccontact').value = response[0][0].v_mobile

        state = response[0][0].v_state_id
        option += '<option>' + response[0][0].v_state_id + '</option>'
        document.getElementById('state').innerHTML = option
        document.getElementById('state').value = state
        option += '<option>' + response[0][0].v_city_id + '</option>'
        document.getElementById('city').innerHTML = option
        document.getElementById('city').value = response[0][0].v_city_id

        document.getElementById('add').value = response[0][0].v_address

        /* var tender_div = document.getElementById("Tenders");
    if(response[2].length > 0 ){
        var tender_content = `<div class="tenders_details">
        <table>
                <tr>
                    <th>Reference No</th>
                    <th>Title</th>
                    <th>Tender Description</th>
                    <th>Bidding Amount</th>
                    <th>Preview</th>
                    <th>Status</th>
                </tr>`
        for(i=0;i<response[2].length ; i++){
                tender_content =  tender_content+`
                        <tr>
                            <td>`+response[2][i].et_tender_ref_no+`</td>
                            <td>`+response[2][i].et_tender_fee+`</td>
                            <td>`+response[2][i].et_tender_desc+`</td>
                            <td>`+response[2][i].bidding_amt+`</td>
                            <td><a href=https://`+location.hostname+":8081/tender/preview?et_id="+response[2][i].et_id+"&etd_id="+response[2][i].etd_id+`>view</a></td>
                            <td>`+"Submitted"+`</td>
                        </tr>` 
        }
        tender_content  = tender_content+ `</table></div>`
        tender_div.insertAdjacentHTML('beforeend',tender_content); 
    }
    else {
        tender_div.insertAdjacentHTML('beforeend',`<label class="RnoLabel"><strong>NO TENDER APPLIED YET ! APPLY FOR TENDER <a href="/v3_see_tender.html">here</a></strong></label>`); 
    } */
        // var div=`<div class="main" id="Approved">
        // <label><strong>Title:</strong></label>
        //     <label class="heading">`+response[3].et_title+`</label><br><br>
        //         <label class="RnoLabel"><strong>Department:</strong></label>
        //         <label>`+response[3].dept_name+`</label><br><br>
        //         <label class="RnoLabel"><strong>Ref No:</strong></label>
        //         <label>`+response[3].et_tender_ref_no+`</label><br><br>
        //         <label class="Id"><strong>Tender ID:</strong></label>
        //         <label>`+response[3].et_id+`</label><br><br>
        //         <label class="Id"><strong>Tender fee:</strong></label>
        //         <label>`+response[3].et_tender_fee+`</label><br><br>
        //         <label class="Id"><strong>Tender Description:</strong></label>
        //         <label>`+response[3].et_tender_desc+`</label><br><br>
        //         <label class="OdateLabel"><strong>Closing Date:</strong></label>
        //         <label id="Odate">`+response[3].et_last_date_apply.slice(0,10)+`</label><br><br>
        //         <label class="OdateLabel"><strong>Bid Date:</strong></label>
        //         <label id="Odate">`+response[3].et_bidding_date.slice(0,10)+`</label><br><br>
        //         <label class="OdateLabel"><strong>File URL:</strong></label>
        //         <label id="Odate">`+response[3].et_file_url+`</label><br>
        //         <label class="OdateLabel"><strong>Department ID:</strong></label>
        //         <label id="Odate">`+response[3].et_bidding_date.slice(0,10)+`</label><br><br>
        //         <label class="OdateLabel"><strong>Bidding Amount:</strong></label>
        //         <label id="Odate">`+response[3].et_file_url+`</label><br> <br>
        // </div>`;

        // cont_div.insertAdjacentHTML('beforeend', div);
        /* var aprrove_tender_div = document.getElementById('Approved')
        if (response[3].length > 0) {
            for (i = 0; i < response[3].length; i++) {
                var tender_content =
                    `<label class="RnoLabel"><strong>ID:</strong></label>
		                <label>` +
                    response[3][i].et_id +
                    `</label><br><br>
		                <label class="RnoLabel"><strong>Title:</strong></label>
		                <label>` +
                    response[3][i].et_title +
                    `</label><br><br>
		                <label class="RnoLabel"><strong>Department:</strong></label>
		                <label>` +
                    response[3][i].dept_name +
                    `</label><br><br>
		                <label class="RnoLabel"><strong>Ref No:</strong></label>
		                <label>` +
                    response[3][i].et_tender_ref_no +
                    `</label><br><br>
		                <label class="Id"><strong>Tender fee:</strong></label>
		                <label>` +
                    response[3][i].et_tender_fee +
                    `</label><br><br>
		                <label class="Id"><strong>Tender Description:</strong></label>
		                <label>` +
                    response[3][i].et_tender_desc +
                    `</label><br><br>
		                <label class="OdateLabel"><strong>Closing Date:</strong></label>
		                <label id="Odate">` +
                    response[3][i].et_last_date_apply.slice(0, 10) +
                    `</label><br><br>
		                <label class="OdateLabel"><strong>Bid Date:</strong></label>
		                <label id="Odate">` +
                    response[3][i].et_bidding_date.slice(0, 10) +
                    `</label><br><br>
		                <label class="OdateLabel"><strong>File URL:</strong></label>
		                <label id="Odate">` +
                    response[3][i].et_file_url +
                    `</label><br>
		                <label class="OdateLabel"><strong>Department ID:</strong></label>
		                <label id="Odate">` +
                    response[3][i].et_bidding_date.slice(0, 10) +
                    `</label><br><br>
		                <label class="OdateLabel"><strong>Bidding Amount:</strong></label>
                        <label id="Odate">` +
                    response[3][i].et_file_url +
                    `</label><hr/><br><br>`
                aprrove_tender_div.insertAdjacentHTML('beforeend', tender_content)
            }
        } else {
            aprrove_tender_div.insertAdjacentHTML('beforeend', `<br><label class="RnoLabel"><strong>NO TENDER APPROVED YET ! APPLY FOR TENDER <a href="/tenders">here</a></strong></label>`)
        } */
    } else if (this.status == 400) {
        alert('Some error occured!')
    } else {
        alert('Check Network!')
    }
}

function operation(optName) {
    var x = document.getElementsByClassName('tabcontent')
    for (var i = 0; i < x.length; i++) {
        x[i].style.display = 'none'
    }
    document.getElementById(optName).style.display = 'block'
    var p = document.getElementById("pro-button")
    var t = document.getElementById("ten-button")
    var a = document.getElementById("app-button")
    var d = document.getElementById("down-button")

    if (optName == 'Profile') {
        console.log('pro')
        p.classList.add("active")
        t.classList.remove("active")
        a.classList.remove("active")
        d.classList.remove("active")
    } 
    else if(optName == 'Tenders') {
        console.log('ten')
        t.classList.add("active")
        p.classList.remove("active")
        a.classList.remove("active")
        d.classList.remove("active")
    }
    else if(optName == 'Approved'){
        console.log('app')
        a.classList.add("active")
        p.classList.remove("active")
        t.classList.remove("active")
        d.classList.remove("active")
    }
    else if(optName == 'Docs'){
        console.log('app')
        d.classList.add("active")
        t.classList.remove("active")
        a.classList.remove("active")
        p.classList.remove("active")
    }
}
