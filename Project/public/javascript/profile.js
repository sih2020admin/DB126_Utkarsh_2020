var state
var file_name

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
                            vd_id: -1,
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
var data = JSON.stringify({ vd_id: -1, vcd_id: -1 })    //im putting here -1 bcoz dont know whether post data can be null? vcd_id is no longer used
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
        var approve_tender_div = document.getElementById('Approved')
        var flag = 0;
        if (response[3].length > 0) {
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
            for (i = 0; i < response[3].length; i++) {
                tender_content = tender_content + `
                        <tr>
                            <td>`+ response[3][i].et_tender_ref_no + `</td>
                            <td>`+ response[3][i].et_title + `</td>
                            <td>`+ response[3][i].et_tender_desc + `</td>
                            <td>`+ response[3][i].bidding_amt + `</td>
                            <td><a href=https://`+ location.hostname + ":8081/tender/preview?et_id=" + response[3][i].et_id + "&etd_id=" + response[3][i].etd_id + `>view</a></td>
                            <td>`+ "Approved" + `</td>
                        </tr>`
            }
            flag = 1;
        }
        else {
            approve_tender_div.insertAdjacentHTML('beforeend', `<br><label class="RnoLabel"><strong>NO TENDER APPROVED YET ! APPLY FOR TENDER <a href="/tenders">here</a></strong></label>`)
        }
        if (flag == 1) {
            tender_content = tender_content + `</table></div>`
            approve_tender_div.insertAdjacentHTML('beforeend', tender_content);
        }
    }
    else if (this.status == 400) {
        alert('Some error occured!')
    }
    else {
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
    var d = document.getElementById("files-button")
    var s = document.getElementById("stats-button")

    if (optName == 'Profile') {
        console.log('pro')
        p.classList.add("active")
        t.classList.remove("active")
        a.classList.remove("active")
        d.classList.remove("active")
        s.classList.remove("active")
    }
    else if (optName == 'Tenders') {
        console.log('ten')
        t.classList.add("active")
        p.classList.remove("active")
        a.classList.remove("active")
        d.classList.remove("active")
        s.classList.remove("active")
    }
    else if (optName == 'Approved') {
        console.log('app')
        a.classList.add("active")
        p.classList.remove("active")
        t.classList.remove("active")
        d.classList.remove("active")
        s.classList.remove("active")
    }
    else if (optName == 'Docs') {
        console.log('app')
        d.classList.add("active")
        t.classList.remove("active")
        a.classList.remove("active")
        p.classList.remove("active")
        s.classList.remove("active")
    }
    else if (optName == 'stats') {
        console.log('app')
        s.classList.add("active")
        d.classList.remove("active")
        t.classList.remove("active")
        a.classList.remove("active")
        p.classList.remove("active")
    }
    else if (optName == 'Files') {
        console.log('app')
        d.classList.add("active")
        s.classList.remove("active")
        t.classList.remove("active")
        a.classList.remove("active")
        p.classList.remove("active")
    }
}


