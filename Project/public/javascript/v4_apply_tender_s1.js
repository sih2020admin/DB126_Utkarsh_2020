 var vd_id =get_cookie('vd_id')
var vcd_id =get_cookie('vcd_id')
if(vd_id ==""){
    window.location.href = "/v1_login.html";
}
 
const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);


var et_id  = urlParams.get('et_id')
var status = "000"
var etd_id  = urlParams.get('etd_id')
console.log(et_id,etd_id);
if(et_id == null && etd_id != null){
    document.getElementById("apply_button").style.display = "none";
    document.getElementById("next_button").style.display = "visible";

    var data = JSON.stringify({"et_id":et_id,"etd_id":etd_id});

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.onload = function () {
          if (this.status === 200) {
            console.log(this.responseText);

            response = JSON.parse(this.responseText);
            var cont_div = document.getElementById('conts');

            status = response.status
            // 000 = 0
            // 100 = step1
            // 110 = step2
            // 111 = step3

        //progress bar code------------------------------------------------------
              
            var i = 0;
            if(status === "100"){
                move1()
            }
            else if(status === "110"){
                move2()
            }
            else if(status === "111"){
                move3()
            }

            function move1() {
                if (i == 0) {
                    i = 1;
                    var elem = document.getElementById("pBar");
                    document.getElementById("arr1").style.display = "";
                    var width = 10;
                    var id = setInterval(frame, 20);
              
                    function frame() {
                        if (width >= (100 / 3)) {
                            clearInterval(id);
                            i = 0;
                        } 
                        else {
                            width++;
                            elem.style.width = width + "%";
                        }   
                    }
                }
            }
              
            function move2() {
                if (i == 0) {
                  i = 1;
                  var elem = document.getElementById("pBar2");
                      document.getElementById("arr2").style.display = "";
                  var width = 10;
                  var id = setInterval(frame, 20);
              
                  function frame() {
                    if (width >= (100 / 3)) {
                      clearInterval(id);
                      i = 0;
                    } else {
                      width++;
                      elem.style.width = width + "%";
                    }
                  }
                }
              }
              
              
            function move3() {
              document.getElementById("arr3").style.display = "";
                if (i == 0) {
                  i = 1;
                  var elem = document.getElementById("pBar3");
                  
                  var width = 10;
                  var id = setInterval(frame, 20);
              
                  function frame() {
                    if (width >= (100 / 3)) {
                      clearInterval(id);
                      i = 0;
                    } else {
                      width++;
                      elem.style.width = width + "%";
                    }
                  }
                }
              }

        //progress bar code over-------------------------------------------------

        var div=`<div class="cont" id="">
                <h2>Filled Tender Details</h2><br>
                <label><strong>Title:</strong></label>  
                <label class="heading">`+response.et_title+`</label><br><br>
                <label class="RnoLabel"><strong>Department:</strong></label>
                <label>`+response.dept_id+`</label><br><br>
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
                <label id="Odate">`+response.et_file_uri+`</label><br><br>
                <label class="OdateLabel"><strong>Status:</strong></label>
                <label id="Odate">`+response.status+`</label><br><br>
                <label class="OdateLabel"><strong>Bidding amount:</strong></label>
                <label id="Odate">`+response.bidding_amt+`</label><br>
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

            xhr.open("POST", "http://"+IP+":8081/filled_tender_desc");
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.send(data);
}
else{
    document.getElementById("next_button").style.display = "none";



    var data = JSON.stringify({"et_id":et_id});

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.onload = function () {
          if (this.status === 200) {
            console.log(this.responseText);

            response = JSON.parse(this.responseText);
            var cont_div = document.getElementById('cont');

    

        var div=`<div class="cont" id="">
                <h3>Tendor Details</h3><br>
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
                <label id="Odate">`+response.et_file_uri+`</label><br>
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

            xhr.open("POST", "http://"+IP+":8081/tender_desc");
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.send(data);
}





function apply() {
    // body...
    console.log(et_id);
    var data = JSON.stringify({"et_id":et_id,"vd_id":vd_id,"vcd_id":vcd_id,"bid_amt":"12000"});
            //bid ammounnt to take from user
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.onload = function () {
  if (this.status === 200) {
    var resp= JSON.parse(this.responseText);
    var etd_id =resp.etd_id;
    window.location.href = "/v4_apply_tender_s2.html?etd_id="+etd_id;
  }
  else{
    alert("Some error")
  }
}

    xhr.open("POST", "http://"+IP+":8081/apply_tender");
    xhr.setRequestHeader("Content-Type", "application/json");

xhr.send(data);
    
}

function next() {
    // body...
    window.location.href = "/v4_apply_tender_s2.html?etd_id="+etd_id;
    }