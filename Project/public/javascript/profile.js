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
var data = JSON.stringify({ vd_id: -1 ,vcd_id : -1})    //im putting here -1 bcoz dont know whether post data can be null? vcd_id is no longer used
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
         var flag=0;
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
                tender_content =  tender_content+`
                        <tr>
                            <td>`+response[3][i].et_tender_ref_no+`</td>
                            <td>`+response[3][i].et_title+`</td>
                            <td>`+response[3][i].et_tender_desc+`</td>
                            <td>`+response[3][i].bidding_amt+`</td>
                            <td><a href=https://`+location.hostname+":8081/tender/preview?et_id="+response[3][i].et_id+"&etd_id="+response[3][i].etd_id+`>view</a></td>
                            <td>`+"Approved"+`</td>
                        </tr>` 
                }
                flag=1;
        }
        else{
            approve_tender_div.insertAdjacentHTML('beforeend', `<br><label class="RnoLabel"><strong>NO TENDER APPROVED YET ! APPLY FOR TENDER <a href="/tenders">here</a></strong></label>`)
        }
        if(flag==1){
            tender_content  = tender_content+ `</table></div>`
            approve_tender_div.insertAdjacentHTML('beforeend',tender_content);
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
    else if(optName == 'Tenders') {
        console.log('ten')
        t.classList.add("active")
        p.classList.remove("active")
        a.classList.remove("active")
        d.classList.remove("active")
        s.classList.remove("active")
    }
    else if(optName == 'Approved'){
        console.log('app')
        a.classList.add("active")
        p.classList.remove("active")
        t.classList.remove("active")
        d.classList.remove("active")
        s.classList.remove("active")
    }
    else if(optName == 'Docs'){
        console.log('app')
        d.classList.add("active")
        t.classList.remove("active")
        a.classList.remove("active")
        p.classList.remove("active")
        s.classList.remove("active")
    }
    else if(optName == 'stats'){
        console.log('app')
        s.classList.add("active")
        d.classList.remove("active")
        t.classList.remove("active")
        a.classList.remove("active")
        p.classList.remove("active")
    }
    else if(optName == 'Files'){
        console.log('app')
        d.classList.add("active")
        s.classList.remove("active")
        t.classList.remove("active")
        a.classList.remove("active")
        p.classList.remove("active")
    }
}


function graph_data(){
    var xhr1 = new XMLHttpRequest()
    url = '/statistics'
    xhr1.open('POST', url)
    xhr1.setRequestHeader('Content-Type', 'application/json')
    xhr1.send(JSON.stringify({}))
    xhr1.onload = function () {
        console.log("xhr 1 on load")
        if (this.status == 200) {
            console.log(this.responseText);
            var g_data=JSON.parse(this.responseText);
            total_count_project=g_data[0];
            count_project_dept=g_data[1];
            count_project_dept_cost_applied=g_data[2];

            var tenders_applied_total = document.getElementById('tenders_applied_total').getContext('2d');
            var chart = new Chart(tenders_applied_total, {
                // The type of chart we want to create
                type: 'horizontalBar',

                // The data for our dataset
                data: {
                    labels: [' '],
                    datasets: [{
                        label: 'Total tenders applied',
                        backgroundColor: ['#00F5D4','#00BBF9','#FEE440','#F15BB5'],
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
                                precision:0,
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
                        backgroundColor: ['#F15BB5','#00BBF9','#FEE440','#00F5D4'],
                        // borderColor: '#663EFD',
                        data: count_project_dept.map(count_project_dept => count_project_dept.total_count_dept)
                    }]
                },
                // Configuration options go here
                options: {responsive: true,
                    legend: {
                        display: false
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                stepSize: 1,
                                precision:0
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
                        backgroundColor: ['#00F5D4','#00BBF9','#FEE440','#F15BB5'],
                        // borderColor: '#663EFD',
                        data: count_project_dept_cost_applied.map(count_project_dept_cost_applied => count_project_dept_cost_applied.total_cost_departmentwise)
                    }]
                },
                // Configuration options go here
                options: {responsive: true,
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


function browse(){
    var browse = document.getElementById('upload');
    upload(browse.files);
}
var upload = function(files){
    var xhr1=  new XMLHttpRequest();
    formdata = new FormData();
    for( var x = 0;x < files.length;x = x+1){
        formdata.append('file',files[x]);
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
    xhr1.open("POST" ,url);
    
    xhr1.onload = function(){
        if(this.status==200){
            console.log(this.responseText);
            // document.getElementById("div_f2").style.display = "none";
            res = JSON.parse(this.responseText)
            var file_uri = res.filename
            alert("uploaded file");
        }
        else if(this.status==400)
            alert("Error 400");
        else
            alert("Some Error Occured");
    }
    xhr1.send(formdata)
}