function graph_data() {
    var xhr1 = new XMLHttpRequest()
    url = '/statistics'
    xhr1.open('POST', url)
    xhr1.setRequestHeader('Content-Type', 'application/json')
    xhr1.send(JSON.stringify({}))
    xhr1.onload = function () {
        console.log("xhr 1 on load")
        if (this.status == 200) {
            console.log(this.responseText);
            var g_data = JSON.parse(this.responseText);
            total_count_project = g_data[0];
            count_project_dept = g_data[1];
            count_project_dept_cost_applied = g_data[2];

            var tenders_applied_total = document.getElementById('tenders_applied_total').getContext('2d');
            var chart = new Chart(tenders_applied_total, {
                // The type of chart we want to create
                type: 'horizontalBar',

                // The data for our dataset
                data: {
                    labels: [' '],
                    datasets: [{
                        label: 'Total tenders applied',
                        backgroundColor: ['#00F5D4', '#00BBF9', '#FEE440', '#F15BB5'],
                        //borderColor: '#663EFD',
                        data: total_count_project.map(total_count_project => total_count_project.total_count)
                    }]
                },
                // Configuration options go here
                options: {
                    responsive: true,
                    legend: {
                        display: false
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                stepSize: 1,
                                precision: 0,
                                min: 0
                            }
                        }],
                        xAxes: [{
                            barPercentage: 0.2
                        }]
                    }

                }
            });


            var tenders_applied_dept = document.getElementById('tenders_applied_dept').getContext('2d');
            var chart = new Chart(tenders_applied_dept, {
                // The type of chart we want to create
                type: 'bar',

                // The data for our dataset
                data: {
                    labels: count_project_dept.map(count_project_dept => count_project_dept.dept_name),
                    datasets: [{
                        label: ['Total Tenders Applied'],
                        backgroundColor: ['#F15BB5', '#00BBF9', '#FEE440', '#00F5D4'],
                        // borderColor: '#663EFD',
                        data: count_project_dept.map(count_project_dept => count_project_dept.total_count_dept)
                    }]
                },
                // Configuration options go here
                options: {
                    responsive: true,
                    legend: {
                        display: false
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                stepSize: 1,
                                precision: 0
                            }
                        }],
                        xAxes: [{
                            barPercentage: 0.4
                        }]
                    }
                }
            });

            var tenders_applied_dept_cost = document.getElementById('tenders_applied_dept_cost').getContext('2d');
            var chart_1 = new Chart(tenders_applied_dept_cost, {
                // The type of chart we want to create
                type: 'pie',

                // The data for our dataset
                data: {
                    labels: count_project_dept_cost_applied.map(count_project_dept_cost_applied => count_project_dept_cost_applied.dept_name),
                    datasets: [{
                        label: 'Department wise tenders applied Total cost',
                        backgroundColor: ['#00F5D4', '#00BBF9', '#FEE440', '#F15BB5'],
                        // borderColor: '#663EFD',
                        data: count_project_dept_cost_applied.map(count_project_dept_cost_applied => count_project_dept_cost_applied.total_cost_departmentwise)
                    }]
                },
                // Configuration options go here
                options: {
                    responsive: true,
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
            // console.log(count_project_dept.map(count_project_dept_cost_applied => count_project_dept_cost_applied.total_cost_departmentwise))

        } else if (this.status == 400) alert('Error 400')
        else alert('Some Error Occured')
    }
}

graph_data();

// var ctx = document.getElementById('myChart').getContext('2d');
// var chart = new Chart(ctx, {
//     // The type of chart we want to create
//     type: 'line',

//     // The data for our dataset
//     data: {
//         labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//         datasets: [{
//             label: 'My First dataset',
//             backgroundColor: 'rgb(255, 99, 132)',
//             borderColor: 'rgb(255, 99, 132)',
//             data: [0, 10, 5, 2, 20, 30, 45]
//         }]
//     },

//     // Configuration options go here
//     options: {}
// });


function browse() {
    var browse = document.getElementById('upload');
    upload(browse.files);
}
var upload = function (files) {
    var xhr1 = new XMLHttpRequest();
    formdata = new FormData();
    for (var x = 0; x < files.length; x = x + 1) {
        formdata.append('file', files[x]);
    }
    //console.log(formdata.get('file'));

    //signing process commented
    // alert("Document Uploaded,Press OK to Sign the Document");
    // var url = "https://"+host+":8081/sms/send";
    // xhr1.open("POST" ,url);
    // xhr1.setRequestHeader('Content-Type','application/json');
    // xhr1.send(JSON.stringify({"aadharno":aadhar}));
    // xhr1.onload = function(){
    //     if(this.status==200){
    //         otpmodal();
    //     }
    //     else if(this.status==400)
    //         alert("Error 400");
    //     else
    //         alert("Some Error Occured");
    // }


    var url = "/legal_fileupload";
    xhr1.open("POST", url);

    xhr1.onload = function () {
        if (this.status == 200) {
            console.log(this.responseText);
            // document.getElementById("div_f2").style.display = "none";
            res = JSON.parse(this.responseText)
            file_name = res.filename
            alert("uploaded file");
        }
        else if (this.status == 400)
            alert("Error 400");
        else
            alert("Some Error Occured");
    }
    xhr1.send(formdata)
}

