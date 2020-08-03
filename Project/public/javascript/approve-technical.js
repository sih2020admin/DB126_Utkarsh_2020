var et_id = location.toString().split('=%20')[1];
var response,i,k,n,etd_id,under,flag;

//Modal 
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("closeotp")[0];
var cancel = document.getElementById("cancel");

cancel.onclick = function() {
    modal.style.display = "none";
}
span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//Modal Content
function app(j){
    k=j;                              //To Dynamically Set Particular tender To Disapprove/Approve
    modal.style.display="block";
    etd_id = response[j].etd_id;
    document.getElementById("time").innerHTML = response[j].time_period + "&nbsp;Days";

    document.getElementById("name").innerHTML = response[j].vcd_name;
    document.getElementById("dob").innerHTML = response[j].vcd_dob;
    document.getElementById("desg").innerHTML = response[j].vcd_designation;
    document.getElementById("aadhar").innerHTML = response[j].vcd_aadhar;
    document.getElementById("email").innerHTML = response[j].vcd_email;
    document.getElementById("contact").innerHTML = response[j].vcd_contact;

    document.getElementById("cname").innerHTML = response[j].v_name;
    document.getElementById("legal").innerHTML = response[j].v_legal_id;
    document.getElementById("yoe").innerHTML = response[j].v_yoe;
    document.getElementById("register").innerHTML = response[j].v_reg_no;
    document.getElementById("gst").innerHTML = response[j].v_gst;
    document.getElementById("pan").innerHTML = response[j].v_pan;
    document.getElementById("cemail").innerHTML = response[j].v_email;
    document.getElementById("ccontact").innerHTML = response[j].v_mobile;
    document.getElementById("address").innerHTML = response[j].v_address;
    document.getElementById("turn").innerHTML = "₹&nbsp;" +"5000000";
    document.getElementById("scheme").innerHTML = response[j].schemes;
    document.getElementById("staff").innerHTML = response[j].staff;

    var equipment = document.getElementById('equipment').getContext('2d');
            var chart = new Chart(equipment, {
                type: 'bar',
                data: {
                    labels: [' '],
                    datasets: [{
                        label: 'Make In India Equipment(%)',
                        backgroundColor: ['#FEE440'],
                        data: [response[j].equi],
                    }]
                },
                // Configuration options go here
                options: {responsive: true,
                    scales: {
                        yAxes: [{
                            ticks: {
                                min: 0
                            }
                        }],
                        xAxes: [{
                            barPercentage: 0.2
                        }]
                    }
                }
            });


    document.getElementById("upload").style.display = "none";
    document.getElementById("error").innerHTML = "";

    var xhr1 = new XMLHttpRequest();
    xhr1.open('GET', 'https://165.22.210.37:8081/check_files?furi='+ response[j].furi1 + '&vd_id=' + response[j].vd_id + '&vcd_id=' + response[j].vcd_id);
    xhr1.setRequestHeader('Content-Type', 'application/json');
    xhr1.send();
    xhr1.onload = function () {
        if (this.status == 200) {
            document.getElementById("error").innerHTML = "";
            document.getElementById("upload").style.display = "";
            document.getElementById("file1").innerHTML = response[j].furi1;
            a= document.getElementById("preview");
            a.href='https://165.22.210.37:8081/get_files?furi='+ response[j].furi1 + '&vd_id=' + response[j].vd_id + '&vcd_id=' + response[j].vcd_id;
        }
        else if(this.status == 400){
            document.getElementById("error").innerHTML = "Technical Document Missing";
        }
        else
            alert("Some Error Occured")
    }
}

//Approve/Disapprove Function
function result(i){
    if(i==0){
        Swal.fire({
            title: 'Reason',
            input: 'text',
            showCancelButton: true,
            confirmButtonText: 'Disapprove',
        }).then((results) => {
            sweet=results['value'];
            if (results['value']) {
                    var xhr = new XMLHttpRequest()
                    var url = '/update_application_status'
                    xhr.open('POST', url)
                    xhr.setRequestHeader('Content-Type', 'application/json')
                    xhr.send(JSON.stringify({ etd_id: etd_id, status: "-1",reason:results['value']}))
                    xhr.onload = function () {
                        if (this.status == 200) {
                            modal.style.display = "none";
                            document.getElementById(k).innerHTML = "&#10060";
                            document.getElementById("v"+k).onclick = "#";
                            document.getElementById("v"+k).style.color = "grey";
                        } else if (this.status == 400) {
                            alert('Error 400')
                        } else {
                            alert('Some Error Occured')
                        }
                    }
            }
        })
    }
    else{
        var xhr = new XMLHttpRequest()
        var url = '/update_application_status'
        xhr.open('POST', url)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(JSON.stringify({ etd_id: etd_id, status: "1",reason:""}))
        xhr.onload = function () {
            if (this.status == 200) {
                modal.style.display = "none";
                document.getElementById(k).innerHTML = "&#9989";
                document.getElementById("v"+k).onclick = "#";
                document.getElementById("v"+k).style.color = "grey";
            } else if (this.status == 400) {
                alert('Error 400')
            } else {
                alert('Some Error Occured')
            }
        }
    }
    flag=0;
    // console.log(n)
    for(j=0;j<n-1;j++){
        // console.log(j)
        under=document.getElementById(j).innerHTML;
        console.log(under)
        if(under=="_____"){
            flag=1;
            break;
        }
    }
    // console.log(flag)
    if(flag==0)
        document.getElementById("submit").style.display = "";
}

