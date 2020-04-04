/* var vd_id =get_cookie('vd_id')
var vcd_id =get_cookie('vcd_id')
if(vd_id ==""){
    window.location.href = "/v1_login.html";
}
 */
const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);


var et_id  = urlParams.get('et_id')

console.log(et_id);
var data = JSON.stringify({"et_id":et_id});

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.onload = function () {
  if (this.status === 200) {
    console.log(this.responseText);

    response = JSON.parse(this.responseText);
    var cont_div = document.getElementById('cont');

    

        var div=`<div class="cont" id="">
            <label><strong>Title:</strong></label>
            <label class="heading">`+response.et_title+`</label><br><br>
                <label class="RnoLabel"><strong>Department:</strong></label>
                <label>`+response.dept_name+`</label><br><br>
                <label class="RnoLabel"><strong>Ref No:</strong></label>
                <label>`+response.et_tender_ref_no+`</label><br><br>
                <label class="Id"><strong>Tender ID:</strong></label>
                <label>`+response.et_id+`</label><br><br>
                <label class="Id"><strong>Tender fee:</strong></label>
                <label>`+response.et_tender_fee+`</label><br><br>
                <label class="Id"><strong>Tender Description:</strong></label>
                <label>`+response.et_tender_desc+`</label><br><br>
                <label class="OdateLabel"><strong>Closing Date:</strong></label>
                <label id="Odate">`+response.et_last_date_apply.slice(0,10)+`</label><br><br>
                <label class="OdateLabel"><strong>Bid Date:</strong></label>
                <label id="Odate">`+response.et_bidding_date.slice(0,10)+`</label><br><br>
                <label class="OdateLabel"><strong>File URL:</strong></label>
                <label id="Odate">`+response.et_file_url+`</label><br>
            <br>  
         
        </div>`;
        
        cont_div.insertAdjacentHTML('beforeend', div);   
    
  }
    else if (this.status == 400) {  
        alert("Some error occured!");
    }
    else{
        alert("Check Network!");
    }
}  

xhr.open("POST", "http://localhost:8081/tender_desc");
xhr.setRequestHeader("Content-Type", "application/json");

xhr.send(data);