/* ---------------------------- Start of digilocker code ------------------------------ */

var vcd_id = get_cookie('vcd_id') //will be used everywhere in digilocker code as vcd_id modf_sanket
var et_id = null //to store current et_id
var etd_id //to store current etd_id
var vcd_id = get_cookie('vcd_id')    //adding for time sake
var vd_id = get_cookie('vd_id')


var queryString = window.location.search
var urlParams = new URLSearchParams(queryString)
var url_string = window.location.href
var url = new URL(url_string)
var state = url.searchParams.get('state')

if (state) { //if url after digi code 
    var temp = state.split(':')
    et_id = temp[0]
    etd_id = temp[1]

} else {   //if normal url 
    et_id = (_a = urlParams.get('et_id')) === null || _a === void 0 ? void 0 : _a.toString()
    etd_id = (_a = urlParams.get('etd_id')) === null || _a === void 0 ? void 0 : _a.toString()
}
console.log(etd_id, et_id)


var check_digi_access;               //maintain flag of digi_access after getting from server

//global variables for storing file URI's
var Technical_file_uri
var BOQ_file_uri

//to decide which document is to be uploaded in digilocker depending upon flag
var Technical_or_BOQ = 0 //0 = no document uploaded yet, 1 = technical document uploaded, 2 = BOQ uploaded

/* ----------------------------- Start of on load code (redirect to digilocker sign in) --------------------------- */

//on window load check if user need to be redirected to digilocker sign in page
window.onload = function () {
    //on load of page... hide loader of back and upload button
    document.getElementById('icon2').style.display = 'none'
    document.getElementById('icon3').style.display = 'none'

    //get param "state" from current url
    var url_string = window.location.href
    var url = new URL(url_string)
    var state = url.searchParams.get('state')
    var error_digi = url.searchParams.get('error')
    // console.log("permission denied by user", error_digi);

    var xhr = new XMLHttpRequest()
    check_digi_url = 'https://165.22.210.37:8081/check_digi_access'
    xhr.open('GET', check_digi_url, true)
    xhr.setRequestHeader('Content-Type', 'application/json')

    xhr.send();

    //xhr repsonse handling
    xhr.onload = function () {
        var temp = JSON.parse(this.responseText)
        if (this.status == 200) {
            check_digi_access = temp.digi_access
            console.log("check digi access", check_digi_access, typeof (check_digi_access));
            //if user denies the permission on digilocker
            if (state && error_digi) {
                alert('Oops! You have rejected digilocker permission. We are redirecting you to digilocker please give us permission. Click "OK" to continue');

                var temp = state.split(':')
                et_id = temp[0]
                etd_id = temp[1]

                window.location.href = 'https://api.digitallocker.gov.in/public/oauth2/1/authorize?response_type=code&client_id=DC8FB8CF&redirect_uri=https://165.22.210.37:8081/tender/upload-documents&state=' + et_id + ':' + etd_id
            }
            //check if url contains param "state"
            else if (state) {
                //get et_id and etd_id from "state" and update in global variable
                var temp = state.split(':')
                et_id = temp[0]
                etd_id = temp[1]

                // check if we have users digilocker account access
                if (check_digi_access == "1") {
                    //If we have dig_access and param ("state") in url then no need of digilocker login
                    console.log('params found and we also have digi access')
                } else {
                    //If we have params ("state") but not digilocker access
                    //then send parameters (authentication code, vcd_id) to our server

                    //get auth_code and state from the current browser uri
                    var code = url.searchParams.get('code')

                    //creating xhr request to make get_access_token api call on our server
                    //this api call will be then forwarded to digilocker
                    //response from digilocker will be given back to the server and then client respectively
                    var xhr = new XMLHttpRequest()
                    url = 'https://165.22.210.37:8081/get_access_token'
                    xhr.open('POST', url, true)
                    xhr.setRequestHeader('Content-Type', 'application/json')

                    xhr.send(
                        JSON.stringify({
                            code: code,
                            id: vcd_id,     //modf_sanket
                        })
                    )

                    //xhr repsonse handling
                    xhr.onload = function () {
                        var temp = JSON.parse(this.responseText)
                        if (this.status == 200) {
                            // add_to_cookie('digi_access', '1')
                            // console.log('digi_access successfully updated in cookies too')
                            alert(temp.msg)
                        } else if (this.status == 400) {
                            alert(temp.error)
                        } else {
                            alert('Some Other Error ', xhr.status, ' with statusText ', xhr.statusText)
                        }
                    }
                }
            } else {
                //if we don't have "state" params then take et_id and etd_id from params and update in global variables
                et_id = url.searchParams.get('et_id')
                etd_id = url.searchParams.get('etd_id')

                // check if we have users digilocker account access
                console.log("just check digi ", check_digi_access);
                if (check_digi_access == "0") {
                    //if we don't have param "state" and also not digi_access
                    //then change url and redirect to digilocker
                    alert(`We don't have access to your digilocker account. please give access. Click "OK" to continue`)
                    window.location.href = 'https://api.digitallocker.gov.in/public/oauth2/1/authorize?response_type=code&client_id=DC8FB8CF&redirect_uri=https://165.22.210.37:8081/tender/upload-documents&state=' + et_id + ':' + etd_id
                } else {
                    //if we don't have param "state" in url but we have digi_access then no need of digilocker signin
                    console.log('We have digi_access but not parameters in url')
                }
            }
        } else if (this.status == 400) {
            alert(temp.error)
        } else {
            alert('Some Other Error ', xhr.status, ' with statusText ', xhr.statusText)
        }
    }
}