//Table Content
var xhr = new XMLHttpRequest();
xhr.open('POST', '/get_application');
xhr.setRequestHeader('Content-Type', 'application/json');
var data = JSON.stringify({et_id:et_id});   
xhr.send(data);

xhr.onload = function () {
    if (this.status == 200) {
        response = JSON.parse(this.responseText);
        var technical_div = document.getElementById('main_content');
        var flag=0;
        console.log(response);
        if(response[0].approved==1 || response[0].approved==2){
            save(1)
        }
        else{
            document.getElementById('tech').style.display = "";
            if (response.length > 0) {
                    var technical_content = `<div id="technical" class="technical_details">
                    <table>
                        <tr>
                            <th>S.No</th>
                            <th>Vendor Name</th>
                            <th>Company Name</th>
                            <th>Legal Status</th>
                            <th>Company Email</th>
                            <th>Company Mobile</th>
                            <th>Time Period</th>
                            <th>Application</th>
                            <th>Status</th>
                        </tr>`
                    for (i = 0; i < response.length; i++) { 
                    technical_content =  technical_content+`
                            <tr>
                                <td>`+(i+1)+`</td>
                                <td>`+response[i].vcd_name+`</td>
                                <td>`+response[i].v_name+`</td>
                                <td>`+response[i].v_legal_id+`</td>
                                <td>`+response[i].v_email+`</td>
                                <td>`+response[i].v_mobile+`</td>
                                <td>`+response[i].time_period+` Days</td>
                                <td><a onclick="app(`+i+`)" id="v`+i+`">View</a></td>
                                <td id="`+i+`">_____</td>
                            </tr>` 
                    }
                    // document.getElementById("detail").style.display = ""
                    // document.getElementById("submit").style.display = "";
                    // document.getElementById("et_id").innerHTML = response[0].et_id;
                    // document.getElementById("ref").innerHTML = response[0].et_tender_ref_no;
                    // document.getElementById("fee").innerHTML = response[0].et_tender_fee;
                    // var a = document.getElementById('file');
                    // a.href = response[0].et_file_uri;
                    // document.getElementById("bid").innerHTML = response[0].et_bidding_date.slice(0,-14);
                    // document.getElementById("app").innerHTML = i;
                    // document.getElementById("title").innerHTML = response[0].et_title;
                    // document.getElementById("desc").innerHTML = response[0].et_tender_desc;
                    flag=1;
            }
            else{
                technical_div.insertAdjacentHTML('beforeend', `<br><br><p>NO APPLICATIONS SUBMITTED</p>`)
            }
            if(flag==1){
                technical_content  = technical_content+ `</table></div>`
                technical_div.insertAdjacentHTML('beforeend',technical_content);
            }
            //For Setting Status During Refresh Of Browser
            n=i--;
            for(j=0;j<=i;j++){
                if(response[j].is_approved==-1){
                    document.getElementById(j).innerHTML = "&#10060";
                    document.getElementById("v"+j).onclick = "#";
                    document.getElementById("v"+j).style.color = "grey";
                }
                else if(response[j].is_approved==1){
                    document.getElementById(j).innerHTML = "&#9989";
                    document.getElementById("v"+j).onclick = "#";
                    document.getElementById("v"+j).style.color = "grey";
                }   
            }
            flag=0;
            for(j=0;j<i+1;j++){
                under=document.getElementById(j).innerHTML;
                if(under=="_____"){
                    flag=1;
                    break;
                }
            }
            if(flag==0)
                document.getElementById("submit").style.display = "";
        } 
    }
    else if (this.status == 400) {
        alert('Some error occured!')
    } 
    else {
        alert('Check Network!')
    }
}
function save(a){
    if(a==1){
        location.href = "/admin/application/approve/boq?id=" + et_id
    }
    else{
        var xhr = new XMLHttpRequest()
        var url = '/update_tender_stage'
        xhr.open('POST', url)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(JSON.stringify({ et_id: et_id, status: "1"}))
        xhr.onload = function () {
            if (this.status == 200) {
                location.href = "/admin/application/approve/boq?id=" + et_id
            }
            else if (this.status == 400) 
                alert('Error 400')
            else 
                alert('Some Error Occured')
        }
    }

}