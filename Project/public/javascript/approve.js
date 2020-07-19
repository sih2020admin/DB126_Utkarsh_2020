var et_id = location.toString().split('=%20')[1];
var response;

var xhr = new XMLHttpRequest();
xhr.open('POST', '/get_application');
xhr.setRequestHeader('Content-Type', 'application/json');
var data = JSON.stringify({et_id:et_id,status:"0"});   
xhr.send(data);

xhr.onload = function () {
    if (this.status == 200) {
        response = JSON.parse(this.responseText);
        var technical_div = document.getElementById('main_content');
        var flag=0;
        console.log(response);
        document.getElementById("et_id").innerHTML = response[0].et_id;
        document.getElementById("ref").innerHTML = response[0].et_tender_ref_no;
        document.getElementById("fee").innerHTML = response[0].et_tender_fee;
        document.getElementById("file").innerHTML = response[0].et_tender_fee;
        document.getElementById("bid").innerHTML = response[0].et_bidding_date.slice(0,-14);
        document.getElementById("app").innerHTML = response[0].et_tender_fee;
        document.getElementById("desc").innerHTML = response[0].et_tender_fee;

        if (response.length > 0) {
                var technical_content = `<div class="technical_details">
                <table>
                    <tr>
                        <th>S.No</th>
                        <th>Vendor Name</th>
                        <th>Company Name</th>
                        <th>Company Email</th>
                        <th>Company Mobile</th>
                        <th>Technical File URI</th>
                        <th>Application</th>
                    </tr>`
                for (i = 0; i < response.length; i++) { 
                technical_content =  technical_content+`
                        <tr>
                            <td>`+(i+1)+`</td>
                            <td>`+response[i].vcd_name+`</td>
                            <td>`+response[i].v_name+`</td>
                            <td>`+response[i].v_email+`</td>
                            <td>`+response[i].v_mobile+`</td>
                            <td>`+response[i].furi1+`</td>
                            <td><a href=`+"#"+`>View</a></td>
                            
                        </tr>` 
                }
                flag=1;
        }
        else{
            technical_div.insertAdjacentHTML('beforeend', `<br><label class="RnoLabel"><strong>NO TENDER SUBMITTED <a href="/tenders">here</a></strong></label>`)
        }
        if(flag==1){
            technical_content  = technical_content+ `</table></div>`
            technical_div.insertAdjacentHTML('beforeend',technical_content);
        }
    } 
    else if (this.status == 400) {
        alert('Some error occured!')
    } 
    else {
        alert('Check Network!')
    }
}