/* ------------------------------- End of on load code (redirect to digilocker sign in) --------------------------- */

/* --------------------------------- Start of display filename code ----------------------------------------------- */

//below variables will store directory ID's from digilocker
var current_id = '' //id of current directory
var parent_id = [] //id of ancesstors of current directory (required to backtrace)

var is_upload = 0 //check if upload button is clicked

//onclick function on "li" element of modal
function some() {
    $(document).ready(function () {
        $('li').click(function () {
            //if any li element is clicked
            var span_i_class = $(this).find('i').attr('class') //get details of image (whether a folder or file)
            if (span_i_class == 'fa fa-folder') {
                //if clicked li element is folder

                //update "current_id" and "parent_id"
                current_id = $(this).find('#file_id').text()
                p_id = $(this).find('#parent_id').text()
                parent_id.push(p_id)

                //get files from above updated "current_id"
                get_files()
            } else {
                //clicked li element is file
                alert('This is file')
            }
        })
    })
}

//Dynamically adds list of files recieved from digilocker to html page
function show_files(str) {
    console.log("response from digi on get files", str)
    var current = str.directory // get current directory name

    //update current directory name on modal
    var dir_element = document.getElementById('cur_dir')
    dir_element.innerHTML = 'Current Directory is : ' + current

    var item_array = str.items //get list of items in current directory

    var ul_element = document.getElementById('directory')
    ul_element.innerHTML = '' //Removing all prev li_elements

    //check if directory contains any items or not
    if (item_array.length == 0) {
        document.getElementById("no_doc").style.display = "block";
        //alert('This directory is empty');
        console.log("testing of no doc in digi directory");
    } else {
        document.getElementById("no_doc").style.display = "none";
        //First append "directory" list then append "file" list
        add_to_list('dir')
        add_to_list('file')

        //append files and folders to list
        function add_to_list(file_type) {
            // console.log("Technical Or BOQ", Technical_or_BOQ);
            //console.log("is upload", is_upload);
            for (i = 0; i < item_array.length; i++) {
                //check which document has been uploaded to digilocker recently
                //accordingly display fileuri in console

                // if (Technical_or_BOQ == 1) {
                // console.log("Testing sankey => " + item_array[i].name + "=>" + Technical_file_name + "=>" + is_upload);
                if (item_array[i].name == file_name && file_type == "file") {
                    console.log("testing", i, item_array[i]);
                    // document.getElementById("fileURI").innerHTML = item_array[i].uri;
                    // Technical_file_uri = item_array[i].uri
                    // console.log('File URI for Technical Document is => ' + item_array[i].uri)
                    // }
                    // } else if (Technical_or_BOQ == 2) {
                    console.log("call enter legal file uri in db", item_array[i].name, file_name)
                    // if (item_array[i].name == BOQ_file_name) {
                    // document.getElementById("fileURI").innerHTML = item_array[i].uri;
                    var file_uri = item_array[i].uri
                    // console.log('File URI for BOQ document is => ' + item_array[i].uri)

                    var data = JSON.stringify({ furi: file_uri })

                    var xhr = new XMLHttpRequest()
                    xhr.addEventListener('readystatechange', function () {
                        if (this.readyState === 4) {
                            console.log(this.responseText)
                        }
                    })

                    xhr.open('POST', 'https://165.22.210.37:8081/legal_file_insert')
                    xhr.setRequestHeader('Content-Type', 'application/json')

                    xhr.send(data)
                }

                //sorting of "directory" and "file" list
                console.log("checking file type", file_type);
                console.log("checking item array", item_array);
                if (item_array[i].type == file_type) {
                    var li_element = document.createElement('li')

                    //below span_element for folder or file image
                    var span_element = document.createElement('span')
                    var i_element = document.createElement('i')
                    if (item_array[i].type == 'dir') {
                        i_element.className = 'fa fa-folder'
                    } else {
                        i_element.className = 'fa fa-file'
                    }
                    i_element.setAttribute('aria-hidden', 'true')
                    span_element.append(i_element)
                    li_element.append(span_element)

                    //below span_element for file or folder name
                    span_element = document.createElement('span')
                    span_element.append(item_array[i].name)
                    span_element.setAttribute('id', 'name')
                    li_element.append(span_element)

                    //below span_element for file_uri or folder_id
                    span_element = document.createElement('span')
                    //This if-else has been written to sort files...
                    //first folders will be displayed and then files will be displayed
                    if (item_array[i].type == 'dir') {
                        span_element.append(item_array[i].id)
                        span_element.style.visibility = "hidden";
                    } else {
                        span_element.append(item_array[i].uri)
                    }
                    span_element.setAttribute('id', 'file_id')
                    li_element.append(span_element)

                    //below span element for parent_id
                    span_element = document.createElement('span')
                    span_element.append(item_array[i].parent)
                    span_element.setAttribute('id', 'parent_id')
                    span_element.style.visibility = "hidden";
                    li_element.append(span_element)

                    ul_element.append(li_element)
                }
            }
        }
    }
}

