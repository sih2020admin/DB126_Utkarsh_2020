const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
var et_id = urlParams.get('id')
// console.log(et_id)
var res,i,k,n,etd_id,under,flag;

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
    etd_id = res[j].etd_id;

    document.getElementById("bid").innerHTML = "₹" + res[j].bidding_amt;

    document.getElementById("name").innerHTML = res[j].vcd_name;
    document.getElementById("dob").innerHTML = res[j].vcd_dob;
    document.getElementById("desg").innerHTML = res[j].vcd_designation;
    document.getElementById("aadhar").innerHTML = res[j].vcd_aadhar;
    document.getElementById("email").innerHTML = res[j].vcd_email;
    document.getElementById("contact").innerHTML = res[j].vcd_contact;

    document.getElementById("cname").innerHTML = res[j].v_name;
    document.getElementById("legal").innerHTML = res[j].v_legal_id;
    document.getElementById("yoe").innerHTML = res[j].v_yoe;
    document.getElementById("register").innerHTML = res[j].v_reg_no;
    document.getElementById("gst").innerHTML = res[j].v_gst;
    document.getElementById("pan").innerHTML = res[j].v_pan;
    document.getElementById("cemail").innerHTML = res[j].v_email;
    document.getElementById("ccontact").innerHTML = res[j].v_mobile;
    document.getElementById("address").innerHTML = res[j].v_address;

    document.getElementById("upload").style.display = "none";
    document.getElementById("error").innerHTML = "";
    
    var xhr1 = new XMLHttpRequest();
    xhr1.open('GET', 'https://165.22.210.37:8081/check_files?furi='+ res[j].furi2 + '&vd_id=' + res[j].vd_id + '&vcd_id=' + res[j].vcd_id);
    xhr1.setRequestHeader('Content-Type', 'application/json');
    xhr1.send();
    xhr1.onload = function () {
        if (this.status == 200) {
            document.getElementById("error").innerHTML = "";
            document.getElementById("upload").style.display = "";
            document.getElementById("file1").innerHTML = res[j].furi2;
            a= document.getElementById("preview");
            a.href='https://165.22.210.37:8081/get_files?furi='+ res[j].furi2 + '&vd_id=' + res[j].vd_id + '&vcd_id=' + res[j].vcd_id;
        }
        else if(this.status == 400){
            document.getElementById("error").innerHTML = "BOQ Document Missing";
        }
        else
            alert("Some Error Occured")
    }
    // document.getElementById("upload").style.display = "";
    // document.getElementById("file1").innerHTML = response[j].furi1;
    // a= document.getElementById("preview");
    // a.href='https://165.22.210.37:8081/get_files?furi='+ response[j].furi1 + '&vd_id=' + response[j].vd_id + '&vcd_id=' + response[j].vcd_id;
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
                    xhr.send(JSON.stringify({ etd_id: etd_id, status: "-2",reason:results['value']}))
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
        xhr.send(JSON.stringify({ etd_id: etd_id, status: "2",reason:""}))
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
        // console.log(under)
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
        if(response[0].approved==2 || response[0].approved==3){
            save(1)
        }
        else{
            document.getElementById('finance').style.display = "";
            var flag=0,k=0;
            res=[];
            for (i = 0; i < response.length; i++) { 
                if(response[i].is_approved==1 || response[i].is_approved==2 || response[i].is_approved==-2){
                    res[k]=response[i];
                    k++;
                }
            }
            // console.log(res);
            if (res.length > 0) {
                    var technical_content = `<div id="technical" class="technical_details">
                    <table>
                        <tr>
                            <th>S.No</th>
                            <th>Vendor Name</th>
                            <th>Company Name</th>
                            <th>Legal Status</th>
                            <th>Company Email</th>
                            <th>Company Mobile</th>
                            <th>Bidding Amount</th>
                            <th>Application</th>
                            <th>Status</th>
                        </tr>`
                        for (i = 0; i < k; i++) { 
                            technical_content =  technical_content+`
                                <tr>
                                    <td>`+(i+1)+`</td>
                                    <td>`+res[i].vcd_name+`</td>
                                    <td>`+res[i].v_name+`</td>
                                    <td>`+res[i].v_legal_id+`</td>
                                    <td>`+res[i].v_email+`</td>
                                    <td>`+res[i].v_mobile+`</td>
                                    <td>₹ `+res[i].bidding_amt+`</td>
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
                technical_div.insertAdjacentHTML('beforeend', `<br><br><p>NO APPLICATIONS FOR BOQ</p>`)
            }
            if(flag==1){
                technical_content  = technical_content+ `</table></div>`
                technical_div.insertAdjacentHTML('beforeend',technical_content);
            }
            //For Setting Status During Refresh Of Browser
            n=i--;
            for(j=0;j<=i;j++){
                if(res[j].is_approved==-2){
                    document.getElementById(j).innerHTML = "&#10060";
                    document.getElementById("v"+j).onclick = "#";
                    document.getElementById("v"+j).style.color = "grey";
                }
                else if(res[j].is_approved==2){
                    document.getElementById(j).innerHTML = "&#9989";
                    document.getElementById("v"+j).onclick = "#";
                    document.getElementById("v"+j).style.color = "grey";
                }   
            }
            flag=0;
            for(j=0;j<i+1;j++){
                // console.log(j)
                under=document.getElementById(j).innerHTML;
                // console.log(under)
                if(under=="_____"){
                    flag=1;
                    break;
                }
            }
            // console.log(flag)
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
        location.href = "/admin/application/approve/result?id=" + et_id
    }
    else{
        var xhr = new XMLHttpRequest()
        var url = '/update_tender_stage'
        xhr.open('POST', url)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(JSON.stringify({ et_id: et_id, status: "2"}))
        xhr.onload = function () {
            if (this.status == 200) {
                location.href = "/admin/application/approve/result?id=" + et_id
            }
            else if (this.status == 400) 
                alert('Error 400')
            else 
                alert('Some Error Occured')
        }
    }

}