//This function will get content of a directory (using it's id)from digilocker
//will fetch self_uploaded documents from digilocker
function get_files() {
    if (parent_id.length == 0) {
        document.getElementById("back").style.display = "none";
    } else {
        document.getElementById("back").style.display = "";
    }
    //creating xhr request for api call
    var xhr = new XMLHttpRequest()
    url = 'https://165.22.210.37:8081/fetch_files'
    xhr.open('POST', url, true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    // var vcd_id = get_cookie('vcd_id');
    xhr.send(
        JSON.stringify({
            id: current_id,
            vcd_id: vcd_id,    //modf_sanket
        })
    ) //id is directory id (each directory in digilocker has unique id)

    //xhr repsonse handling
    xhr.onload = function () {
        var temp = JSON.parse(this.responseText)
        if (this.status == 200) {
            document.getElementById('icon2').style.display = 'none'
            some()
            show_files(temp)
        } else if (this.status == 400) {
            alert(temp.error)
        } else {
            alert('Some Other Error ', xhr.status, ' with statusText ', xhr.statusText)
        }
    }
}

//will fetch issued documents from digilocker
function get_files2() {
    //creating xhr request for api call
    var xhr = new XMLHttpRequest()
    url = 'https://165.22.210.37:8081/fetch_files2'
    xhr.open('POST', url, true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    var vcd_id = get_cookie('vcd_id')      //modf_sanket
    xhr.send(JSON.stringify({ vcd_id: vcd_id }))

    //xhr repsonse handling
    xhr.onload = function () {
        var temp = JSON.parse(this.responseText)
        if (this.status == 200) {
            some()
            show_files(temp)
        } else if (this.status == 400) {
            alert(temp.error)
        } else {
            alert('Some Other Error ', xhr.status, ' with statusText ', xhr.statusText)
        }
    }
}

/* ----------------------------------------- End of Display filename code ------------------------------------------- */

/* --------------------------------------- Start of modal functionality code ---------------------------------------- */

var modal = document.getElementById('myModal') // Get the modal
var span = document.getElementsByClassName('close')[0] // Get the <span> element that closes the modal

// When the user clicks the button, open the modal
function openModal() {
    //REfresh token API
    var xhr = new XMLHttpRequest()
    url = 'https://165.22.210.37:8081/refresh_token'
    xhr.open('POST', url, true)
    xhr.setRequestHeader('Content-Type', 'application/json')

    xhr.send(
        JSON.stringify({
            // "id": vcd_id
            id: vcd_id,           //modf_sanket
        })
    )

    //xhr repsonse handling
    xhr.onload = function () {
        var temp = JSON.parse(this.responseText)
        if (this.status == 200) {
            console.log('Your token has been refreshed successfully.')

            //on success display modal and fetch files;
            modal.style.display = 'flex'
            get_files()
        } else if (this.status == 400) {
            alert(temp.error)
        } else {
            alert('Some Other Error ', xhr.status, ' with statusText ', xhr.statusText)
        }
    }
}

//back button function of modal
$(document).ready(function () {
    //on click of back button
    $('#back').click(function () {
        document.getElementById('icon2').style.display = ''
        is_upload = 0
        var dir_element = document.getElementById('cur_dir')
        console.log(dir_element.innerHTML)
        if (dir_element.innerHTML != 'Current Directory is : /') {
            current_id = parent_id.pop()
            get_files()
        }
    })
})

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = 'none'
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = 'none'
    }
}
/* ------------------------------------ End of Modal funcionality code -------------------------------------------- */

/* ------------------------------- Start of Upload file to digilocker Code ---------------------------------------- */
function uploadFiles() {
    //hide fa-fa spinner on upload button
    document.getElementById('icon3').style.display = ''

    //get digilocker path where file needs to be uploaded
    var dir_element = document.getElementById('cur_dir')
    var temp = dir_element.innerHTML
    temp = temp.split('Current Directory is : /')
    temp = temp[1]

    //call Upload File API
    var xhr = new XMLHttpRequest()
    url = 'https://165.22.210.37:8081/upload_legal_files'
    xhr.open('POST', url, true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('vcd_id', vcd_id)       //modf_sanket
    xhr.setRequestHeader('path', temp)

    xhr.send(
        JSON.stringify({
            filename: file_name,
        })
    )

    //xhr repsonse handling
    xhr.onload = function () {
        if (this.status == 200) {
            console.log('Your file has been uploaded successfully.')
            // document.getElementById('icon3').style.display = 'none'
            document.getElementById("back").style.display = "none";
            document.getElementById("uploadDigi").style.display = "none";
            Technical_or_BOQ = 2
            console.log('get file START')
            get_files()
            console.log('get file STOP')
        } else if (this.status == 400) {
            alert(temp.error)
        } else {
            alert('Some Other Error ', xhr.status, ' with statusText ', xhr.statusText)
        }
    }
}

function uploadFiles2() {
    //hide fa-fa spinner on upload button
    document.getElementById('icon3').style.display = ''
    //update "upload" status
    is_upload = 1

    //get digilocker path where file needs to be uploaded
    var dir_element = document.getElementById('cur_dir')
    var temp = dir_element.innerHTML
    temp = temp.split('Current Directory is : /')
    temp = temp[1]

    //call Upload File API
    var xhr = new XMLHttpRequest()
    url = 'https://165.22.210.37:8081/upload_files'
    xhr.open('POST', url, true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('vcd_id', vcd_id)       //modf_sanket
    xhr.setRequestHeader('path', temp)

    xhr.send(
        JSON.stringify({
            filename: Technical_file_name,
        })
    )

    //xhr repsonse handling
    xhr.onload = function () {
        if (this.status == 200) {
            console.log('Your file has been uploaded successfully.')
            // document.getElementById('icon3').style.display = 'none'
            Technical_or_BOQ = 1

            //call Upload File API
            var xhr = new XMLHttpRequest()
            url = 'https://165.22.210.37:8081/upload_files'
            xhr.open('POST', url, true)
            xhr.setRequestHeader('Content-Type', 'application/json')
            xhr.setRequestHeader('vcd_id', vcd_id)       //modf_sanket
            xhr.setRequestHeader('path', temp)

            xhr.send(
                JSON.stringify({
                    filename: BOQ_file_name,
                })
            )

            //xhr repsonse handling
            xhr.onload = function () {
                if (this.status == 200) {
                    console.log('Your file has been uploaded successfully.')
                    document.getElementById('icon3').style.display = 'none'
                    Technical_or_BOQ = 2

                    console.log('get both file START')
                    get_files()
                    console.log('get both file STOP')

                    //alert('Your Technical document has been uploaded successfully with hash =>' + this.responseText)
                } else if (this.status == 400) {
                    alert(temp.error)
                } else {
                    alert('Some Other Error ', xhr.status, ' with statusText ', xhr.statusText)
                }
            }

            // console.log('TECHNICAL get file START')
            // get_files()
            // console.log('TECHNICAL get file STOP')
            //alert('Your Technical document has been uploaded successfully with hash =>' + this.responseText)
        } else if (this.status == 400) {
            alert(temp.error)
        } else {
            alert('Some Other Error ', xhr.status, ' with statusText ', xhr.statusText)
        }
    }
}

/* ------------------------------- End of Upload file to digilocker Code ---------------------------------------- */

/* ------------------------------ Start of revoke digilocker token ------------------------------ */

function redirect_to_confirm_page() {
    //update tender status API call
    var data = JSON.stringify({ etd_id: etd_id })
    var xhr = new XMLHttpRequest()
    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === 4) {
            console.log(this.responseText)
        }
    })

    xhr.open('POST', 'https://165.22.210.37:8081/apply_tender_s3')
    xhr.setRequestHeader('Content-Type', 'application/json')

    xhr.send(data)

    xhr.onload = function () {
        if (this.status == 200) {
            window.location.href = 'https://165.22.210.37:8081/tender/confirmation?et_id=' + et_id + '&etd_id=' + etd_id
        } else if (this.status == 400) {
            alert(temp.error)
        } else {
            alert('Some Other Error ', xhr.status, ' with statusText ', xhr.statusText)
        }
    }
}

//on click of done button in s3.html page
function done() {
    if (document.getElementById('name').value == '' || document.getElementById('email').value == '' || document.getElementById('reason').value == '' || document.getElementById('location').value == '' || document.getElementById('upload').value == '' || document.getElementById('upload1').value == '')
        document.getElementById('tc6').innerHTML = 'Form Is Incomplete'
    else {
        document.getElementById('icon1').className = 'fa fa-spinner fa-spin'
        document.getElementById('tc6').innerHTML = ''
        redirect_to_confirm_page();
        //alert("done function"+et_id);
        /*if (confirm('Do you want to revoke digilocker token?')) {
            //creating xhr request for api call
            var xhr = new XMLHttpRequest()
            url = 'https://165.22.210.37:8081/revoke_token'
            xhr.open('POST', url, true)
            xhr.setRequestHeader('Content-Type', 'application/json')
            xhr.send(
                JSON.stringify({
                    vcd_id: vcd_id,         // modf_sanket
                })
            )

            //xhr repsonse handling
            xhr.onload = function () {
                if (this.status == 200) {
                    alert('Your token has been revoked successfully')
                    redirect_to_confirm_page()
                } else if (this.status == 400) {
                    alert(temp.error)
                } else {
                    alert('Some Other Error ', xhr.status, ' with statusText ', xhr.statusText)
                }
            }
        } else {
            console.log('Token revocking process cancelled')
            redirect_to_confirm_page()
        }*/
    }
}
/* ------------------------------ End of revoke digilocker token ------------------------------ */

/* ---------------------------- End of Digilocker js code -------------------------------------- */


/* ---------------------------- End of digilocker code ------------------------------ */